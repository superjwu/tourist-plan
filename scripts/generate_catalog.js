#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SHARED_DIR = path.join(ROOT, 'shared');
const IMAGES_DIR = path.join(SHARED_DIR, 'images');
const NPS_DATA_PATH = process.env.NPS_DATA_PATH || '/tmp/nps_parks_full.json';

const DESIGNATION_PRIORITY = [
  ['National Park'],
  ['National Park & Preserve'],
  ['National and State Parks'],
  ['National Monument', 'National Monument & Preserve', 'National Monument and Historic Shrine'],
  ['National Seashore', 'National Lakeshore'],
  [
    'National Recreation Area',
    'Parkway',
    'Memorial Parkway',
    'National Scenic Trail',
    'National Scenic River',
    'National Scenic Riverway',
    'National Scenic Riverways',
    'National Wild and Scenic River',
    'Wild & Scenic River',
    'Scenic & Recreational River',
  ],
  [
    'National Historical Park',
    'National Historical Park and Preserve',
    'National Historical Park and Ecological Preserve',
    'National Historic Site',
    'National Military Park',
    'National Battlefield',
    'National Battlefield Park',
    'National Battlefield Site',
    'National Memorial',
    'Memorial',
  ],
];

const BASE_OVERRIDES = {
  'gateway-arch-mo': {
    name: 'Gateway Arch National Park',
    category: 'National Park',
  },
  'na-pali-coast': {
    name: 'Na Pali Coast State Wilderness Park',
    category: 'State Park',
  },
  'sleeping-bear-dunes': {
    category: 'National Lakeshore',
  },
};

const NON_NPS_IMAGE_OVERRIDES = {
  'bears-ears': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Bears_Ears_Buttes.jpg',
  'canyons-of-the-ancients': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/My_Public_Lands_Roadtrip-_Canyons_of_the_Ancients_National_Monument_in_Colorado_%2819773890122%29.jpg',
  'cascade-siskiyou': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Views_from_Cascade-Siskiyou_National_Monument_%2818362936785%29.jpg',
  'flaming-gorge': 'https://upload.wikimedia.org/wikipedia/commons/0/02/Evening_view_of_Flaming_Gorge_from_Sheep_Creek_Overlook%2C_2009.jpg',
  'grand-staircase-escalante': 'https://upload.wikimedia.org/wikipedia/commons/7/73/Grand_Staircase_Escalante_National_Monument_in_Utah_-_2015-02-07.jpg',
  'hohokam-pima': 'https://upload.wikimedia.org/wikipedia/en/2/28/Excavated_Ballcourt_at_Snaketown.jpg',
  'olympic-coast-marine': 'https://upload.wikimedia.org/wikipedia/commons/1/18/Aerial_view_of_Teahwhit_Head_and_James_Island.jpg',
};

