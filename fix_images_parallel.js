#!/usr/bin/env node
/**
 * Download relevant images for all remaining attractions using:
 * 1. Unsplash source search (free, no rate limit, relevant keywords)
 * 2. NPS API for national parks (official photos)
 * Runs in parallel batches of 8.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'shared', 'images');
const CONCURRENCY = 8;

// All attractions with curated Unsplash search terms for maximum relevance
const ATTRACTIONS = [
  // Only ones that need replacing (< 150KB currently)
  { slug: 'acadia',                  search: 'acadia national park maine lighthouse' },
  { slug: 'great-smoky',             search: 'great smoky mountains fog forest tennessee' },
  { slug: 'bryce-canyon',            search: 'bryce canyon hoodoos utah red rock' },
  { slug: 'everglades',              search: 'everglades national park florida wetlands' },
  { slug: 'mount-rainier',           search: 'mount rainier volcano washington snow peak' },
  { slug: 'shenandoah',              search: 'shenandoah national park blue ridge mountains virginia' },
  { slug: 'sequoia',                 search: 'sequoia national park giant redwood tree california' },
  { slug: 'denali',                  search: 'denali national park alaska mountain wilderness' },
  { slug: 'canyonlands-ut',          search: 'canyonlands national park utah mesa canyon' },
  { slug: 'capitol-reef-ut',         search: 'capitol reef national park utah waterpocket fold' },
  { slug: 'mesa-verde-cliff',        search: 'mesa verde cliff palace colorado ancient ruins' },
  { slug: 'guadalupe-mountains-tx',  search: 'guadalupe mountains national park texas peak' },
  { slug: 'pinnacles-ca',            search: 'pinnacles national park california rock formations condor' },
  { slug: 'channel-islands-ca',      search: 'channel islands national park california ocean' },
  { slug: 'lassen-volcanic-ca',      search: 'lassen volcanic national park california hot springs' },
  { slug: 'north-cascades-wa',       search: 'north cascades national park washington mountain lake' },
  { slug: 'kenai-fjords-ak',         search: 'kenai fjords national park alaska glacier' },
  { slug: 'gates-of-the-arctic-ak',  search: 'gates of the arctic alaska wilderness mountains' },
  { slug: 'new-river-gorge-wv',      search: 'new river gorge west virginia bridge canyon' },
  { slug: 'isle-royale-mi',          search: 'isle royale michigan lake superior wilderness moose' },
  { slug: 'theodore-roosevelt-nd',   search: 'theodore roosevelt national park north dakota badlands' },
  { slug: 'wind-cave-sd',            search: 'wind cave national park south dakota bison' },
  { slug: 'hot-springs-np-ar',       search: 'hot springs national park arkansas historic bathhouse' },
  { slug: 'mount-rushmore-sd',       search: 'mount rushmore south dakota presidents granite' },
  { slug: 'independence-hall-pa',    search: 'independence hall philadelphia pennsylvania historic' },
  { slug: 'liberty-bell-center-pa',  search: 'liberty bell philadelphia pennsylvania historic' },
  { slug: 'gettysburg-nmp-pa',       search: 'gettysburg national military park battlefield civil war' },
  { slug: 'chaco-culture-nhp-nm',    search: 'chaco canyon new mexico ancient ruins pueblo' },
  { slug: 'muir-woods-nm-ca',        search: 'muir woods redwood forest california trail' },
  { slug: 'golden-gate-nra-ca',      search: 'golden gate bridge san francisco california bay' },
  { slug: 'alcatraz-island-ca',      search: 'alcatraz island prison san francisco bay california' },
  { slug: 'monument-valley-navajo-az','search': 'monument valley arizona navajo buttes red rock' },
  { slug: 'rainbow-bridge-nm-ut',    search: 'rainbow bridge utah natural arch canyon' },
  { slug: 'natural-bridges-nm-ut',   search: 'natural bridges utah stone arch canyon' },
  { slug: 'craters-of-the-moon-nm-id',search: 'craters of the moon idaho lava volcanic' },
  { slug: 'lava-beds-nm-ca',         search: 'lava beds california volcanic caves tubehollow' },
  { slug: 'dinosaur-nm-co',          search: 'dinosaur national monument colorado fossils canyon' },
  { slug: 'oregon-caves-nm-or',      search: 'oregon caves national monument marble cave stalactite' },
  { slug: 'sunset-crater-volcano-nm-az','search': 'sunset crater volcano arizona cinder cone' },
  { slug: 'wupatki-nm-az',           search: 'wupatki national monument arizona ancient pueblo ruins' },
  { slug: 'mesa-verde-cliff-palace-co','search': 'cliff palace mesa verde colorado ancient pueblo' },
  { slug: 'na-pali-coast',           search: 'na pali coast kauai hawaii cliffs ocean' },
  { slug: 'horseshoe-bend',          search: 'horseshoe bend arizona colorado river canyon' },
  { slug: 'havasu-falls',            search: 'havasu falls havasupai arizona turquoise waterfall' },
  { slug: 'blue-ridge-parkway',      search: 'blue ridge parkway appalachian mountains autumn road' },
  { slug: 'going-to-the-sun-road',   search: 'going to the sun road glacier national park montana' },
  { slug: 'pacific-coast-highway',   search: 'pacific coast highway california ocean cliffs' },
  { slug: 'cape-hatteras',           search: 'cape hatteras lighthouse north carolina outer banks' },
  { slug: 'indiana-dunes',           search: 'indiana dunes national park lake michigan sand dunes' },
  { slug: 'pictured-rocks',          search: 'pictured rocks national lakeshore michigan cliffs' },
  { slug: 'great-sand-dunes',        search: 'great sand dunes national park colorado' },
  { slug: 'theodore-roosevelt',      search: 'theodore roosevelt national park north dakota badlands' },
  { slug: 'kenai-fjords',            search: 'kenai fjords alaska glacier ocean kayak' },
  { slug: 'mesa-verde-cliff-dwellings','search': 'mesa verde national park colorado cliff dwellings' },
  { slug: 'guadalupe-mountains',     search: 'guadalupe mountains national park texas desert' },
  { slug: 'kobuk-valley',            search: 'kobuk valley national park alaska sand dunes caribou' },
  { slug: 'saguaro',                 search: 'saguaro national park arizona cactus desert sunset' },
  { slug: 'channel-islands',         search: 'channel islands california ocean sea lion' },
  { slug: 'yosemite',                search: 'yosemite national park half dome granite valley' },
  { slug: 'mount-rushmore-sd',       search: 'mount rushmore memorial south dakota presidents rock' },
  { slug: 'timpanogos-cave-nm-ut',   search: 'timpanogos cave utah stalactite formations' },
];

// Remove duplicates by slug
const seen = new Set();
const uniqueAttractions = ATTRACTIONS.filter(a => {
  if (seen.has(a.slug)) return false;
  seen.add(a.slug);
  return true;
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function followRedirects(url, maxRedirects = 8) {
  return new Promise((resolve, reject) => {
    const attempt = (u, hops) => {
      if (hops > maxRedirects) { reject(new Error('too many redirects')); return; }
      const mod = u.startsWith('https') ? https : http;
      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; TouristSite/1.0)',
          'Accept': 'image/*,*/*',
        }
      };
      const req = mod.get(u, options, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          const next = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, u).href;
          return attempt(next, hops + 1);
        }
        resolve({ res, finalUrl: u });
      });
      req.on('error', reject);
      req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
    };
    attempt(url, 0);
  });
}

