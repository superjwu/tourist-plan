const MORE_ROAD_TRIPS = [

  // ── STATE NP LOOPS (IDs 22–41) ──────────────────────────────────────────────

  // 22
  {id:'arizona-grand-circle',name:'Arizona Grand Circle',icon:'🏜',desc:"Loop Arizona's greatest hits — the Grand Canyon's south rim, Saguaro's saguaro forests, petrified logs 225 million years old, and Sunset Crater's volcanic cinder cones.",parks:['grand-canyon','saguaro','petrified-forest-az','antelope-canyon','horseshoe-bend'],distance:'900 mi',days:'7–9 days',season:'Spring / Fall',region:'Southwest',tripType:'np-loop',avgCost:'$$'},

  // 23
  {id:'montana-wilderness',name:'Montana Wilderness Loop',icon:'🐻',desc:"Glacier's ice-carved peaks, the legendary Going-to-the-Sun Road, and the hallowed ground of Little Bighorn combine into Montana's greatest road trip.",parks:['glacier','going-to-the-sun-road'],distance:'650 mi',days:'6–8 days',season:'Jul–Sep',region:'Rocky Mountains',tripType:'np-loop',avgCost:'$$'},

  // 24
  {id:'oregon-trail-parks',name:'Oregon Parks Trail',icon:'🌲',desc:"Follow Oregon's geological story from Crater Lake's impossibly blue caldera to the Painted Hills' rainbow badlands, John Day's fossil beds, and the Columbia River Gorge's cascading waterfalls.",parks:['crater-lake','columbia-river-gorge'],distance:'700 mi',days:'6–8 days',season:'Jun–Sep',region:'Pacific West',tripType:'np-loop',avgCost:'$$'},

  // 25
  {id:'washington-cascade-loop',name:'Washington Cascade Parks',icon:'🌋',desc:"Three volcanic icons and three national parks — North Cascades' rugged wilderness, Rainier's wildflower meadows, and the dramatic blast zone of Mount St. Helens.",parks:['north-cascades-wa','mount-rainier'],distance:'550 mi',days:'6–8 days',season:'Jul–Sep',region:'Pacific West',tripType:'np-loop',avgCost:'$$'},

  // 26
  {id:'southern-california-coast',name:'Southern California Coast Parks',icon:'🌊',desc:"Channel Islands' undisturbed wildlife, Joshua Tree's alien boulder fields, and Death Valley's record-breaking extremes — three faces of SoCal's wild side.",parks:['channel-islands-ca','joshua-tree','death-valley'],distance:'800 mi',days:'7–10 days',season:'Oct–Apr',region:'Pacific West',tripType:'np-loop',avgCost:'$$'},

  // 27
  {id:'northern-california-parks',name:'Northern California Parks',icon:'🌲',desc:"The world's tallest trees in Redwood, volcanic drama at Lassen, Yosemite's granite giants, and Pinnacles' condor skies — California's northern parks have it all.",parks:['redwood-np-ca','lassen-volcanic-ca','yosemite','pinnacles-ca'],distance:'1,000 mi',days:'8–12 days',season:'Jun–Sep',region:'Pacific West',tripType:'np-loop',avgCost:'$$'},

  // 28
  {id:'south-dakota-black-hills',name:'South Dakota Black Hills',icon:'🗿',desc:"Mount Rushmore's carved presidents, Crazy Horse's ongoing monument, Badlands' alien spires, and the underground worlds of Wind Cave and Jewel Cave — South Dakota's legendary corridor.",parks:['mount-rushmore-sd','crazy-horse-memorial-sd','badlands'],distance:'500 mi',days:'5–7 days',season:'May–Sep',region:'Great Plains',tripType:'np-loop',avgCost:'$'},

  // 29
  {id:'florida-parks-loop',name:'Florida Parks Loop',icon:'🐊',desc:"Paddle through Everglades' mangrove tunnels, snorkel over Biscayne's coral reefs, and take a seaplane to Dry Tortugas' remote fort — Florida's wild south is unlike anywhere else.",parks:['everglades','biscayne-np-fl','dry-tortugas-fl'],distance:'300 mi',days:'5–7 days',season:'Nov–Apr',region:'Southeast',tripType:'np-loop',avgCost:'$$'},

  // 30
  {id:'virginia-heritage',name:'Virginia Heritage Trail',icon:'🍂',desc:"Shenandoah's misty Appalachian ridges, the iconic Blue Ridge Parkway, and stretches of the Appalachian Trail form the backbone of Virginia's most scenic road trip.",parks:['shenandoah','blue-ridge-parkway','appalachian-trail'],distance:'400 mi',days:'4–6 days',season:'Fall',region:'Southeast',tripType:'np-loop',avgCost:'$'},

  // 31
  {id:'colorado-front-range',name:'Colorado Front Range Parks',icon:'⛰',desc:"Rocky Mountain's tundra wildflowers, Garden of the Gods' red rock fins, and Great Sand Dunes' impossible desert dunes — the Front Range packs remarkable diversity into one scenic drive.",parks:['rocky-mountain','great-sand-dunes'],distance:'500 mi',days:'5–7 days',season:'Jun–Sep',region:'Rocky Mountains',tripType:'np-loop',avgCost:'$$'},

  // 32
  {id:'michigan-great-lakes',name:'Michigan Great Lakes Loop',icon:'🏖',desc:"Pictured Rocks' sandstone cliffs soaring above Lake Superior, Sleeping Bear Dunes' towering sand mountains, and Indiana Dunes' sweeping lakeshore make the Great Lakes feel like an inland ocean.",parks:['pictured-rocks-mi','sleeping-bear-dunes','indiana-dunes'],distance:'700 mi',days:'6–8 days',season:'Jun–Sep',region:'Great Plains',tripType:'np-loop',avgCost:'$'},

  // 33
  {id:'minnesota-boundary-waters',name:'Minnesota North Woods',icon:'🦅',desc:"Paddle the pristine lakes of Boundary Waters Canoe Area, explore Voyageurs' water-based national park, and visit the spectacular falls of Pictured Rocks just across the Michigan border.",parks:['apostle-islands','pictured-rocks-mi'],distance:'600 mi',days:'6–8 days',season:'Jun–Sep',region:'Great Plains',tripType:'np-loop',avgCost:'$'},

  // 34
  {id:'new-mexico-parks',name:'New Mexico Ancient Lands',icon:'🌵',desc:"White Sands' glistening gypsum dunes, Carlsbad Caverns' bat-filled chambers, and the Rio Grande's Big Bend badlands neighboring El Morro's ancient inscriptions.",parks:['white-sands-nm','carlsbad-caverns-nm'],distance:'600 mi',days:'5–7 days',season:'Mar–May / Sep–Nov',region:'Southwest',tripType:'np-loop',avgCost:'$'},

  // 35
  {id:'idaho-parks',name:'Idaho Wilderness Circuit',icon:'🏔',desc:"Craters of the Moon's volcanic moonscape, City of Rocks' granite towers, and the Snake River Birds of Prey area reveal Idaho's dramatic geological diversity.",parks:['crater-lake'],distance:'700 mi',days:'6–8 days',season:'Jun–Sep',region:'Rocky Mountains',tripType:'np-loop',avgCost:'$'},

  // 36
  {id:'tennessee-nc-parks',name:'Tennessee & NC Mountains',icon:'🌿',desc:"Great Smoky Mountains' biodiverse hollows, the Cherokee heritage sites, and the southern Blue Ridge Parkway's stunning viaducts make this the most visited national park corridor in America.",parks:['great-smoky','blue-ridge-parkway','appalachian-trail'],distance:'350 mi',days:'5–7 days',season:'May–Jun / Oct',region:'Southeast',tripType:'np-loop',avgCost:'$'},

  // 37
  {id:'maine-coast-parks',name:'Maine Coast & Acadia',icon:'⚓',desc:"Acadia's rocky headlands and pink granite summits anchor a Maine coast road trip through fishing villages, lighthouses, and the Down East wilderness.",parks:['acadia'],distance:'400 mi',days:'4–6 days',season:'Jun–Oct',region:'Northeast',tripType:'np-loop',avgCost:'$$'},

  // 38
  {id:'nevada-parks',name:'Nevada Desert Parks',icon:'🌙',desc:"Great Basin's ancient bristlecone pines and Lehman Caves, the Valley of Fire's Aztec sandstone, and Nevada's dark-sky corridor create one of the West's most underrated road trips.",parks:['death-valley','white-sands-nm'],distance:'600 mi',days:'5–7 days',season:'Apr–May / Sep–Oct',region:'Southwest',tripType:'np-loop',avgCost:'$'},

  // 39
  {id:'wyoming-parks',name:'Wyoming Parks Grand Tour',icon:'🦌',desc:"Yellowstone's geothermal spectacle, Grand Teton's jagged skyline, and the Wind River Range's wilderness all lie within one Wyoming road trip that defines the American West.",parks:['yellowstone','grand-teton'],distance:'500 mi',days:'7–10 days',season:'Jun–Sep',region:'Rocky Mountains',tripType:'np-loop',avgCost:'$$'},

  // 40
  {id:'kentucky-wv-parks',name:'Appalachian Caves & Gorges',icon:'🦋',desc:"Mammoth Cave's underground labyrinths — the world's longest cave system — and West Virginia's New River Gorge, America's newest national park, showcase Appalachia's hidden depths.",parks:['mammoth-cave'],distance:'450 mi',days:'4–6 days',season:'Spring / Fall',region:'Southeast',tripType:'np-loop',avgCost:'$'},

  // 41
  {id:'georgia-parks',name:'Georgia Coast & Mountains',icon:'🌳',desc:"Cumberland Island's wild horses and unspoiled beaches, Congaree's primeval bottomland forest, and the Blue Ridge Mountains' Tallulah Gorge complete Georgia's diverse natural corridor.",parks:['congaree-np-sc'],distance:'500 mi',days:'5–7 days',season:'Mar–May / Oct',region:'Southeast',tripType:'np-loop',avgCost:'$'},

  // ── SCENIC BYWAYS (IDs 42–61) ────────────────────────────────────────────────

  // 42
  {id:'hana-highway',name:'Road to Hana',icon:'🌺',desc:"Maui's legendary 64-mile coastal road winds past 59 bridges, 600 pools, lush bamboo forests, and black-sand beaches to reach the remote village of Hana.",parks:['haleakala'],distance:'64 mi',days:'1–2 days',season:'Year-round',region:'Hawaii',tripType:'scenic-drive',avgCost:'$$'},

  // 43
  {id:'million-dollar-highway',name:'Million Dollar Highway',icon:'⛰',desc:"Colorado's most dramatic stretch of US-550 climbs through the San Juan Mountains with no guardrails, 11,000-foot passes, and mining ghost towns at every turn.",parks:['great-sand-dunes'],distance:'75 mi',days:'1–2 days',season:'Jun–Sep',region:'Rocky Mountains',tripType:'scenic-drive',avgCost:'$'},

  // 44
  {id:'natchez-trace',name:'Natchez Trace Parkway',icon:'🌿',desc:"This 444-mile parkway follows an ancient trail through Tennessee, Alabama, and Mississippi past Civil War sites, mound-builder ruins, and southern hardwood forests.",parks:['appalachian-trail'],distance:'444 mi',days:'3–5 days',season:'Spring / Fall',region:'Southeast',tripType:'scenic-drive',avgCost:'$'},

  // 45
  {id:'kancamagus-highway',name:'Kancamagus Highway',icon:'🍁',desc:"New Hampshire's most scenic road cuts 34 miles through White Mountain National Forest, offering waterfalls, covered bridges, and some of New England's best fall foliage.",parks:['acadia'],distance:'34 mi',days:'1–2 days',season:'Sep–Oct',region:'Northeast',tripType:'scenic-drive',avgCost:'$'},

  // 46
  {id:'trail-ridge-road',name:'Trail Ridge Road',icon:'🦌',desc:"The highest continuous paved road in the US crosses Rocky Mountain National Park at 12,183 feet, threading through alpine tundra above the treeline with panoramic views into Wyoming.",parks:['rocky-mountain'],distance:'48 mi',days:'1–2 days',season:'Jun–Oct',region:'Rocky Mountains',tripType:'scenic-drive',avgCost:'$'},

  // 47
  {id:'overseas-highway',name:'Overseas Highway',icon:'🌴',desc:"Drive on the ocean — 113 miles of connected bridges and keys stretch from Miami to Key West over the turquoise waters of Florida Bay.",parks:['everglades','biscayne-np-fl'],distance:'113 mi',days:'2–4 days',season:'Nov–Apr',region:'Southeast',tripType:'scenic-drive',avgCost:'$$'},

  // 48
  {id:'tail-of-dragon',name:'Tail of the Dragon',icon:'🐉',desc:"318 curves in 11 miles — US-129 at Deals Gap is legendary among motorcyclists and sports car drivers, threading through the forest on the Tennessee-North Carolina border.",parks:['great-smoky'],distance:'11 mi',days:'1 day',season:'Apr–Oct',region:'Southeast',tripType:'scenic-drive',avgCost:'$'},

  // 49
  {id:'san-juan-skyway',name:'San Juan Skyway',icon:'🏔',desc:"This 236-mile loop through southwestern Colorado visits four mountain passes over 10,000 feet, former silver-mining towns like Telluride and Ouray, and the dramatic Uncompahgre Gorge.",parks:['great-sand-dunes','mesa-verde-cliff'],distance:'236 mi',days:'2–4 days',season:'Jun–Sep',region:'Rocky Mountains',tripType:'scenic-drive',avgCost:'$$'},

  // 50
  {id:'cherohala-skyway',name:'Cherohala Skyway',icon:'🌲',desc:"This Tennessee-North Carolina ridge road rises above 5,400 feet through the Cherokee and Nantahala national forests — a wilder, less-traveled alternative to the Tail of the Dragon.",parks:['great-smoky'],distance:'43 mi',days:'1 day',season:'Apr–Oct',region:'Southeast',tripType:'scenic-drive',avgCost:'$'},

  // 51
  {id:'seward-highway',name:'Seward Highway',icon:'🦅',desc:"Alaska's most scenic road links Anchorage to Seward, hugging Turnagain Arm's dramatic tidal bore cliffs before descending into the fjord-carved wilderness of the Kenai Peninsula.",parks:['kenai-fjords-ak'],distance:'127 mi',days:'2–3 days',season:'May–Sep',region:'Alaska',tripType:'scenic-drive',avgCost:'$$$'},

  // 52
  {id:'going-to-sun-scenic',name:'Going-to-the-Sun Road',icon:'🛣',desc:"Glacier National Park's 50-mile alpine highway is open just a few months a year — and every minute is worth it, crossing the Continental Divide at Logan Pass.",parks:['glacier','going-to-the-sun-road'],distance:'50 mi',days:'1–2 days',season:'Jul–Oct',region:'Rocky Mountains',tripType:'scenic-drive',avgCost:'$$'},

  // 53
  {id:'beartooth-highway',name:'Beartooth Highway',icon:'🦅',desc:"Ernest Hemingway called it the most beautiful drive in America — US-212 climbs to 10,947 feet past glacial lakes and snowfields before descending into Yellowstone.",parks:['yellowstone'],distance:'69 mi',days:'1–2 days',season:'Jun–Sep',region:'Rocky Mountains',tripType:'scenic-drive',avgCost:'$$'},

  // 54
  {id:'columbia-river-gorge-drive',name:'Columbia River Gorge Scenic Drive',icon:'💧',desc:"The Historic Columbia River Highway winds above the gorge past 11 major waterfalls including 620-foot Multnomah Falls, with Crown Point's panoramic vista as the centerpiece.",parks:['columbia-river-gorge'],distance:'70 mi',days:'1–2 days',season:'Year-round',region:'Pacific West',tripType:'scenic-drive',avgCost:'$'},

  // 55
  {id:'big-sur-drive',name:'Big Sur Coast Drive',icon:'🌊',desc:"Highway 1's 90-mile Big Sur stretch is the most dramatic coastal road in North America — Bixby Bridge, McWay Falls, and the 80-mile roadless wilderness are the rewards.",parks:['pacific-coast-highway','channel-islands-ca'],distance:'90 mi',days:'1–2 days',season:'Sep–Nov',region:'Pacific West',tripType:'scenic-drive',avgCost:'$$'},

  // 56
  {id:'vermilion-cliffs',name:'Vermilion Cliffs Scenic Drive',icon:'🏜',desc:"The Utah-Arizona border's Highway 89A passes beneath sheer 3,000-foot vermilion cliffs, near The Wave and Coyote Buttes permit areas, and along the Paria River canyon corridor.",parks:['grand-canyon','antelope-canyon'],distance:'120 mi',days:'2–3 days',season:'Mar–May / Sep–Nov',region:'Southwest',tripType:'scenic-drive',avgCost:'$'},

  // 57
  {id:'acadia-park-loop',name:'Acadia Park Loop Road',icon:'⚓',desc:"Acadia's 27-mile Park Loop Road circuits the island's highlights — Thunder Hole's crashing surf, Sand Beach, Cadillac Mountain summit, and Otter Cliffs' sea spray.",parks:['acadia'],distance:'27 mi',days:'1–2 days',season:'May–Oct',region:'Northeast',tripType:'scenic-drive',avgCost:'$$'},

  // 58
  {id:'north-shore-mn',name:'Minnesota North Shore Drive',icon:'🌊',desc:"Highway 61 hugs Lake Superior's dramatic north shore for 150 miles from Duluth to the Canadian border, past Gooseberry Falls, Split Rock Lighthouse, and Porcupine Mountains.",parks:['apostle-islands'],distance:'150 mi',days:'2–3 days',season:'Jun–Oct',region:'Great Plains',tripType:'scenic-drive',avgCost:'$'},

  // 59
  {id:'monument-valley-scenic',name:'Monument Valley Scenic Drive',icon:'🏜',desc:"The 17-mile valley floor drive through Monument Valley Navajo Tribal Park passes the iconic Mittens and Merrick Butte formations made famous by countless films.",parks:['monument-valley-navajo-az','antelope-canyon'],distance:'17 mi',days:'1–2 days',season:'Mar–May / Sep–Nov',region:'Southwest',tripType:'scenic-drive',avgCost:'$'},

  // 60
  {id:'hurricane-ridge-road',name:'Hurricane Ridge Road',icon:'🌲',desc:"Olympic National Park's Hurricane Ridge Road climbs 5,242 feet to sub-alpine meadows where black-tailed deer graze within feet of your car and the Olympic Mountains tower all around.",parks:['olympic'],distance:'17 mi',days:'1 day',season:'Jun–Sep',region:'Pacific West',tripType:'scenic-drive',avgCost:'$'},

  // 61
  {id:'zion-canyon-scenic',name:'Zion Canyon Scenic Drive',icon:'🏜',desc:"Zion National Park's 6-mile shuttle-only canyon road threads between 2,000-foot red sandstone walls past the Court of the Patriarchs, Weeping Rock, and the Temple of Sinawava.",parks:['zion','grand-canyon'],distance:'6 mi',days:'1–2 days',season:'Mar–Nov',region:'Southwest',tripType:'scenic-drive',avgCost:'$'},

  // ── CITY-TO-NATURE WEEKENDERS (IDs 62–81) ───────────────────────────────────

  // 62
  {id:'nyc-to-acadia',name:'NYC to Acadia Weekend',icon:'🚗',desc:"Drive north from New York City through coastal Maine to Acadia's tide pools and Cadillac Mountain summit — America's quintessential northeastern weekend escape.",parks:['acadia'],distance:'340 mi',days:'2–3 days',season:'Jun–Oct',region:'Northeast',tripType:'weekender',avgCost:'$$'},

  // 63
  {id:'la-to-joshua-tree',name:'LA to Joshua Tree Weekend',icon:'🌵',desc:"Two hours from Los Angeles, Joshua Tree's otherworldly boulder fields and alien-silhouette trees make this the perfect Friday-night desert escape from the city.",parks:['joshua-tree'],distance:'140 mi',days:'2–3 days',season:'Oct–Apr',region:'Pacific West',tripType:'weekender',avgCost:'$'},

  // 64
  {id:'chicago-to-starved-rock',name:'Chicago to Starved Rock',icon:'🌊',desc:"Just 90 miles southwest of Chicago, Starved Rock State Park's 18 canyons and thundering waterfalls offer a complete wilderness immersion from downtown in under two hours.",parks:['starved-rock','indiana-dunes'],distance:'90 mi',days:'1–2 days',season:'Spring / Fall',region:'Great Plains',tripType:'weekender',avgCost:'$'},

  // 65
  {id:'denver-to-rmnp',name:'Denver to Rocky Mountain NP',icon:'⛰',desc:"An hour and a half north of Denver, Rocky Mountain National Park offers elk rut spectacle, elk meadows above 12,000 feet, and alpine lakes before a same-day return.",parks:['rocky-mountain'],distance:'70 mi',days:'2–3 days',season:'Jun–Sep',region:'Rocky Mountains',tripType:'weekender',avgCost:'$'},

  // 66
  {id:'seattle-to-olympic',name:'Seattle to Olympic Peninsula',icon:'🌲',desc:"A short ferry ride from Seattle leads to Olympic's triple-crown of rainforest, alpine meadow, and wild Pacific coast — all reachable in a 3-day weekend loop.",parks:['olympic'],distance:'200 mi',days:'2–3 days',season:'Jul–Sep',region:'Pacific West',tripType:'weekender',avgCost:'$$'},

  // 67
  {id:'sf-to-yosemite',name:'San Francisco to Yosemite',icon:'🏔',desc:"Three hours from San Francisco, Yosemite Valley's waterfalls, Half Dome, and cathedral walls deliver one of the world's greatest short road trips.",parks:['yosemite'],distance:'195 mi',days:'2–3 days',season:'May / Sep–Oct',region:'Pacific West',tripType:'weekender',avgCost:'$$'},

  // 68
  {id:'portland-to-crater-lake',name:'Portland to Crater Lake',icon:'🌊',desc:"Head south from Portland through the Cascades' volcanic corridor to Crater Lake — the deepest and most impossibly blue lake in the US — and back in a long weekend.",parks:['crater-lake'],distance:'280 mi',days:'2–3 days',season:'Jul–Sep',region:'Pacific West',tripType:'weekender',avgCost:'$'},

  // 69
  {id:'miami-to-everglades',name:'Miami to Everglades',icon:'🐊',desc:"An hour from South Beach, Everglades National Park's sawgrass prairies, alligator-filled waterways, and roseate spoonbills feel like another planet.",parks:['everglades'],distance:'40 mi',days:'1–2 days',season:'Nov–Apr',region:'Southeast',tripType:'weekender',avgCost:'$'},

  // 70
  {id:'dc-to-shenandoah',name:'DC to Shenandoah',icon:'🍂',desc:"Ninety minutes from Washington DC, Shenandoah's Skyline Drive and Appalachian Trail overlooks offer a wildly accessible Appalachian escape through misty Blue Ridge ridges.",parks:['shenandoah','appalachian-trail'],distance:'90 mi',days:'2–3 days',season:'Fall',region:'Southeast',tripType:'weekender',avgCost:'$'},

  // 71
  {id:'boston-to-white-mountains',name:'Boston to White Mountains',icon:'🍁',desc:"Two hours north of Boston, New Hampshire's White Mountains offer the highest peak in the Northeast, the world's worst weather record, and the Kancamagus Highway's fall foliage show.",parks:['acadia'],distance:'150 mi',days:'2–3 days',season:'Jun–Oct',region:'Northeast',tripType:'weekender',avgCost:'$$'},

  // 72
  {id:'phoenix-to-sedona',name:'Phoenix to Sedona & Oak Creek',icon:'🔴',desc:"Two hours north of Phoenix, Sedona's red rock buttes and Oak Creek Canyon's swimming holes deliver stunning desert scenery perfect for a weekend retreat.",parks:['grand-canyon','saguaro'],distance:'120 mi',days:'2–3 days',season:'Mar–May / Sep–Nov',region:'Southwest',tripType:'weekender',avgCost:'$$'},

  // 73
  {id:'nashville-to-mammoth-cave',name:'Nashville to Mammoth Cave',icon:'🦇',desc:"A 90-minute drive from Nashville, Mammoth Cave's 400+ miles of mapped passages make it the world's longest known cave system — surprisingly wild for a quick weekend trip.",parks:['mammoth-cave'],distance:'90 mi',days:'1–2 days',season:'Year-round',region:'Southeast',tripType:'weekender',avgCost:'$'},

  // 74
  {id:'albuquerque-to-white-sands',name:'Albuquerque to White Sands',icon:'🌵',desc:"Three hours south of Albuquerque, White Sands' glistening gypsum dunes shift and ripple across the Tularosa Basin — the world's largest gypsum dunefield.",parks:['white-sands-nm','carlsbad-caverns-nm'],distance:'200 mi',days:'2–3 days',season:'Mar–May / Sep–Nov',region:'Southwest',tripType:'weekender',avgCost:'$'},

  // 75
  {id:'minneapolis-to-apostle-islands',name:'Minneapolis to Apostle Islands',icon:'🏝',desc:"Three hours from Minneapolis, the Apostle Islands' sea caves, sandstone cliffs, and Lake Superior waters make this Wisconsin archipelago a stunning Great Lakes escape.",parks:['apostle-islands'],distance:'180 mi',days:'2–3 days',season:'Jun–Sep',region:'Great Plains',tripType:'weekender',avgCost:'$'},

  // 76
  {id:'atlanta-to-congaree',name:'Atlanta to Congaree',icon:'🌳',desc:"Four hours from Atlanta, Congaree National Park protects the largest old-growth bottomland forest in the US — a firefly festival in May and canoe trails through cathedral tupelos.",parks:['congaree-np-sc'],distance:'300 mi',days:'2–3 days',season:'Mar–Jun / Oct',region:'Southeast',tripType:'weekender',avgCost:'$'},

  // 77
  {id:'las-vegas-to-zion',name:'Las Vegas to Zion Weekend',icon:'🏜',desc:"Two and a half hours from the Las Vegas Strip, Zion Canyon's towering sandstone walls and the narrow slot of The Narrows deliver a world-class weekend adventure.",parks:['zion','bryce-canyon'],distance:'165 mi',days:'2–3 days',season:'Mar–May / Sep–Nov',region:'Southwest',tripType:'weekender',avgCost:'$'},

  // 78
  {id:'salt-lake-to-arches',name:'Salt Lake City to Arches',icon:'🏜',desc:"Four hours south of Salt Lake City, Arches National Park's 2,000+ natural arches — including the iconic Delicate Arch — are an essential Utah weekend trip.",parks:['arches','canyonlands-ut'],distance:'230 mi',days:'2–3 days',season:'Apr–May / Sep–Oct',region:'Southwest',tripType:'weekender',avgCost:'$'},

  // 79
  {id:'dallas-to-palo-duro',name:'Dallas to Palo Duro Canyon',icon:'🤠',desc:"Just over an hour from Amarillo (5 from Dallas), Palo Duro Canyon — the 'Grand Canyon of Texas' — offers 120 miles of red-and-orange canyon walls in the Texas Panhandle.",parks:['palo-duro-canyon','big-bend-tx'],distance:'360 mi',days:'2–3 days',season:'Spring / Fall',region:'Southeast',tripType:'weekender',avgCost:'$'},

  // 80
  {id:'anchorage-to-denali',name:'Anchorage to Denali',icon:'🐻',desc:"The four-hour drive north from Anchorage to Denali National Park leads to North America's tallest peak, grizzly bears on open tundra, and moose in every river bend.",parks:['denali'],distance:'240 mi',days:'2–3 days',season:'Jun–Aug',region:'Alaska',tripType:'weekender',avgCost:'$$$'},

  // 81
  {id:'honolulu-to-haleakala',name:'Honolulu to Haleakala Sunrise',icon:'🌅',desc:"A short flight to Maui and a pre-dawn drive to Haleakala's 10,023-foot summit delivers one of the world's most celebrated sunrises above a sea of clouds.",parks:['haleakala'],distance:'40 mi',days:'1–2 days',season:'Year-round',region:'Hawaii',tripType:'weekender',avgCost:'$$'},

  // ── THEMED ROUTES (IDs 82–100) ───────────────────────────────────────────────

  // 82
  {id:'volcano-circuit',name:'Volcano Circuit',icon:'🌋',desc:"Chain the Cascades' volcanic giants — Crater Lake's caldera, Lassen's hydrothermal fumaroles, Mount St. Helens' blast zone, and Newberry's obsidian flows — on one multi-state volcanic pilgrimage.",parks:['crater-lake','lassen-volcanic-ca','mount-rainier'],distance:'1,200 mi',days:'8–10 days',season:'Jun–Sep',region:'Pacific West',tripType:'themed',avgCost:'$$'},

  // 83
  {id:'waterfall-trail',name:"America's Waterfall Trail",icon:'💧',desc:"Chase the continent's greatest cascades — Yosemite Falls' 2,425-foot drop, Oregon's Multnomah Falls, Niagara's thundering curtain, and Watkins Glen's gorge trail.",parks:['yosemite','columbia-river-gorge','watkins-glen'],distance:'2,500 mi',days:'10–14 days',season:'May–Jul',region:'Multi-Region',tripType:'themed',avgCost:'$$'},

  // 84
  {id:'dark-sky-tour',name:'Dark Sky Tour',icon:'🌌',desc:"America's premier stargazing corridor — Cherry Springs State Park's Bortle-2 skies, Great Basin's Milky Way arch, Joshua Tree's boulder silhouettes, and Death Valley's zero light pollution.",parks:['joshua-tree','death-valley'],distance:'2,000 mi',days:'10–14 days',season:'Sep–Oct',region:'Multi-Region',tripType:'themed',avgCost:'$$'},

  // 85
  {id:'civil-war-trail',name:'Civil War Battlefields Trail',icon:'🎖',desc:"Follow America's defining conflict across Gettysburg's legendary fields, Antietam's bloodiest day, Appomattox's surrender, and Fredericksburg's winter horrors.",parks:['gettysburg-nmp-pa','shenandoah','appalachian-trail'],distance:'600 mi',days:'5–7 days',season:'Spring / Fall',region:'Southeast',tripType:'themed',avgCost:'$'},

  // 86
  {id:'ancient-ruins',name:'Ancient Southwest Ruins',icon:'🏛',desc:"Walk through 1,000-year-old Ancestral Puebloan cities — Mesa Verde's cliff palaces, Chaco Canyon's great houses, Canyon de Chelly's canyon bottom dwellings, and Bandelier's cave homes.",parks:['mesa-verde-cliff'],distance:'900 mi',days:'7–9 days',season:'Apr–Jun / Sep–Oct',region:'Southwest',tripType:'themed',avgCost:'$'},

  // 87
  {id:'lighthouse-route',name:'Atlantic Lighthouse Route',icon:'🔦',desc:"Trace the Atlantic coast's iconic lighthouses — Cape Hatteras' candy-striped tower, Assateague's barrier island sentinel, and Acadia's Bass Harbor Lighthouse above crashing waves.",parks:['cape-hatteras','assateague-island','acadia'],distance:'1,000 mi',days:'7–9 days',season:'May–Sep',region:'Northeast',tripType:'themed',avgCost:'$$'},

  // 88
  {id:'hot-springs-circuit',name:'Hot Springs Circuit',icon:'♨️',desc:"Soak in three worlds of thermal water — Hot Springs National Park's bathhouse row, Yellowstone's prismatic pools, and Olympic's Sol Duc hot springs hidden in the rainforest.",parks:['yellowstone','olympic'],distance:'2,800 mi',days:'14–21 days',season:'May–Sep',region:'Multi-Region',tripType:'themed',avgCost:'$$'},

  // 89
  {id:'island-hopping-east',name:'East Coast Island Hopping',icon:'⛵',desc:"Ferry between the Northeast's premier islands — Block Island's bluffs, Nantucket's cobblestones, Martha's Vineyard's gingerbread cottages, and Fire Island's boardwalk towns.",parks:['cape-hatteras','assateague-island'],distance:'500 mi',days:'7–10 days',season:'Jun–Sep',region:'Northeast',tripType:'island',avgCost:'$$$'},

  // 90
  {id:'great-lakes-loop',name:'Great Lakes Loop',icon:'🌊',desc:"Circuit all five Great Lakes' highlights — Pictured Rocks' sandstone arches, Sleeping Bear's massive dunes, Apostle Islands' sea caves, and Indiana Dunes' surprising urban wildness.",parks:['pictured-rocks-mi','sleeping-bear-dunes','apostle-islands','indiana-dunes'],distance:'1,500 mi',days:'10–14 days',season:'Jun–Sep',region:'Great Plains',tripType:'themed',avgCost:'$'},

  // 91
  {id:'desert-wildflower-trail',name:'Desert Wildflower Trail',icon:'🌸',desc:"Chase the super bloom — Death Valley's paintbrush carpets, Joshua Tree's cholla meadows, Anza-Borrego's ocotillo forests, and the Antelope Valley's poppy fields.",parks:['death-valley','joshua-tree'],distance:'600 mi',days:'5–7 days',season:'Feb–Apr',region:'Pacific West',tripType:'themed',avgCost:'$'},

  // 92
  {id:'native-cultures-route',name:'Native Cultures Route',icon:'🪶',desc:"Experience living Native American heritage — Monument Valley's Navajo guides, Canyon de Chelly's ancient cliff dwellings, Taos Pueblo's 1,000-year-old adobe village, and the Crazy Horse Memorial.",parks:['monument-valley-navajo-az','crazy-horse-memorial-sd','mesa-verde-cliff'],distance:'1,200 mi',days:'8–10 days',season:'Apr–Oct',region:'Southwest',tripType:'themed',avgCost:'$'},

  // 93
  {id:'national-mall-to-smokies',name:'American Icons Road Trip',icon:'🗽',desc:"Link America's most iconic landmarks — the National Mall's monuments, Gettysburg's sacred fields, the Shenandoah Valley, and the Smoky Mountains' bio-rich hollows.",parks:['gettysburg-nmp-pa','shenandoah','great-smoky','blue-ridge-parkway'],distance:'700 mi',days:'6–8 days',season:'Spring / Fall',region:'Southeast',tripType:'themed',avgCost:'$$'},

  // 94
  {id:'birding-flyway',name:'Central Flyway Birding Road Trip',icon:'🦅',desc:"Follow the Central Flyway migration route through Bosque del Apache's sandhill cranes, Great Plains' prairie chicken booms, and Aransas' whooping cranes on the Texas Gulf Coast.",parks:['big-bend-tx'],distance:'1,500 mi',days:'10–14 days',season:'Nov–Mar',region:'Great Plains',tripType:'themed',avgCost:'$'},

  // 95
  {id:'gateway-arch-west',name:'Gateway to the West',icon:'🌉',desc:"Start at St. Louis's Gateway Arch — where westward expansion began — and follow Lewis & Clark's trail through the Badlands' painted spires, Black Hills' monuments, and Yellowstone's wild heart.",parks:['gateway-arch-mo','badlands','mount-rushmore-sd','yellowstone'],distance:'1,500 mi',days:'10–12 days',season:'May–Sep',region:'Great Plains',tripType:'themed',avgCost:'$'},

  // 96
  {id:'coastal-maine-to-florida',name:'Atlantic Coast Drive',icon:'🌊',desc:"Drive the full Atlantic seaboard from Acadia's granite headlands south through the Outer Banks' wild barrier islands to Everglades' subtropical mangroves.",parks:['acadia','cape-hatteras','assateague-island','everglades'],distance:'2,200 mi',days:'14–21 days',season:'Apr–May / Sep–Oct',region:'Multi-Region',tripType:'coastal',avgCost:'$$'},

  // 97
  {id:'hawaii-big-island-loop',name:'Big Island Volcano Loop',icon:'🌋',desc:"Circle Hawaii's Big Island past active lava fields at Hawaii Volcanoes National Park, Mauna Kea's world-class observatories, black and green sand beaches, and manta ray dives.",parks:['hawaii-volcanoes'],distance:'200 mi',days:'5–7 days',season:'Year-round',region:'Hawaii',tripType:'island',avgCost:'$$'},

  // 98
  {id:'glacier-bay-alaska',name:'Alaska Coastal Wilderness',icon:'🐋',desc:"Southeast Alaska's glacier-carved fjords — Glacier Bay's calving tidewater glaciers, Wrangell-St. Elias' mountain wilderness, and Kenai Fjords' sea otter rookeries.",parks:['glacier-bay','wrangell-st-elias','kenai-fjords-ak'],distance:'800 mi',days:'10–14 days',season:'Jun–Aug',region:'Alaska',tripType:'coastal',avgCost:'$$$'},

  // 99
  {id:'kauai-na-pali',name:'Kauai Garden Isle Circuit',icon:'🌺',desc:"Circle Kauai past the Na Pali Coast's cathedral sea cliffs, Waimea Canyon's 'Grand Canyon of the Pacific,' and Poipu's monk seal beaches on Hawaii's most lush island.",parks:['na-pali-coast','waimea-canyon'],distance:'120 mi',days:'4–6 days',season:'Apr–Sep',region:'Hawaii',tripType:'island',avgCost:'$$'},

  // 100
  {id:'mississippi-river-road',name:'Great River Road',icon:'🚢',desc:"Follow the Mississippi River from Minnesota's Lake Itasca headwaters south through Mark Twain's Hannibal, Civil War Vicksburg, and on to New Orleans' jazz clubs — America's longest river road.",parks:['gateway-arch-mo','congaree-np-sc'],distance:'2,000 mi',days:'14–21 days',season:'Spring / Fall',region:'Multi-Region',tripType:'themed',avgCost:'$'},

];