const EXISTING_PARK_CODE_OVERRIDES = {
  'american-samoa': 'npsa',
  'appalachian-trail': 'appa',
  'arches': 'arch',
  'assateague-island': 'asis',
  'badlands': 'badl',
  'biscayne': 'bisc',
  'biscayne-np-fl': 'bisc',
  'blue-ridge-parkway': 'blri',
  'bryce-canyon': 'brca',
  'cape-hatteras': 'caha',
  'capitol-reef-ut': 'care',
  'carlsbad-caverns-nm': 'cave',
  'channel-islands': 'chis',
  'channel-islands-ca': 'chis',
  'chaco-culture-nhp-nm': 'chcu',
  'congaree': 'cong',
  'congaree-np-sc': 'cong',
  'crater-lake': 'crla',
  'craters-of-the-moon-nm-id': 'crmo',
  'cuyahoga-valley': 'cuva',
  'cuyahoga-valley-oh': 'cuva',
  'death-valley': 'deva',
  'denali': 'dena',
  'devils-tower-wy': 'deto',
  'dinosaur-nm-co': 'dino',
  'dry-tortugas-fl': 'drto',
  'ellis-island-ny': 'elis',
  'everglades': 'ever',
  'gateway-arch-mo': 'jeff',
  'gates-of-the-arctic-ak': 'gaar',
  'gettysburg-nmp-pa': 'gett',
  'glacier': 'glac',
  'glacier-bay': 'glba',
  'golden-gate-nra-ca': 'goga',
  'going-to-the-sun-road': 'glac',
  'grand-canyon': 'grca',
  'great-basin': 'grba',
  'great-sand-dunes': 'grsa',
  'great-smoky': 'grsm',
  'guadalupe-mountains': 'gumo',
  'guadalupe-mountains-tx': 'gumo',
  'haleakala': 'hale',
  'hawaii-volcanoes': 'havo',
  'hot-springs-np-ar': 'hosp',
  'independence-hall-pa': 'inde',
  'indiana-dunes': 'indu',
  'isle-royale-mi': 'isro',
  'jewel-cave-nm-sd': 'jeca',
  'joshua-tree': 'jotr',
  'kenai-fjords': 'kefj',
  'kenai-fjords-ak': 'kefj',
  'kobuk-valley': 'kova',
  'lassen-volcanic-ca': 'lavo',
  'lava-beds-nm-ca': 'labe',
  'liberty-bell-center-pa': 'inde',
  'little-bighorn-battlefield-mt': 'libi',
  'mammoth-cave': 'maca',
  'mesa-verde-cliff': 'meve',
  'mesa-verde-cliff-dwellings': 'meve',
  'mesa-verde-cliff-palace-co': 'meve',
  'montezuma-castle': 'moca',
  'mount-rainier': 'mora',
  'mount-rushmore-sd': 'moru',
  'muir-woods-nm-ca': 'muwo',
  'natural-bridges-nm-ut': 'nabr',
  'new-river-gorge-wv': 'neri',
  'north-cascades-wa': 'noca',
  'olympic': 'olym',
  'oregon-caves-nm-or': 'orca',
  'petrified-forest-az': 'pefo',
  'pictured-rocks': 'piro',
  'pinnacles-ca': 'pinn',
  'rainbow-bridge-nm-ut': 'rabr',
  'redwood-np-ca': 'redw',
  'rocky-mountain': 'romo',
  'saguaro': 'sagu',
  'sequoia': 'seki',
  'shenandoah': 'shen',
  'sleeping-bear-dunes': 'slbe',
  'statue-of-liberty': 'stli',
  'sunset-crater-volcano-nm-az': 'sucr',
  'theodore-roosevelt': 'thro',
  'theodore-roosevelt-nd': 'thro',
  'timpanogos-cave-nm-ut': 'tica',
  'virgin-islands': 'viis',
  'voyageurs-np-mn': 'voya',
  'white-sands-nm': 'whsa',
  'wind-cave-sd': 'wica',
  'wrangell-st-elias': 'wrst',
  'wupatki-nm-az': 'wupa',
  'yellowstone': 'yell',
  'yosemite': 'yose',
  'zion': 'zion',
};

const STATE_NAMES = {
  AK: 'Alaska',
  AL: 'Alabama',
  AR: 'Arkansas',
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DC: 'District of Columbia',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  IA: 'Iowa',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  MA: 'Massachusetts',
  MD: 'Maryland',
  ME: 'Maine',
  MI: 'Michigan',
  MN: 'Minnesota',
  MO: 'Missouri',
  MS: 'Mississippi',
  MT: 'Montana',
  NC: 'North Carolina',
  ND: 'North Dakota',
  NE: 'Nebraska',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NV: 'Nevada',
  NY: 'New York',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VA: 'Virginia',
  VI: 'U.S. Virgin Islands',
  VT: 'Vermont',
  WA: 'Washington',
  WI: 'Wisconsin',
  WV: 'West Virginia',
  WY: 'Wyoming',
  AS: 'American Samoa',
  GU: 'Guam',
};