function downloadFromUrl(url, destPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const { res, finalUrl } = await followRedirects(url);
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} from ${finalUrl.substring(0, 80)}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(destPath).size;
        resolve({ size, finalUrl });
      });
      file.on('error', e => { fs.unlink(destPath, () => {}); reject(e); });
      res.on('error', e => { fs.unlink(destPath, () => {}); reject(e); });
    } catch (e) {
      reject(e);
    }
  });
}

function buildUnsplashUrl(search) {
  // Unsplash source with featured photos for relevance
  const encoded = encodeURIComponent(search);
  return `https://source.unsplash.com/1600x900/?${encoded}`;
}

async function processAttraction(item, index, total) {
  const { slug, search } = item;
  const destPath = path.join(IMAGES_DIR, `${slug}.jpg`);

  // Skip if already a good, large image (> 150KB)
  if (fs.existsSync(destPath)) {
    const size = fs.statSync(destPath).size;
    if (size > 150000) {
      return { slug, status: 'skipped', size };
    }
  }

  const url = buildUnsplashUrl(search);
  try {
    const { size, finalUrl } = await downloadFromUrl(url, destPath);
    console.log(`[${index+1}/${total}] ✓ ${slug} (${Math.round(size/1024)}KB)`);
    return { slug, status: 'ok', size };
  } catch (e) {
    console.log(`[${index+1}/${total}] ✗ ${slug}: ${e.message}`);
    return { slug, status: 'fail', error: e.message };
  }
}

async function runParallel(items, concurrency) {
  const results = [];
  let idx = 0;

  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      const result = await processAttraction(items[i], i, items.length);
      results.push(result);
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  // Filter to only ones that need downloading
  const toDownload = uniqueAttractions.filter(a => {
    const destPath = path.join(IMAGES_DIR, `${a.slug}.jpg`);
    if (!fs.existsSync(destPath)) return true;
    return fs.statSync(destPath).size < 150000;
  });

  console.log(`Downloading ${toDownload.length} images in parallel (${CONCURRENCY} concurrent)...\n`);

  const results = await runParallel(toDownload, CONCURRENCY);

  const ok = results.filter(r => r.status === 'ok').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const failed = results.filter(r => r.status === 'fail');

  console.log(`\n=== DONE ===`);
  console.log(`Downloaded: ${ok}`);
  console.log(`Skipped (good): ${skipped}`);
  console.log(`Failed: ${failed.length}`);
  if (failed.length > 0) {
    console.log('Failed slugs:', failed.map(r => r.slug).join(', '));
  }
}

main().catch(console.error);
