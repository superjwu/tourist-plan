#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SHARED_DIR = path.join(ROOT, 'shared');
const IMAGES_DIR = path.join(SHARED_DIR, 'images');

const FILES = [
  ['shared/data.js', 'attractions'],
  ['shared/data_page5.js', 'attractionsPage5'],
  ['shared/data_page6.js', 'attractionsPage6'],
  ['shared/data_page7.js', 'attractionsPage7'],
  ['shared/data_page8.js', 'attractionsPage8'],
  ['shared/data_catalog.js', 'ATTRACTIONS_CATALOG'],
];

const REQUIRED_FIELDS = [
  'id',
  'name',
  'slug',
  'state',
  'region',
  'category',
  'description',
  'rating',
  'reviews',
  'fee',
  'bestTime',
  'duration',
  'activities',
  'difficulty',
  'accessibility',
  'image',
  'tags',
  'lodgingCost',
  'travelTime',
];

const EXPECTED_PARKS = new Set([
  'Acadia National Park',
  'American Samoa',
  'Arches National Park',
  'Badlands National Park',
  'Big Bend National Park',
  'Biscayne National Park',
  'Black Canyon',
  'Bryce Canyon National Park',
  'Canyonlands National Park',
  'Capitol Reef National Park',
  'Carlsbad Caverns National Park',
  'Channel Islands National Park',
  'Congaree National Park',
  'Crater Lake National Park',
  'Cuyahoga Valley National Park',
  'Death Valley National Park',
  'Denali National Park',
  'Dry Tortugas National Park',
  'Everglades National Park',
  'Gates Of The Arctic National Park',
  'Gateway Arch National Park',
  'Glacier Bay National Park',
  'Glacier National Park',
  'Grand Canyon National Park',
  'Grand Teton National Park',
  'Great Basin National Park',
  'Great Sand Dunes National Park',
  'Great Smoky Mountains National Park',
  'Guadalupe Mountains National Park',
  'Haleakala National Park',
  'Hawaii Volcanoes National Park',
  'Hot Springs National Park',
  'Indiana Dunes National Park',
  'Isle Royale National Park',
  'Joshua Tree National Park',
  'Katmai National Park',
  'Kenai Fjords National Park',
  'Kings Canyon National Park',
  'Kobuk Valley National Park',
  'Lake Clark National Park',
  'Lassen Volcanic National Park',
  'Mammoth Cave National Park',
  'Mesa Verde National Park',
  'Mount Rainier National Park',
  'New River Gorge National Park',
  'North Cascades National Park',
  'Olympic National Park',
  'Petrified Forest National Park',
  'Pinnacles National Park',
  'Redwood National and State Parks',
  'Rocky Mountain National Park',
  'Saguaro National Park',
  'Sequoia National Park',
  'Shenandoah National Park',
  'Theodore Roosevelt National Park',
  'Virgin Islands National Park',
  'Voyageurs National Park',
  'White Sands National Park',
  'Wind Cave National Park',
  'Wrangell St Elias National Park',
  'Yellowstone National Park',
  'Yosemite National Park',
  'Zion National Park',
]);

function normalize(text) {
  return String(text || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[&]/g, ' and ')
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase();
}

function loadCatalog() {
  const context = { globalThis: {} };
  vm.createContext(context);

  for (const [file] of FILES) {
    const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
    vm.runInContext(source, context);
  }

  vm.runInContext(`
    globalThis.__catalog = globalThis.ATTRACTIONS_CATALOG;
    globalThis.__page6 = typeof attractionsPage6 !== 'undefined' ? attractionsPage6 : [];
    globalThis.__page7 = typeof attractionsPage7 !== 'undefined' ? attractionsPage7 : [];
    globalThis.__page8 = typeof attractionsPage8 !== 'undefined' ? attractionsPage8 : [];
  `, context);

  return {
    data: context.globalThis.__catalog,
    page6: context.globalThis.__page6,
    page7: context.globalThis.__page7,
    page8: context.globalThis.__page8,
  };
}

function main() {
  const { data, page6, page7, page8 } = loadCatalog();
  const failures = [];

  if (!Array.isArray(data)) {
    throw new Error('ATTRACTIONS_CATALOG was not created');
  }

  if (data.length !== 300) failures.push(`Expected 300 runtime attractions, found ${data.length}`);
  if (!Array.isArray(page6) || page6.length !== 50) failures.push(`Expected page6 length 50, found ${page6?.length}`);
  if (!Array.isArray(page7) || page7.length !== 50) failures.push(`Expected page7 length 50, found ${page7?.length}`);
  if (!Array.isArray(page8) || page8.length !== 44) failures.push(`Expected page8 length 44, found ${page8?.length}`);

  const ids = new Set();
  const slugs = new Set();
  let remoteCount = 0;
  for (const record of data) {
    for (const field of REQUIRED_FIELDS) {
      if (record[field] === undefined || record[field] === null || record[field] === '') {
        failures.push(`Missing ${field} for ${record.slug}`);
      }
    }
    if (ids.has(record.id)) failures.push(`Duplicate runtime id ${record.id}`);
    if (slugs.has(record.slug)) failures.push(`Duplicate runtime slug ${record.slug}`);
    ids.add(record.id);
    slugs.add(record.slug);

    if (typeof record.image === 'string' && record.image.startsWith('../shared/images/')) {
      const fileName = path.basename(record.image);
      const imagePath = path.join(IMAGES_DIR, fileName);
      if (!fs.existsSync(imagePath)) failures.push(`Missing local image for ${record.slug}: ${fileName}`);
    }
    if (
      typeof record.image === 'string' &&
      /^https?:\/\//.test(record.image)
    ) {
      remoteCount += 1;
    }
    if (
      typeof record.image === 'string' &&
      !record.image.startsWith('../shared/images/') &&
      /^https?:\/\//.test(record.image) === false
    ) {
      failures.push(`Unexpected image format for ${record.slug}: ${record.image}`);
    }
  }
  if (remoteCount !== 0) failures.push(`Expected all runtime images to be local, found ${remoteCount} remote URLs`);

  const parkMatches = new Set();
  for (const record of data) {
    const full = normalize(record.name);
    for (const park of EXPECTED_PARKS) {
      if (full.includes(normalize(park))) parkMatches.add(park);
    }
  }
  if (parkMatches.size !== 63) {
    const missing = [...EXPECTED_PARKS].filter(name => !parkMatches.has(name));
    failures.push(`Expected all 63 national parks, missing: ${missing.join(', ')}`);
  }

  if (failures.length) {
    console.error('Catalog validation failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log('Catalog validation passed.');
  console.log(`Runtime attractions: ${data.length}`);
  console.log(`Generated pages: ${page6.length} + ${page7.length} + ${page8.length}`);
}

main();
