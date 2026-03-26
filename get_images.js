#!/usr/bin/env node
/**
 * Download relevant images using:
 *  1. NPS API (DEMO_KEY) for national parks → official NPS photos
 *  2. loremflickr.com for other attractions → CC Flickr photos by keyword
 * Runs fully in parallel.
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const IMAGES_DIR = path.join(__dirname, 'shared', 'images');
const CONCURRENCY = 12;

// Map slug → { nps: 'PARKCODE' } OR { flickr: 'keyword1,keyword2,...' }
const SOURCES = {
  // ── NPS parks (official photos) ─────────────────────────────────────────
  acadia:                      { nps: 'acad' },
  'great-smoky':               { nps: 'grsm' },
  'bryce-canyon':              { nps: 'brca' },
  everglades:                  { nps: 'ever' },
  'mount-rainier':             { nps: 'mora' },
  shenandoah:                  { nps: 'shen' },
  sequoia:                     { nps: 'sequ' },
  denali:                      { nps: 'dena' },
  'canyonlands-ut':            { nps: 'cany' },
  'capitol-reef-ut':           { nps: 'care' },
  'mesa-verde-cliff':          { nps: 'meve' },
  'guadalupe-mountains-tx':    { nps: 'gumo' },
  'pinnacles-ca':              { nps: 'pinn' },
  'channel-islands-ca':        { nps: 'chis' },
  'lassen-volcanic-ca':        { nps: 'lavo' },
  'north-cascades-wa':         { nps: 'noca' },
  'kenai-fjords-ak':           { nps: 'kefj' },
  'gates-of-the-arctic-ak':    { nps: 'gaar' },
  'new-river-gorge-wv':        { nps: 'neri' },
  'isle-royale-mi':            { nps: 'isro' },
  'theodore-roosevelt-nd':     { nps: 'thro' },
  'wind-cave-sd':              { nps: 'wica' },
  'hot-springs-np-ar':         { nps: 'hosp' },
  'mount-rushmore-sd':         { nps: 'moru' },
  'independence-hall-pa':      { nps: 'inde' },
  'liberty-bell-center-pa':    { nps: 'inde' },
  'gettysburg-nmp-pa':         { nps: 'gett' },
  'chaco-culture-nhp-nm':      { nps: 'chcu' },
  'muir-woods-nm-ca':          { nps: 'muwo' },
  'golden-gate-nra-ca':        { nps: 'goga' },
  'alcatraz-island-ca':        { nps: 'alca' },
  'rainbow-bridge-nm-ut':      { nps: 'rabr' },
  'natural-bridges-nm-ut':     { nps: 'nabr' },
  'craters-of-the-moon-nm-id': { nps: 'crmo' },
  'lava-beds-nm-ca':           { nps: 'labe' },
  'dinosaur-nm-co':            { nps: 'dino' },
  'oregon-caves-nm-or':        { nps: 'orca' },
  'sunset-crater-volcano-nm-az':{ nps: 'sucr' },
  'wupatki-nm-az':             { nps: 'wupa' },
  'mesa-verde-cliff-palace-co':{ nps: 'meve' },
  'blue-ridge-parkway':        { nps: 'blri' },
  'going-to-the-sun-road':     { nps: 'glac' },
  'cape-hatteras':             { nps: 'caha' },
  'indiana-dunes':             { nps: 'indu' },
  'pictured-rocks':            { nps: 'piro' },
  'great-sand-dunes':          { nps: 'grsa' },
  'theodore-roosevelt':        { nps: 'thro' },
  'kenai-fjords':              { nps: 'kefj' },
  'mesa-verde-cliff-dwellings':{ nps: 'meve' },
  'guadalupe-mountains':       { nps: 'gumo' },
  'kobuk-valley':              { nps: 'kova' },
  saguaro:                     { nps: 'sagu' },
  'channel-islands':           { nps: 'chis' },
  yosemite:                    { nps: 'yose' },

  // ── loremflickr for non-NPS / special ───────────────────────────────────
  'monument-valley-navajo-az': { flickr: 'monument valley,arizona,buttes,navajo' },
  'horseshoe-bend':            { flickr: 'horseshoe bend,arizona,colorado river,canyon' },
  'na-pali-coast':             { flickr: 'na pali coast,kauai,hawaii,cliffs' },
  'havasu-falls':              { flickr: 'havasu falls,havasupai,arizona,turquoise waterfall' },
  'timpanogos-cave-nm-ut':     { flickr: 'timpanogos cave,utah,stalactite,cave formations' },
  'pacific-coast-highway':     { flickr: 'pacific coast highway,california,highway 1,ocean cliff' },
  'appalachian-trail':         { flickr: 'appalachian trail,forest,hiking,mountain trail' },
  'assateague-island':         { flickr: 'assateague island,wild horses,beach,maryland' },
  'apostle-islands':           { flickr: 'apostle islands,sea caves,lake superior,wisconsin' },
  'wrangell-st-elias':         { flickr: 'wrangell st elias,alaska,wilderness,mountains glacier' },
  'the-wave':                  { flickr: 'the wave arizona,sandstone,vermilion cliffs,canyon' },
};

function fetchHttps(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 TouristSite/1.0',
        'Accept': 'application/json, image/*, */*',
        ...opts.headers,
      }
    }, (res) => {
      if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location) {
        res.resume();
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return fetchHttps(next, opts).then(resolve).catch(reject);
      }
      resolve(res);
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function fetchJson(url) {
  const res = await fetchHttps(url);
  const chunks = [];
  await new Promise((resolve, reject) => {
    res.on('data', c => chunks.push(c));
    res.on('end', resolve);
    res.on('error', reject);
  });
  if (res.statusCode !== 200) throw new Error(`HTTP ${res.statusCode}`);
  return JSON.parse(Buffer.concat(chunks).toString());
}

