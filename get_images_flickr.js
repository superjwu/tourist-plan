#!/usr/bin/env node
/**
 * Download relevant images using Flickr public RSS feed.
 * No API key needed. Flickr CDN (live.staticflickr.com) has no meaningful rate limit.
 * URL: https://api.flickr.com/services/feeds/photos_public.gne?tags=TAG&format=json&nojsoncallback=1
 * Images: items[0].media.m replace _m.jpg → _b.jpg = 1024px JPEG
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const IMAGES_DIR  = path.join(__dirname, 'shared', 'images');
const CONCURRENCY = 12;
const MIN_SIZE    = 150000; // skip if already > 150KB

// slug → Flickr tags (comma-separated, tagmode=any)
const TAGS = {
  // National Parks
  acadia:                      'acadianationalpark,acadianp,maine',
  'great-smoky':               'greatsmokymountains,smokymountains',
  'bryce-canyon':              'brycecanyonnationalpark,brycecanyonhoodoos',
  everglades:                  'evergladesnationalpark,evergladesfl',
  'mount-rainier':             'mountrainier,mountrainiernationalpark',
  shenandoah:                  'shenandoahnationalpark,skylinedrive',
  sequoia:                     'sequoianationalpark,giantsequoia',
  denali:                      'denalinationalpark,denalinp,denali',
  'canyonlands-ut':            'canyonlandsnationalpark,islandinthesky',
  'capitol-reef-ut':           'capitolreefnationalpark,capitolreef',
  'mesa-verde-cliff':          'mesaverdenationalpark,cliffpalace',
  'guadalupe-mountains-tx':    'guadalupemountains,guadalupepeak',
  'pinnacles-ca':              'pinnaclesnationalpark,pinnacles',
  'channel-islands-ca':        'channelislandsnationalpark,channelislands',
  'lassen-volcanic-ca':        'lassenvolcanic,lassenvolcanicnationalpark',
  'north-cascades-wa':         'northcascades,northcascadesnationalpark',
  'kenai-fjords-ak':           'kenaifiords,kenaifiordsnationalpark',
  'gates-of-the-arctic-ak':    'gatesofthearctic,arcticnationalpark',
  'new-river-gorge-wv':        'newrivergorge,newrivergorgewv',
  'isle-royale-mi':            'isleroyale,isleroyalenationalpark',
  'theodore-roosevelt-nd':     'theodorerooseveltnationalpark,northdakotabadlands',
  'wind-cave-sd':              'windcave,windcavenationalpark',
  'hot-springs-np-ar':         'hotspringsnationalpark,bathhouserow',
  'mount-rushmore-sd':         'mountrushmore,mountrushmorememorial',
  'independence-hall-pa':      'independencehall,philadelphia',
  'liberty-bell-center-pa':    'libertybell,libertybelllcenter',
  'gettysburg-nmp-pa':         'gettysburg,gettysburgbattlefield',
  'chaco-culture-nhp-nm':      'chacocanyon,chacoculture',
  'muir-woods-nm-ca':          'muirwoods,muirwoodsredwood',
  'golden-gate-nra-ca':        'goldengate,goldengatebridge',
  'alcatraz-island-ca':        'alcatraz,alcatrazisland',
  'rainbow-bridge-nm-ut':      'rainbowbridge,rainbowbridgeutah',
  'natural-bridges-nm-ut':     'naturalbridges,naturalbridgesutah',
  'craters-of-the-moon-nm-id': 'cratersofthemoon,lavaidaho',
  'lava-beds-nm-ca':           'lavabeds,lavatunnel',
  'dinosaur-nm-co':            'dinosaurnationalmonument,dinosaurfossils',
  'oregon-caves-nm-or':        'oregoncaves,oregoncavesmonument',
  'sunset-crater-volcano-nm-az':'sunsetcrater,sunsetcratervolcano',
  'wupatki-nm-az':             'wupatki,wuptakinationalmonument',
  'mesa-verde-cliff-palace-co':'cliffpalace,mesaverde',
  'blue-ridge-parkway':        'blueridgeparkway,blueridgemountains',
  'going-to-the-sun-road':     'goingtothesunroad,glaciernationalpark',
  'cape-hatteras':             'capehatteras,capehattetraslighthouse',
  'indiana-dunes':             'indianadunes,indianadunesnp',
  'pictured-rocks':            'picturedrocks,picturedrocksmi',
  'great-sand-dunes':          'greatsanddunes,greatsanddunesnp',
  'theodore-roosevelt':        'theodorerooseveltnationalpark,northdakota',
  'kenai-fjords':              'kenaifiords,kenaifiordsnp',
  'mesa-verde-cliff-dwellings':'mesaverdenationalpark,anasazi',
  'guadalupe-mountains':       'guadalupemountains,guadalupemountainsnp',
  'kobuk-valley':              'kobukvalley,kobukvalleynationalpark',
  saguaro:                     'saguaronationalpark,saguarocactus',
  'channel-islands':           'channelislandsnationalpark,channelislandsca',
  yosemite:                    'yosemitenationalpark,halfdome',
  // Non-park landmarks
  'monument-valley-navajo-az': 'monumentvalley,monumentvalleyarizona',
  'horseshoe-bend':            'horseshoebend,horseshoebendarizona',
  'na-pali-coast':             'napalicost,napalihawaii',
  'havasu-falls':              'havasufalls,havasupai',
  'timpanogos-cave-nm-ut':     'timpanogoscave,timpanogosutah',
  'pacific-coast-highway':     'pacificcoasthighway,highway1california',
  'appalachian-trail':         'appalachiantrail,appalachianmountains',
  'assateague-island':         'assateagueisland,assateaguehorses',
  'apostle-islands':           'apostleislands,apostleislandswisconsin',
  'wrangell-st-elias':         'wrangellstelias,wrangellsteliasnp',
  'the-wave':                  'thewavearizona,vermilioncliffs',
};

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    }, (res) => {
      if ([301,302,303,307].includes(res.statusCode)) {
        res.resume();
        return fetchJson(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch(e) { reject(e); }
      });
      res.on('error', reject);
    }).on('error', reject)
      .setTimeout(20000, function() { this.destroy(); reject(new Error('timeout')); });
  });
}

function downloadUrl(url, destPath) {
  return new Promise((resolve, reject) => {
    const attempt = (u, hops) => {
      if (hops > 8) return reject(new Error('too many redirects'));
      const mod = u.startsWith('https') ? https : require('http');
      mod.get(u, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Referer': 'https://www.flickr.com/',
        }
      }, (res) => {
        if ([301,302,303,307,308].includes(res.statusCode)) {
          res.resume();
          const next = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, u).href;
          return attempt(next, hops + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(fs.statSync(destPath).size); });
        file.on('error', e => { fs.unlink(destPath, () => {}); reject(e); });
        res.on('error', e => { fs.unlink(destPath, () => {}); reject(e); });
      }).on('error', reject)
        .setTimeout(60000, function() { this.destroy(); reject(new Error('dl timeout')); });
    };
    attempt(url, 0);
  });
}

async function getFlickrImageUrl(tags) {
  const encoded = encodeURIComponent(tags);
  const url = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${encoded}&tagmode=any&format=json&nojsoncallback=1`;
  const data = await fetchJson(url);
  if (!data.items || data.items.length === 0) throw new Error('no photos for tags: ' + tags);
  // Take best item — skip ones with generic/irrelevant titles
  for (const item of data.items) {
    const bigUrl = item.media.m.replace('_m.jpg', '_b.jpg');
    return bigUrl;
  }
  throw new Error('no usable photo');
}

async function processOne(slug, tags, i, total) {
  const destPath = path.join(IMAGES_DIR, `${slug}.jpg`);

  if (fs.existsSync(destPath) && fs.statSync(destPath).size > MIN_SIZE) {
    console.log(`[${i}/${total}] SKIP  ${slug}`);
    return 'skipped';
  }

  try {
    const imgUrl = await getFlickrImageUrl(tags);
    const size   = await downloadUrl(imgUrl, destPath);
    console.log(`[${i}/${total}] ✓     ${slug} (${Math.round(size/1024)}KB)`);
    return 'ok';
  } catch (e) {
    console.log(`[${i}/${total}] ✗     ${slug}: ${e.message}`);
    return 'fail';
  }
}

async function main() {
  const entries = Object.entries(TAGS);
  const todo = entries.filter(([slug]) => {
    const p = path.join(IMAGES_DIR, `${slug}.jpg`);
    return !fs.existsSync(p) || fs.statSync(p).size <= MIN_SIZE;
  });

  console.log(`Downloading ${todo.length} images via Flickr (${CONCURRENCY} parallel)...\n`);

  const counts = { ok: 0, skipped: 0, fail: 0, failList: [] };
  let idx = 0;

  async function worker() {
    while (idx < todo.length) {
      const i = idx++;
      const [slug, tags] = todo[i];
      const r = await processOne(slug, tags, i + 1, todo.length);
      counts[r]++;
      if (r === 'fail') counts.failList.push(slug);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`\n=== DONE ===`);
  console.log(`✓  Downloaded : ${counts.ok}`);
  console.log(`   Skipped    : ${counts.skipped}`);
  console.log(`✗  Failed     : ${counts.fail}`);
  if (counts.failList.length) console.log('   Failed:', counts.failList.join(', '));
}

main().catch(console.error);
