const fs = require('fs');
const code = fs.readFileSync('/home/ubuntu/claude/tourist_plan/more_road_trips.js', 'utf8');
const wrapped = code.replace(/^const MORE_ROAD_TRIPS/, 'var MORE_ROAD_TRIPS');
try {
  eval(wrapped);
  console.log('Count:', MORE_ROAD_TRIPS.length);
  const required = ['id','name','icon','desc','parks','distance','days','season','region','tripType','avgCost'];
  const issues = MORE_ROAD_TRIPS.filter(r => required.some(k => !r[k])).map(r => r.id);
  console.log('Missing fields:', issues.length ? issues.join(', ') : 'none');
  const ids = MORE_ROAD_TRIPS.map(r => r.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  console.log('Duplicate IDs:', dupes.length ? dupes.join(', ') : 'none');
  const validRegions = ['Southwest','Pacific West','Rocky Mountains','Southeast','Northeast','Great Plains','Alaska','Hawaii','Multi-Region'];
  const validTripTypes = ['np-loop','scenic-drive','weekender','themed','coastal','island'];
  const validCosts = ['$','$$','$$$'];
  const badRegions = MORE_ROAD_TRIPS.filter(r => !validRegions.includes(r.region)).map(r => r.id + ':' + r.region);
  const badTypes = MORE_ROAD_TRIPS.filter(r => !validTripTypes.includes(r.tripType)).map(r => r.id + ':' + r.tripType);
  const badCosts = MORE_ROAD_TRIPS.filter(r => !validCosts.includes(r.avgCost)).map(r => r.id + ':' + r.avgCost);
  console.log('Bad regions:', badRegions.length ? badRegions.join(', ') : 'none');
  console.log('Bad tripTypes:', badTypes.length ? badTypes.join(', ') : 'none');
  console.log('Bad avgCost:', badCosts.length ? badCosts.join(', ') : 'none');
  console.log('All IDs:', ids.join(', '));
} catch(e) {
  console.error('Parse error:', e.message);
}