const REGION_BY_STATE = {
  AK: 'Alaska',
  HI: 'Hawaii',
  AS: 'Pacific West',
  GU: 'Pacific West',
  CA: 'Pacific West',
  OR: 'Pacific West',
  WA: 'Pacific West',
  AZ: 'Southwest',
  NM: 'Southwest',
  NV: 'Southwest',
  UT: 'Southwest',
  TX: 'Southwest',
  CO: 'Rocky Mountains',
  ID: 'Rocky Mountains',
  MT: 'Rocky Mountains',
  WY: 'Rocky Mountains',
  ND: 'Great Plains',
  SD: 'Great Plains',
  NE: 'Great Plains',
  KS: 'Great Plains',
  IA: 'Great Plains',
  IL: 'Great Plains',
  IN: 'Great Plains',
  MI: 'Great Plains',
  MN: 'Great Plains',
  MO: 'Great Plains',
  OH: 'Great Plains',
  WI: 'Great Plains',
  AL: 'Southeast',
  AR: 'Southeast',
  FL: 'Southeast',
  GA: 'Southeast',
  KY: 'Southeast',
  LA: 'Southeast',
  MS: 'Southeast',
  NC: 'Southeast',
  PR: 'Southeast',
  SC: 'Southeast',
  TN: 'Southeast',
  VA: 'Southeast',
  VI: 'Southeast',
  WV: 'Southeast',
  CT: 'Northeast',
  DC: 'Northeast',
  DE: 'Northeast',
  MA: 'Northeast',
  MD: 'Northeast',
  ME: 'Northeast',
  NH: 'Northeast',
  NJ: 'Northeast',
  NY: 'Northeast',
  PA: 'Northeast',
  RI: 'Northeast',
  VT: 'Northeast',
};

const REGION_TRAVEL_TIMES = {
  Alaska: { nyc: 10.5, chi: 9, la: 7, bay: 6.5 },
  'Great Plains': { nyc: 4, chi: 2.5, la: 4.5, bay: 4.5 },
  Hawaii: { nyc: 12, chi: 10.5, la: 6, bay: 5.5 },
  Northeast: { nyc: 2, chi: 3, la: 6, bay: 6.5 },
  'Pacific West': { nyc: 7.5, chi: 5.5, la: 2.5, bay: 2 },
  'Rocky Mountains': { nyc: 5.5, chi: 3.5, la: 4.5, bay: 4 },
  Southeast: { nyc: 3, chi: 3.5, la: 5.5, bay: 6 },
  Southwest: { nyc: 6.5, chi: 4.5, la: 3.5, bay: 4 },
};

const REGION_LODGING = {
  Alaska: '$$$',
  'Great Plains': '$',
  Hawaii: '$$$',
  Northeast: '$$$',
  'Pacific West': '$$$',
  'Rocky Mountains': '$$',
  Southeast: '$$',
  Southwest: '$$',
};

const BEST_TIME_BY_REGION = {
  Alaska: 'June-August',
  'Great Plains': 'May-September',
  Hawaii: 'April-June, September-November',
  Northeast: 'May-October',
  'Pacific West': 'April-October',
  'Rocky Mountains': 'June-September',
  Southeast: 'March-May, October-November',
  Southwest: 'March-May, September-November',
};

function ascii(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/ʻ/g, "'")
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E\n]/g, '')
    .trim();
}

function loadArray(filePath, varName) {
  const source = fs.readFileSync(filePath, 'utf8') + `\n;globalThis.__array = ${varName};`;
  const context = { globalThis: {} };
  vm.createContext(context);
  vm.runInContext(source, context);
  return context.globalThis.__array;
}

