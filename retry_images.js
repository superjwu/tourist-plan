#!/usr/bin/env node
/**
 * Retry failed image downloads using Wikipedia thumbnail URLs (800px)
 * instead of original high-res images, with longer delays.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'shared', 'images');
const DELAY_MS = 2500;

// Slugs that failed in previous run (429) + missing ones
const RETRY_SLUGS = [
  'acadia', 'great-smoky', 'bryce-canyon', 'everglades', 'mount-rainier',
  'shenandoah', 'sequoia', 'denali', 'canyonlands-ut', 'capitol-reef-ut',
  'mesa-verde-cliff', 'guadalupe-mountains-tx', 'pinnacles-ca',
  'channel-islands-ca', 'lassen-volcanic-ca', 'north-cascades-wa',
  'kenai-fjords-ak', 'gates-of-the-arctic-ak', 'new-river-gorge-wv',
  'isle-royale-mi', 'theodore-roosevelt-nd', 'wind-cave-sd',
  'hot-springs-np-ar', 'mount-rushmore-sd', 'independence-hall-pa',
  'liberty-bell-center-pa', 'gettysburg-nmp-pa', 'chaco-culture-nhp-nm',
  'muir-woods-nm-ca', 'golden-gate-nra-ca', 'alcatraz-island-ca',
  'monument-valley-navajo-az', 'rainbow-bridge-nm-ut', 'natural-bridges-nm-ut',
  'craters-of-the-moon-nm-id', 'lava-beds-nm-ca', 'dinosaur-nm-co',
  'oregon-caves-nm-or', 'sunset-crater-volcano-nm-az', 'wupatki-nm-az',
  'mesa-verde-cliff-palace-co', 'horseshoe-bend', 'blue-ridge-parkway',
  'going-to-the-sun-road', 'cape-hatteras', 'indiana-dunes',
  'pictured-rocks', 'great-sand-dunes', 'theodore-roosevelt', 'kenai-fjords',
  'mesa-verde-cliff-dwellings', 'guadalupe-mountains', 'kobuk-valley',
  'saguaro', 'channel-islands',
  // No-image failures - using alternate titles
  'timpanogos-cave-nm-ut', 'na-pali-coast', 'havasu-falls',
];

// Override titles for the ones that had 404 or no-image
const ALT_TITLES = {
  'timpanogos-cave-nm-ut':  'Timpanogos Cave',
  'na-pali-coast':          'Nā Pali Coast',
  'havasu-falls':           'Havasu Falls',
};

// Same as download_images.js
const WIKI_TITLES = {
  'acadia':                   'Acadia National Park',
  'great-smoky':              'Great Smoky Mountains National Park',
  'bryce-canyon':             'Bryce Canyon National Park',
  'everglades':               'Everglades National Park',
  'mount-rainier':            'Mount Rainier National Park',
  'shenandoah':               'Shenandoah National Park',
  'sequoia':                  'Sequoia National Park',
  'denali':                   'Denali National Park and Preserve',
  'canyonlands-ut':           'Canyonlands National Park',
  'capitol-reef-ut':          'Capitol Reef National Park',
  'mesa-verde-cliff':         'Mesa Verde National Park',
  'guadalupe-mountains-tx':   'Guadalupe Mountains National Park',
  'pinnacles-ca':             'Pinnacles National Park',
  'channel-islands-ca':       'Channel Islands National Park',
  'lassen-volcanic-ca':       'Lassen Volcanic National Park',
  'north-cascades-wa':        'North Cascades National Park',
  'kenai-fjords-ak':          'Kenai Fjords National Park',
  'gates-of-the-arctic-ak':   'Gates of the Arctic National Park and Preserve',
  'new-river-gorge-wv':       'New River Gorge National Park and Preserve',
  'isle-royale-mi':           'Isle Royale National Park',
  'theodore-roosevelt-nd':    'Theodore Roosevelt National Park',
  'wind-cave-sd':             'Wind Cave National Park',
  'hot-springs-np-ar':        'Hot Springs National Park',
  'mount-rushmore-sd':        'Mount Rushmore National Memorial',
  'independence-hall-pa':     'Independence Hall',
  'liberty-bell-center-pa':   'Liberty Bell',
  'gettysburg-nmp-pa':        'Gettysburg National Military Park',
  'chaco-culture-nhp-nm':     'Chaco Culture National Historical Park',
  'muir-woods-nm-ca':         'Muir Woods National Monument',
  'golden-gate-nra-ca':       'Golden Gate National Recreation Area',
  'alcatraz-island-ca':       'Alcatraz Island',
  'monument-valley-navajo-az':'Monument Valley',
  'rainbow-bridge-nm-ut':     'Rainbow Bridge National Monument',
  'natural-bridges-nm-ut':    'Natural Bridges National Monument',
  'craters-of-the-moon-nm-id':'Craters of the Moon National Monument and Preserve',
  'lava-beds-nm-ca':          'Lava Beds National Monument',
  'dinosaur-nm-co':           'Dinosaur National Monument',
  'oregon-caves-nm-or':       'Oregon Caves National Monument and Preserve',
  'sunset-crater-volcano-nm-az':'Sunset Crater Volcano National Monument',
  'wupatki-nm-az':            'Wupatki National Monument',
  'mesa-verde-cliff-palace-co':'Cliff Palace',
  'horseshoe-bend':           'Horseshoe Bend (Arizona)',
  'blue-ridge-parkway':       'Blue Ridge Parkway',
  'going-to-the-sun-road':    'Going-to-the-Sun Road',
  'cape-hatteras':            'Cape Hatteras National Seashore',
  'indiana-dunes':            'Indiana Dunes National Park',
  'pictured-rocks':           'Pictured Rocks National Lakeshore',
  'great-sand-dunes':         'Great Sand Dunes National Park and Preserve',
  'theodore-roosevelt':       'Theodore Roosevelt National Park',
  'kenai-fjords':             'Kenai Fjords National Park',
  'mesa-verde-cliff-dwellings':'Mesa Verde National Park',
  'guadalupe-mountains':      'Guadalupe Mountains National Park',
  'kobuk-valley':             'Kobuk Valley National Park',
  'saguaro':                  'Saguaro National Park',
  'channel-islands':          'Channel Islands National Park',
  'timpanogos-cave-nm-ut':    'Timpanogos Cave',
  'na-pali-coast':            'Nā Pali Coast',
  'havasu-falls':             'Havasu Falls',
  'congaree':                 'Congaree National Park',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'TouristAttractionsSite/1.0 (educational; contact@example.com)',
        'Accept': 'application/json',
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchJson(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString() }));
      res.on('error', reject);
    }).on('error', reject).setTimeout(20000, function() { this.destroy(); reject(new Error('timeout')); });
  });
}

async function getWikiThumbnailUrl(title) {
  const encoded = encodeURIComponent(title);
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
  const res = await fetchJson(url);
  if (res.status !== 200) return null;
  const data = JSON.parse(res.body);

  // Prefer thumbnail URL (usually CDN-backed, less rate limited)
  if (data.thumbnail && data.thumbnail.source) {
    // Upgrade to 1024px wide thumbnail
    const thumbUrl = data.thumbnail.source.replace(/\/\d+px-/, '/1024px-');
    return thumbUrl;
  }
  if (data.originalimage && data.originalimage.source) {
    // Convert original to thumbnail URL format
    const orig = data.originalimage.source;
    // original: https://upload.wikimedia.org/wikipedia/commons/e/ea/Filename.jpg
    // thumb:    https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Filename.jpg/1024px-Filename.jpg
    const m = orig.match(/\/wikipedia\/(commons|en)\/([\w\/]+?)(\/[^\/]+\.(jpg|jpeg|png|gif|webp))$/i);
    if (m) {
      const namespace = m[1];
      const hash = m[2];
      const filename = m[3];
      const basename = filename.replace('/', '');
      return `https://upload.wikimedia.org/wikipedia/${namespace}/thumb/${hash}${filename}/1024px-${basename}`;
    }
    return orig;
  }
  return null;
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const attempt = (imgUrl, redirects) => {
      if (redirects > 5) { reject(new Error('too many redirects')); return; }
      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 TouristAttractionsSite/1.0',
          'Referer': 'https://en.wikipedia.org/'
        }
      };
      https.get(imgUrl, options, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          res.resume();
          return attempt(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(fs.statSync(destPath).size);
        });
        file.on('error', e => { fs.unlink(destPath, () => {}); reject(e); });
        res.on('error', e => { fs.unlink(destPath, () => {}); reject(e); });
      }).on('error', reject)
        .setTimeout(60000, function() { this.destroy(); reject(new Error('timeout')); });
    };
    attempt(url, 0);
  });
}

async function main() {
  const slugs = RETRY_SLUGS;
  console.log(`Retrying ${slugs.length} failed images with thumbnail URLs...\n`);

  let success = 0, failed = 0;

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const title = ALT_TITLES[slug] || WIKI_TITLES[slug] || slug;
    const destPath = path.join(IMAGES_DIR, `${slug}.jpg`);

    process.stdout.write(`[${i+1}/${slugs.length}] ${slug}: `);

    let imgUrl = null;
    try {
      imgUrl = await getWikiThumbnailUrl(title);
    } catch (e) {
      console.log(`FAIL API: ${e.message}`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    if (!imgUrl) {
      console.log(`FAIL no image for "${title}"`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    try {
      const size = await downloadImage(imgUrl, destPath);
      console.log(`OK (${Math.round(size/1024)}KB)`);
      success++;
    } catch (e) {
      console.log(`FAIL: ${e.message} — URL: ${imgUrl.substring(0,80)}`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n=== RETRY RESULTS ===`);
  console.log(`Downloaded: ${success}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
