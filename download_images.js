#!/usr/bin/env node
/**
 * Download relevant Wikipedia images for all 100 US tourist attractions.
 * Uses Wikipedia REST API with 1.5s delays to avoid rate limiting.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'shared', 'images');
const DELAY_MS = 1500;

// Map slug → Wikipedia article title (for ones that need custom mapping)
const WIKI_TITLES = {
  'yellowstone':              'Yellowstone National Park',
  'yosemite':                 'Yosemite National Park',
  'grand-canyon':             'Grand Canyon National Park',
  'zion':                     'Zion National Park',
  'glacier':                  'Glacier National Park (U.S.)',
  'olympic':                  'Olympic National Park',
  'acadia':                   'Acadia National Park',
  'great-smoky':              'Great Smoky Mountains National Park',
  'rocky-mountain':           'Rocky Mountain National Park',
  'joshua-tree':              'Joshua Tree National Park',
  'arches':                   'Arches National Park',
  'bryce-canyon':             'Bryce Canyon National Park',
  'crater-lake':              'Crater Lake National Park',
  'badlands':                 'Badlands National Park',
  'everglades':               'Everglades National Park',
  'grand-teton':              'Grand Teton National Park',
  'hawaii-volcanoes':         'Hawaiʻi Volcanoes National Park',
  'mount-rainier':            'Mount Rainier National Park',
  'shenandoah':               'Shenandoah National Park',
  'sequoia':                  'Sequoia National Park',
  'niagara-falls':            'Niagara Falls',
  'statue-of-liberty':        'Statue of Liberty',
  'antelope-canyon':          'Antelope Canyon',
  'death-valley':             'Death Valley National Park',
  'denali':                   'Denali National Park and Preserve',
  'canyonlands-ut':           'Canyonlands National Park',
  'capitol-reef-ut':          'Capitol Reef National Park',
  'mesa-verde-cliff':         'Mesa Verde National Park',
  'white-sands-nm':           'White Sands National Park',
  'guadalupe-mountains-tx':   'Guadalupe Mountains National Park',
  'big-bend-tx':              'Big Bend National Park',
  'carlsbad-caverns-nm':      'Carlsbad Caverns National Park',
  'petrified-forest-az':      'Petrified Forest National Park',
  'pinnacles-ca':             'Pinnacles National Park',
  'channel-islands-ca':       'Channel Islands National Park',
  'redwood-np-ca':            'Redwood National and State Parks',
  'lassen-volcanic-ca':       'Lassen Volcanic National Park',
  'north-cascades-wa':        'North Cascades National Park',
  'kenai-fjords-ak':          'Kenai Fjords National Park',
  'gates-of-the-arctic-ak':   'Gates of the Arctic National Park and Preserve',
  'biscayne-np-fl':           'Biscayne National Park',
  'dry-tortugas-fl':          'Dry Tortugas National Park',
  'congaree-np-sc':           'Congaree National Park',
  'new-river-gorge-wv':       'New River Gorge National Park and Preserve',
  'cuyahoga-valley-oh':       'Cuyahoga Valley National Park',
  'isle-royale-mi':           'Isle Royale National Park',
  'voyageurs-np-mn':          'Voyageurs National Park',
  'theodore-roosevelt-nd':    'Theodore Roosevelt National Park',
  'wind-cave-sd':             'Wind Cave National Park',
  'hot-springs-np-ar':        'Hot Springs National Park',
  'mount-rushmore-sd':        'Mount Rushmore National Memorial',
  'crazy-horse-memorial-sd':  'Crazy Horse Memorial',
  'gateway-arch-mo':          'Gateway Arch National Park',
  'independence-hall-pa':     'Independence Hall',
  'liberty-bell-center-pa':   'Liberty Bell',
  'ellis-island-ny':          'Ellis Island',
  'gettysburg-nmp-pa':        'Gettysburg National Military Park',
  'little-bighorn-battlefield-mt': 'Little Bighorn Battlefield National Monument',
  'chaco-culture-nhp-nm':     'Chaco Culture National Historical Park',
  'devils-tower-wy':          'Devils Tower National Monument',
  'muir-woods-nm-ca':         'Muir Woods National Monument',
  'golden-gate-nra-ca':       'Golden Gate National Recreation Area',
  'alcatraz-island-ca':       'Alcatraz Island',
  'monument-valley-navajo-az':'Monument Valley',
  'rainbow-bridge-nm-ut':     'Rainbow Bridge National Monument',
  'natural-bridges-nm-ut':    'Natural Bridges National Monument',
  'craters-of-the-moon-nm-id':'Craters of the Moon National Monument and Preserve',
  'lava-beds-nm-ca':          'Lava Beds National Monument',
  'dinosaur-nm-co':           'Dinosaur National Monument',
  'jewel-cave-nm-sd':         'Jewel Cave National Monument',
  'timpanogos-cave-nm-ut':    'Timpanogos Cave National Monument',
  'oregon-caves-nm-or':       'Oregon Caves National Monument and Preserve',
  'sunset-crater-volcano-nm-az': 'Sunset Crater Volcano National Monument',
  'wupatki-nm-az':            'Wupatki National Monument',
  'mesa-verde-cliff-palace-co':'Cliff Palace',
  'na-pali-coast':            'Nā Pali Coast State Wilderness Park',
  'horseshoe-bend':           'Horseshoe Bend (Arizona)',
  'the-wave':                 'The Wave, Arizona',
  'havasu-falls':             'Havasupai Falls',
  'blue-ridge-parkway':       'Blue Ridge Parkway',
  'going-to-the-sun-road':    'Going-to-the-Sun Road',
  'pacific-coast-highway':    'California State Route 1',
  'appalachian-trail':        'Appalachian Trail',
  'cape-hatteras':            'Cape Hatteras National Seashore',
  'assateague-island':        'Assateague Island National Seashore',
  'indiana-dunes':            'Indiana Dunes National Park',
  'congaree':                 'Congaree National Park',
  'pictured-rocks':           'Pictured Rocks National Lakeshore',
  'great-sand-dunes':         'Great Sand Dunes National Park and Preserve',
  'apostle-islands':          'Apostle Islands National Lakeshore',
  'theodore-roosevelt':       'Theodore Roosevelt National Park',
  'kenai-fjords':             'Kenai Fjords National Park',
  'wrangell-st-elias':        'Wrangell–St. Elias National Park and Preserve',
  'mesa-verde-cliff-dwellings':'Mesa Verde National Park',
  'biscayne':                 'Biscayne National Park',
  'cuyahoga-valley':          'Cuyahoga Valley National Park',
  'guadalupe-mountains':      'Guadalupe Mountains National Park',
  'kobuk-valley':             'Kobuk Valley National Park',
  'saguaro':                  'Saguaro National Park',
  'channel-islands':          'Channel Islands National Park',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const reqOptions = {
      headers: {
        'User-Agent': 'TouristAttractionsSite/1.0 (educational project; contact@example.com)',
        'Accept': 'application/json',
        ...options.headers
      }
    };
    const req = https.get(url, reqOptions, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location, options).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function getWikiImageUrl(title) {
  const encoded = encodeURIComponent(title);
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
  try {
    const res = await fetchUrl(url);
    if (res.status !== 200) {
      console.log(`  Wikipedia API ${res.status} for: ${title}`);
      return null;
    }
    const data = JSON.parse(res.body.toString());
    if (data.originalimage && data.originalimage.source) {
      return data.originalimage.source;
    }
    if (data.thumbnail && data.thumbnail.source) {
      // Upgrade thumbnail to larger size
      return data.thumbnail.source.replace(/\/\d+px-/, '/800px-');
    }
    console.log(`  No image in Wikipedia response for: ${title}`);
    return null;
  } catch (e) {
    console.log(`  Error fetching Wikipedia for ${title}: ${e.message}`);
    return null;
  }
}

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const doDownload = (imgUrl) => {
      const options = {
        headers: {
          'User-Agent': 'TouristAttractionsSite/1.0',
          'Referer': 'https://en.wikipedia.org/'
        }
      };
      https.get(imgUrl, options, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return doDownload(res.headers.location);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} from image URL`));
          res.resume();
          return;
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const size = fs.statSync(destPath).size;
          resolve(size);
        });
        file.on('error', (e) => { fs.unlink(destPath, () => {}); reject(e); });
        res.on('error', (e) => { fs.unlink(destPath, () => {}); reject(e); });
      }).on('error', reject)
        .setTimeout(60000, function() { this.destroy(); reject(new Error('download timeout')); });
    };
    doDownload(url);
  });
}

async function main() {
  const slugs = Object.keys(WIKI_TITLES);
  console.log(`Processing ${slugs.length} attractions...\n`);

  let success = 0, skipped = 0, failed = 0;
  const results = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const wikiTitle = WIKI_TITLES[slug];
    const destPath = path.join(IMAGES_DIR, `${slug}.jpg`);

    process.stdout.write(`[${i+1}/${slugs.length}] ${slug}: `);

    // Check existing file size - skip if >150KB (likely a real photo)
    if (fs.existsSync(destPath)) {
      const size = fs.statSync(destPath).size;
      if (size > 150000) {
        console.log(`SKIP (${Math.round(size/1024)}KB — already good)`);
        skipped++;
        results.push({ slug, status: 'skipped', size });
        await sleep(200);
        continue;
      }
    }

    // Get image URL from Wikipedia
    const imgUrl = await getWikiImageUrl(wikiTitle);
    if (!imgUrl) {
      console.log(`FAIL (no Wikipedia image)`);
      failed++;
      results.push({ slug, status: 'no_image' });
      await sleep(DELAY_MS);
      continue;
    }

    // Download the image
    try {
      const size = await downloadImage(imgUrl, destPath);
      console.log(`OK (${Math.round(size/1024)}KB)`);
      success++;
      results.push({ slug, status: 'downloaded', size, url: imgUrl });
    } catch (e) {
      console.log(`FAIL download: ${e.message}`);
      failed++;
      results.push({ slug, status: 'dl_error', error: e.message });
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Downloaded: ${success}`);
  console.log(`Skipped (already good): ${skipped}`);
  console.log(`Failed: ${failed}`);

  // Write results to a log file
  fs.writeFileSync(
    path.join(__dirname, 'image_download_results.json'),
    JSON.stringify(results, null, 2)
  );
  console.log(`\nResults saved to image_download_results.json`);
}

main().catch(console.error);