async function downloadStream(res, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    res.pipe(file);
    file.on('finish', () => { file.close(); resolve(fs.statSync(destPath).size); });
    file.on('error', e => { fs.unlink(destPath, () => {}); reject(e); });
    res.on('error', e => { fs.unlink(destPath, () => {}); reject(e); });
  });
}

async function getNpsImageUrl(parkCode) {
  const url = `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&fields=images&api_key=DEMO_KEY`;
  const data = await fetchJson(url);
  if (!data.data || !data.data[0]) throw new Error('no NPS data');
  const imgs = data.data[0].images;
  if (!imgs || imgs.length === 0) throw new Error('no NPS images');
  // Pick the first landscape image (usually index 0)
  return imgs[0].url;
}

async function downloadNps(parkCode, destPath) {
  const imgUrl = await getNpsImageUrl(parkCode);
  const res = await fetchHttps(imgUrl);
  if (res.statusCode !== 200) {
    res.resume();
    throw new Error(`HTTP ${res.statusCode} from NPS image`);
  }
  return downloadStream(res, destPath);
}

async function downloadFlickr(keywords, destPath) {
  const encoded = encodeURIComponent(keywords);
  const url = `https://loremflickr.com/1600/900/${encoded}`;
  const res = await fetchHttps(url);
  if (res.statusCode !== 200) {
    res.resume();
    throw new Error(`HTTP ${res.statusCode} from loremflickr`);
  }
  return downloadStream(res, destPath);
}

async function processOne(slug, source, idx, total) {
  const destPath = path.join(IMAGES_DIR, `${slug}.jpg`);

  // Skip if already a substantial image (>150KB)
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 150000) {
    console.log(`[${idx}/${total}] SKIP  ${slug} (already good)`);
    return 'skipped';
  }

  try {
    let size;
    if (source.nps) {
      size = await downloadNps(source.nps, destPath);
      console.log(`[${idx}/${total}] ✓ NPS   ${slug} (${Math.round(size/1024)}KB)`);
    } else {
      size = await downloadFlickr(source.flickr, destPath);
      console.log(`[${idx}/${total}] ✓ FLKR  ${slug} (${Math.round(size/1024)}KB)`);
    }
    return 'ok';
  } catch (e) {
    console.log(`[${idx}/${total}] ✗      ${slug}: ${e.message}`);
    return 'fail';
  }
}

async function main() {
  const entries = Object.entries(SOURCES);
  // Filter to only ones needing download
  const todo = entries.filter(([slug]) => {
    const p = path.join(IMAGES_DIR, `${slug}.jpg`);
    return !fs.existsSync(p) || fs.statSync(p).size <= 150000;
  });

  console.log(`Downloading ${todo.length} images (${CONCURRENCY} parallel)...\n`);

  const results = { ok: 0, skipped: 0, fail: 0, failList: [] };
  let idx = 0;

  async function worker() {
    while (idx < todo.length) {
      const i = idx++;
      const [slug, source] = todo[i];
      const r = await processOne(slug, source, i + 1, todo.length);
      results[r]++;
      if (r === 'fail') results.failList.push(slug);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`\n=== DONE ===`);
  console.log(`✓ Downloaded : ${results.ok}`);
  console.log(`  Skipped    : ${results.skipped}`);
  console.log(`✗ Failed     : ${results.fail}`);
  if (results.failList.length) console.log('  Failed:', results.failList.join(', '));
}

main().catch(console.error);