function writeJsArray(filePath, varName, data) {
  const body = `const ${varName} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, body);
}

function writeCatalog(filePath, localImageMap, overrides) {
  const body = `const CATALOG_LOCAL_IMAGE_MAP = ${JSON.stringify(localImageMap, null, 2)};
const CATALOG_OVERRIDES_BY_SLUG = ${JSON.stringify(overrides, null, 2)};

(function buildAttractionsCatalog() {
  const merged = [];
  const seenSlugs = new Set();
  const sources = [
    typeof attractions !== 'undefined' ? attractions : [],
    typeof attractionsPage5 !== 'undefined' ? attractionsPage5 : [],
    typeof attractionsPage6 !== 'undefined' ? attractionsPage6 : [],
    typeof attractionsPage7 !== 'undefined' ? attractionsPage7 : [],
    typeof attractionsPage8 !== 'undefined' ? attractionsPage8 : [],
  ];

  for (const source of sources) {
    for (const entry of source) {
      const override = CATALOG_OVERRIDES_BY_SLUG[entry.slug] || {};
      const row = { ...entry, ...override };
      if (CATALOG_LOCAL_IMAGE_MAP[entry.slug]) {
        row.image = '../shared/images/' + CATALOG_LOCAL_IMAGE_MAP[entry.slug];
      }
      if (seenSlugs.has(row.slug)) continue;
      seenSlugs.add(row.slug);
      merged.push(row);
    }
  }

  globalThis.ATTRACTIONS_CATALOG = merged;
})();
`;
  fs.writeFileSync(filePath, body);
}

function normalize(text) {
  return ascii(text || '')
    .replace(/['`]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function coreName(text) {
  return normalize(text)
    .replace(/\b(national|park|parks|preserve|monument|historic|historical|site|memorial|memorials|military|battlefield|battlefields|recreation|area|seashore|lakeshore|parkway|river|scenic|trail|and|state)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text) {
  return normalize(text).replace(/\s+/g, '-');
}

function formatStates(stateCodes) {
  return String(stateCodes || '')
    .split(',')
    .map(code => code.trim())
    .filter(Boolean)
    .map(code => STATE_NAMES[code] || code)
    .join(' / ');
}

function regionForStates(stateCodes) {
  const primary = String(stateCodes || '').split(',')[0]?.trim();
  return REGION_BY_STATE[primary] || 'Pacific West';
}

function hashString(text) {
  let hash = 0;
  for (const ch of text) {
    hash = ((hash << 5) - hash) + ch.charCodeAt(0);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickTop(items, count, fallback) {
  if (items.length >= count) return items.slice(0, count);
  const output = [...items];
  for (const item of fallback) {
    if (!output.includes(item)) output.push(item);
    if (output.length >= count) break;
  }
  return output;
}

function normalizeActivity(name) {
  const value = ascii(name || '');
  const map = {
    Astronomy: 'Stargazing',
    Biking: 'Cycling',
    Boating: 'Boat Tours',
    Camping: 'Camping',
    Canyoneering: 'Canyoneering',
    Climbing: 'Rock Climbing',
    Fishing: 'Fishing',
    Guided: 'Guided Tours',
    Hiking: 'Hiking',
    Historic: 'History Walks',
    Horse: 'Horseback Riding',
    Kayak: 'Kayaking',
    Museum: 'Museum Visit',
    Photography: 'Photography',
    Paddling: 'Kayaking',
    Scenic: 'Scenic Driving',
    Snowshoeing: 'Snowshoeing',
    Stargazing: 'Stargazing',
    Swimming: 'Swimming',
    Tours: 'Guided Tours',
    Walking: 'Hiking',
    Wildlife: 'Wildlife Watching',
  };
  for (const [needle, label] of Object.entries(map)) {
    if (value.includes(needle)) return label;
  }
  return '';
}

function deriveActivities(record) {
  const names = (record.activities || [])
    .map(activity => normalizeActivity(activity.name))
    .filter(Boolean);

  const defaults = {
    'National Park': ['Hiking', 'Wildlife Watching', 'Photography', 'Scenic Driving'],
    'National Park & Preserve': ['Hiking', 'Wildlife Watching', 'Photography', 'Boat Tours'],
    'National Monument': ['Hiking', 'Photography', 'Guided Tours'],
    'National Historic Site': ['Guided Tours', 'Museum Visit', 'Photography'],
    'National Historical Park': ['Guided Tours', 'Museum Visit', 'Photography'],
    'National Memorial': ['Guided Tours', 'Photography', 'Museum Visit'],
    'National Recreation Area': ['Hiking', 'Camping', 'Boat Tours', 'Fishing'],
    Parkway: ['Scenic Driving', 'Hiking', 'Photography'],
    'National Seashore': ['Hiking', 'Swimming', 'Photography', 'Wildlife Watching'],
    'National Lakeshore': ['Hiking', 'Swimming', 'Photography', 'Kayaking'],
    'National Scenic Trail': ['Hiking', 'Camping', 'Photography'],
    default: ['Photography', 'Guided Tours', 'Hiking'],
  };

  return pickTop(
    [...new Set(names)],
    5,
    defaults[record.designation] || defaults.default,
  );
}

function formatFee(record) {
  const fees = (record.entranceFees || [])
    .map(fee => ({ cost: Number(fee.cost || 0), title: ascii(fee.title || '') }))
    .filter(fee => Number.isFinite(fee.cost));
  const paid = fees.filter(fee => fee.cost > 0).sort((a, b) => a.cost - b.cost);
  if (!paid.length) return 'Free';
  const fee = paid[0];
  if (/vehicle/i.test(fee.title)) return `$${fee.cost.toFixed(0)}/vehicle`;
  if (/person|adult|individual/i.test(fee.title)) return `$${fee.cost.toFixed(0)}/person`;
  return `$${fee.cost.toFixed(0)}/entry`;
}

function durationFor(record) {
  const designation = record.designation;
  if (designation === 'National Park' || designation === 'National Park & Preserve') return '2-4 days';
  if (designation === 'National Recreation Area') return '1-2 days';
  if (designation === 'National Seashore' || designation === 'National Lakeshore') return '1-2 days';
  if (designation === 'National Scenic Trail') return '1-3 days';
  if (designation === 'Parkway') return 'Half day-2 days';
  if (/Historic|Historical|Memorial|Battlefield|Military/.test(designation)) return '2-4 hours';
  if (/Monument/.test(designation)) return 'Half day-1 day';
  return 'Half day-1 day';
}

function difficultyFor(record, activities) {
  const label = activities.join(' ');
  if (/Rock Climbing|Canyoneering|Backpacking|Snowshoeing/.test(label)) return 'Moderate to Strenuous';
  if (record.designation === 'National Park' || record.designation === 'National Park & Preserve') return 'Easy to Moderate';
  if (/Historic|Historical|Memorial|Battlefield|Military/.test(record.designation)) return 'Easy';
  return 'Easy to Moderate';
}

function accessibilityFor(record) {
  const remoteCodes = new Set(['gaar', 'katm', 'kova', 'lacl', 'wrst', 'npsa', 'cakr']);
  return !remoteCodes.has(record.parkCode);
}

function tagsFor(record, region, state) {
  const tags = [];
  const topicNames = (record.topics || []).map(topic => ascii(topic.name || '')).filter(Boolean);
  if (topicNames.length) tags.push(...topicNames.slice(0, 2));
  tags.push(ascii(record.designation));
  tags.push(region);
  const primaryState = state.split(' / ')[0];
  if (primaryState) tags.push(primaryState);
  return [...new Set(tags)].slice(0, 5);
}

function ratingFor(record) {
  const ranges = {
    'National Park': [4.7, 4.9],
    'National Park & Preserve': [4.7, 4.9],
    'National Monument': [4.5, 4.8],
    'National Historic Site': [4.4, 4.7],
    'National Historical Park': [4.5, 4.8],
    'National Memorial': [4.4, 4.7],
    'National Recreation Area': [4.5, 4.8],
    default: [4.4, 4.7],
  };
  const [min, max] = ranges[record.designation] || ranges.default;
  const hash = hashString(record.parkCode || record.fullName);
  const value = min + ((hash % 20) / 20) * (max - min);
  return Number(value.toFixed(1));
}

function reviewsFor(record) {
  const base = {
    'National Park': 15000,
    'National Park & Preserve': 12000,
    'National Monument': 6000,
    'National Historic Site': 4500,
    'National Historical Park': 5500,
    'National Memorial': 8000,
    'National Recreation Area': 7000,
    default: 4000,
  };
  return (base[record.designation] || base.default) + (hashString(record.parkCode || record.fullName) % 22000);
}

function descriptionFor(record) {
  return ascii(record.description || record.fullName);
}

function buildGeneratedEntry(record, id, localImageMap) {
  const state = formatStates(record.states);
  const region = regionForStates(record.states);
  const activities = deriveActivities(record);
  const slug = slugify(record.fullName);

  return {
    id,
    name: ascii(record.fullName),
    slug,
    parkCode: ascii(record.parkCode),
    designation: ascii(record.designation),
    state,
    region,
    category: ascii(record.designation),
    description: descriptionFor(record),
    rating: ratingFor(record),
    reviews: reviewsFor(record),
    fee: formatFee(record),
    bestTime: BEST_TIME_BY_REGION[region] || 'May-October',
    duration: durationFor(record),
    activities,
    difficulty: difficultyFor(record, activities),
    accessibility: accessibilityFor(record),
    image: localImageMap[slug]
      ? `../shared/images/${localImageMap[slug]}`
      : ascii(record.images?.[0]?.url || ''),
    tags: tagsFor(record, region, state),
    lodgingCost: REGION_LODGING[region] || '$$',
    travelTime: REGION_TRAVEL_TIMES[region] || REGION_TRAVEL_TIMES['Pacific West'],
  };
}

function buildKingsCanyonEntry(id, sekiRecord, localImageMap) {
  return {
    id,
    name: 'Kings Canyon National Park',
    slug: 'kings-canyon',
    parkCode: 'seki-kings',
    designation: 'National Park',
    state: 'California',
    region: 'Pacific West',
    category: 'National Park',
    description: 'Kings Canyon National Park protects granite peaks, deep glacial canyons, and roaring Sierra rivers in the wilder half of the Sequoia and Kings Canyon park complex. Cedar Grove, Zumwalt Meadow, and the Kings River corridor deliver dramatic alpine scenery with fewer crowds than nearby giant-tree groves. The park rewards travelers looking for high-country hiking, river viewpoints, and a more remote Sierra Nevada road trip.',
    rating: 4.8,
    reviews: 17420,
    fee: '$35/vehicle',
    bestTime: 'June-October',
    duration: '2-3 days',
    activities: ['Hiking', 'Photography', 'Camping', 'Scenic Driving', 'Wildlife Watching'],
    difficulty: 'Easy to Moderate',
    accessibility: true,
    image: localImageMap['kings-canyon']
      ? `../shared/images/${localImageMap['kings-canyon']}`
      : ascii(sekiRecord.images?.[0]?.url || ''),
    tags: ['Sierra Nevada', 'Granite Peaks', 'River Canyon', 'California'],
    lodgingCost: '$$$',
    travelTime: REGION_TRAVEL_TIMES['Pacific West'],
  };
}

function matchExistingRecord(entry, npsByCode, npsByCore) {
  const code = EXISTING_PARK_CODE_OVERRIDES[entry.slug];
  if (code && npsByCode.has(code)) return npsByCode.get(code);
  const candidates = npsByCore.get(coreName(entry.name)) || [];
  if (candidates.length === 1) return candidates[0];
  if (!candidates.length) return null;
  const state = normalize(entry.state);
  return candidates.find(candidate => normalize(formatStates(candidate.states)).includes(state)) || candidates[0];
}

function main() {
  if (!fs.existsSync(NPS_DATA_PATH)) {
    throw new Error(`Missing NPS source data at ${NPS_DATA_PATH}`);
  }

  const baseData = loadArray(path.join(SHARED_DIR, 'data.js'), 'attractions');
  const page5Data = loadArray(path.join(SHARED_DIR, 'data_page5.js'), 'attractionsPage5');
  const localImageFiles = fs.readdirSync(IMAGES_DIR)
    .filter(name => /\.(jpg|jpeg|png|webp)$/i.test(name))
    .sort();
  const localImageMap = Object.fromEntries(
    localImageFiles.map(name => [name.replace(/\.(jpg|jpeg|png|webp)$/i, ''), name]),
  );

  const npsPayload = JSON.parse(fs.readFileSync(NPS_DATA_PATH, 'utf8'));
  const npsRecords = npsPayload.data.map(record => ({
    ...record,
    fullName: ascii(record.fullName),
    designation: ascii(record.designation),
    description: ascii(record.description),
    parkCode: ascii(record.parkCode),
    images: (record.images || []).map(image => ({
      ...image,
      url: ascii(image.url || ''),
    })),
  }));

  const npsByCode = new Map(npsRecords.map(record => [record.parkCode, record]));
  const npsByCore = new Map();
  for (const record of npsRecords) {
    const key = coreName(record.fullName);
    if (!npsByCore.has(key)) npsByCore.set(key, []);
    npsByCore.get(key).push(record);
  }

  const catalogOverrides = {};
  const baseCanonical = [];
  const seenSlugs = new Set();

  for (const rawEntry of [...baseData, ...page5Data]) {
    const entry = { ...rawEntry, ...(BASE_OVERRIDES[rawEntry.slug] || {}) };
    const matched = matchExistingRecord(entry, npsByCode, npsByCore);
    if (matched) {
      const override = {
        parkCode: matched.parkCode,
        designation: matched.designation,
      };
      if (!localImageMap[entry.slug] && matched.images?.[0]?.url) {
        override.image = matched.images[0].url;
      }
      catalogOverrides[entry.slug] = { ...(catalogOverrides[entry.slug] || {}), ...override, ...(BASE_OVERRIDES[entry.slug] || {}) };
    } else if (BASE_OVERRIDES[entry.slug]) {
      catalogOverrides[entry.slug] = { ...(catalogOverrides[entry.slug] || {}), ...(BASE_OVERRIDES[entry.slug] || {}) };
    }

    if (!localImageMap[entry.slug] && NON_NPS_IMAGE_OVERRIDES[entry.slug]) {
      catalogOverrides[entry.slug] = {
        ...(catalogOverrides[entry.slug] || {}),
        image: NON_NPS_IMAGE_OVERRIDES[entry.slug],
      };
    }

    if (seenSlugs.has(entry.slug)) continue;
    seenSlugs.add(entry.slug);
    baseCanonical.push({ ...entry, ...(catalogOverrides[entry.slug] || {}) });
  }

  const representedCodes = new Set(baseCanonical.map(entry => entry.parkCode).filter(Boolean));
  const representedCoreNames = new Set(baseCanonical.map(entry => coreName(entry.name)).filter(Boolean));

  const generated = [];
  const sekiRecord = npsByCode.get('seki');
  if (!representedCoreNames.has('kings canyon')) {
    generated.push(buildKingsCanyonEntry(161, sekiRecord, localImageMap));
    representedCoreNames.add('kings canyon');
  }

  let nextId = 161 + generated.length;
  outer:
  for (const designationGroup of DESIGNATION_PRIORITY) {
    const groupRecords = npsRecords
      .filter(record => designationGroup.includes(record.designation))
      .sort((left, right) => left.fullName.localeCompare(right.fullName));

    for (const record of groupRecords) {
      if (record.parkCode === 'seki') continue;
      if (representedCodes.has(record.parkCode)) continue;
      const key = coreName(record.fullName);
      if (representedCoreNames.has(key)) continue;

      generated.push(buildGeneratedEntry(record, nextId, localImageMap));
      representedCodes.add(record.parkCode);
      representedCoreNames.add(key);
      nextId += 1;

      if (generated.length === 144) break outer;
    }
  }

  if (generated.length !== 144) {
    throw new Error(`Expected 144 generated records, found ${generated.length}`);
  }

  writeJsArray(path.join(SHARED_DIR, 'data_page6.js'), 'attractionsPage6', generated.slice(0, 50));
  writeJsArray(path.join(SHARED_DIR, 'data_page7.js'), 'attractionsPage7', generated.slice(50, 100));
  writeJsArray(path.join(SHARED_DIR, 'data_page8.js'), 'attractionsPage8', generated.slice(100));
  writeCatalog(path.join(SHARED_DIR, 'data_catalog.js'), localImageMap, catalogOverrides);

  const runtimeTotal = baseCanonical.length + generated.length;
  console.log(`Generated ${generated.length} new attractions across page6-8.`);
  console.log(`Canonical runtime total: ${runtimeTotal}`);
}

main();
