const ROAD_TRIP_DETAILS = {
  'utah-mighty-5': {
    overview: "Utah's Mighty Five road trip is the ultimate red rock pilgrimage, connecting five national parks in a 500-mile loop through some of the most dramatic desert scenery on Earth. Start in Moab with the iconic Delicate Arch at sunrise, then descend into Canyonlands' vast mesa country before crossing the Waterpocket Fold at Capitol Reef. The journey climaxes with Bryce Canyon's otherworldly hoodoos and Zion's towering sandstone walls — a geological story spanning 270 million years.",
    itinerary: [
      {day:1, title:'Arrive in Moab', desc:'Fly into Grand Junction or Salt Lake City, drive to Moab. Sunset at Dead Horse Point overlook.'},
      {day:2, title:'Arches National Park', desc:'Sunrise at Delicate Arch (3-mile hike). Afternoon: Devils Garden, Landscape Arch, Double Arch.'},
      {day:3, title:'Canyonlands — Island in the Sky', desc:'Mesa Arch at sunrise, Grand View Point, Green River Overlook. Optional: White Rim Trail drive.'},
      {day:4, title:'Capitol Reef National Park', desc:'Drive scenic Highway 24. Hike Hickman Bridge and Capitol Gorge. Pick fruit in the historic Fruita orchards.'},
      {day:5, title:'Bryce Canyon National Park', desc:'Sunrise at Inspiration Point. Hike the Navajo Loop and Queens Garden Trail through hoodoo forests.'},
      {day:6, title:'Zion National Park', desc:"Angels Landing or The Narrows — choose your adventure. Scenic drive through the canyon floor."},
      {day:7, title:'Zion & Departure', desc:'Emerald Pools trail, Weeping Rock. Drive to Las Vegas for departure.'}
    ],
    tips: "Gas up in every town — stretches between Capitol Reef and Bryce Canyon have limited stations. Highway 12 between these parks is one of America's most scenic drives. Start hikes before 8 AM in summer to beat the heat. Timed entry reservations required for Arches (book 2 months ahead).",
    lodging: "Moab has the best selection of hotels and Airbnbs. Torrey (near Capitol Reef) has charming small inns. Bryce Canyon City and Springdale (Zion) have lodge options. Camping available in all five parks — reserve early.",
    budget: "$120–200/day per person: $60–120 lodging, $25–40 food, $15–25 gas, park passes $80 total (or $80 America the Beautiful pass covers all).",
    bestMonths: "April–May: wildflowers, mild temps (60–80°F), fewer crowds. September–October: golden cottonwoods, cooler hiking. Avoid July–August: extreme heat (100°F+) and peak crowds.",
    highlights: ['Sunrise at Delicate Arch with the La Sal Mountains backdrop', 'Hiking The Narrows — wading through the Virgin River in Zion', 'Driving Highway 12 between Capitol Reef and Bryce Canyon']
  },
  'glacier-yellowstone-teton': {
    overview: "This 800-mile circuit through Montana and Wyoming connects three of America's most pristine wilderness parks. Drive the legendary Going-to-the-Sun Road through Glacier's alpine meadows, watch Old Faithful erupt in Yellowstone's geothermal wonderland, and stand beneath the jagged Teton peaks reflected in Jenny Lake. This is the definitive Rocky Mountain road trip — grizzly bears, wolf packs, and bison herds included.",
    itinerary: [
      {day:1, title:'Arrive Glacier NP', desc:'Fly into Kalispell. Drive to West Glacier, explore Lake McDonald area.'},
      {day:2, title:'Going-to-the-Sun Road', desc:'Drive the full 50 miles over Logan Pass. Stop at Weeping Wall, Oberlin Bend, Jackson Glacier overlook.'},
      {day:3, title:'Glacier East Side', desc:'Many Glacier area: Grinnell Glacier hike or boat to hidden lakes. Wildlife spotting for mountain goats.'},
      {day:4, title:'Drive to Yellowstone', desc:'Scenic drive south through Montana. Arrive Yellowstone north entrance, Mammoth Hot Springs.'},
      {day:5, title:'Yellowstone Upper Loop', desc:'Grand Canyon of the Yellowstone, Tower Fall, Lamar Valley (wolf watching at dawn).'},
      {day:6, title:'Yellowstone Lower Loop', desc:'Old Faithful, Grand Prismatic Spring, West Thumb Geyser Basin, Yellowstone Lake.'},
      {day:7, title:'Yellowstone to Grand Teton', desc:'Drive south via Lewis Lake. Stop at Colter Bay for panoramic Teton views.'},
      {day:8, title:'Grand Teton National Park', desc:'Jenny Lake boat ride, Inspiration Point hike. Sunset at Schwabacher Landing.'},
      {day:9, title:'Jackson Hole', desc:'Explore the town, National Elk Refuge. Optional: Snake River float trip.'},
      {day:10, title:'Departure', desc:'Fly out of Jackson Hole or drive to Salt Lake City.'}
    ],
    tips: "Going-to-the-Sun Road opens late June to mid-October (weather dependent). Vehicle reservations required for GTTS Road. Yellowstone is huge — budget full days for each loop. Carry bear spray everywhere. Gas up at park stations (limited hours).",
    lodging: "Historic park lodges (Old Faithful Inn, Lake Yellowstone Hotel, Many Glacier Hotel) book 6+ months ahead. Gateway towns: West Yellowstone, Gardiner, Jackson have ample options. Camping reservations essential June–August.",
    budget: "$150–250/day per person: $80–150 lodging, $30–50 food, $20–30 gas. Park passes: $35/vehicle each or $80 annual pass.",
    bestMonths: "Late June–early July: wildflowers, waterfalls at peak, GTTS Road just opened. September: golden aspens, fewer crowds, wildlife active before winter. Avoid: August (crowds), October (roads closing).",
    highlights: ['Watching Old Faithful erupt with the Milky Way overhead', 'Driving Going-to-the-Sun Road at sunrise with no traffic', 'Sunrise at Schwabacher Landing with Teton reflection']
  },
  'pnw-loop': {
    overview: "Washington State packs three national parks into a 600-mile loop that spans temperate rainforests, glacier-capped volcanoes, and dramatic mountain passes. Start at Olympic's wild Pacific beaches and moss-draped Hoh Rainforest, circle south to Mount Rainier's wildflower meadows, then head north into the rugged backcountry of North Cascades. This is the Pacific Northwest at its most diverse and untamed.",
    itinerary: [
      {day:1, title:'Arrive Seattle', desc:'Drive to Olympic Peninsula. Ferry from Edmonds to Kingston for scenic crossing.'},
      {day:2, title:'Olympic — Coast', desc:'Rialto Beach, Hole-in-the-Wall, Ruby Beach. Tidepools and sea stacks at sunset.'},
      {day:3, title:'Olympic — Rainforest', desc:'Hoh Rainforest Hall of Mosses trail. Hurricane Ridge for alpine views.'},
      {day:4, title:'Drive to Rainier', desc:'South through Olympia to Mount Rainier. Enter via Nisqually entrance.'},
      {day:5, title:'Mount Rainier', desc:'Paradise area: Skyline Trail with wildflower meadows (July–August). Myrtle Falls.'},
      {day:6, title:'North Cascades', desc:'Drive via Marblemount. Diablo Lake overlook — stunning turquoise water. Ross Lake trail.'},
      {day:7, title:'Return to Seattle', desc:'Washington Pass overlook, Winthrop western town stop. Drive back to Seattle.'}
    ],
    tips: "Olympic Peninsula roads are winding and slow — budget extra time. Rainier's Paradise can be foggy; start early for clearest views. North Cascades Highway (SR-20) closes November–May. Rain gear is essential year-round on the Olympic coast.",
    lodging: "Port Angeles and Forks for Olympic. Ashford and Packwood for Rainier. Marblemount and Winthrop for North Cascades. Mix of lodges, cabins, and campgrounds. Seattle for first/last night.",
    budget: "$130–200/day per person: $70–130 lodging, $25–40 food, $20–30 gas/ferries.",
    bestMonths: "July–August: driest weather, wildflowers at Paradise, all roads open. September: fewer crowds, fall colors starting. June: waterfalls peak but some roads still closed.",
    highlights: ['Hoh Rainforest — walking through a real-life fairy tale', 'Wildflower meadows at Paradise with Rainier towering above', 'Turquoise waters of Diablo Lake from the highway overlook']
  },
  'blue-ridge': {
    overview: "America's most beloved scenic drive winds 469 miles through the ancient Appalachian Mountains, connecting Shenandoah's misty ridges to the Great Smoky Mountains' biodiversity hotspot. The Blue Ridge Parkway was designed for slow travel — no commercial traffic, no stoplights, just 270 overlooks and countless waterfalls threading through some of the oldest mountains on Earth. Come in October and the entire world turns to fire.",
    itinerary: [
      {day:1, title:'Shenandoah NP', desc:'Skyline Drive entrance. Stony Man summit hike, Big Meadows Lodge.'},
      {day:2, title:'Shenandoah South', desc:'Dark Hollow Falls, Hawksbill Summit (highest point in the park). Enter Blue Ridge Parkway.'},
      {day:3, title:'Virginia Blue Ridge', desc:'Peaks of Otter, Mabry Mill (most photographed spot on the parkway).'},
      {day:4, title:'North Carolina Highlands', desc:'Linn Cove Viaduct, Grandfather Mountain, Julian Price Park.'},
      {day:5, title:'Asheville Area', desc:'Folk Art Center, explore downtown Asheville. Biltmore Estate optional.'},
      {day:6, title:'Southern Parkway', desc:'Graveyard Fields waterfall hike, Richland Balsam (highest point on parkway at 6,053 ft).'},
      {day:7, title:'Great Smoky Mountains', desc:'Clingmans Dome, Cades Cove loop for wildlife, Gatlinburg.'}
    ],
    tips: "The Parkway speed limit is 45 mph — embrace the pace. Many sections close in winter (ice/snow). Cell service is spotty along the ridge. Fuel up in towns; there are no gas stations on the Parkway itself. Dawn and dusk are best for wildlife and photography.",
    lodging: "Shenandoah: Big Meadows Lodge or Skyland Resort. Along the Parkway: Peaks of Otter Lodge, Pisgah Inn. Asheville has abundant hotels. Gatlinburg/Pigeon Forge near Smokies. Camping throughout.",
    budget: "$100–180/day per person: $50–100 lodging, $25–40 food, $15–25 gas. Parkway is free; Shenandoah is $30/vehicle.",
    bestMonths: "Mid-October: peak fall foliage — the #1 reason people drive this road. May–June: rhododendron and azalea blooms, waterfalls at full flow. July–August: warm but hazy.",
    highlights: ['Mabry Mill reflection at sunrise — the iconic Blue Ridge photo', 'Peak fall foliage week in mid-October (check leaf prediction maps)', 'Cades Cove loop at dawn — deer, bear, and wild turkey everywhere']
  },
  'pch': {
    overview: "The Pacific Coast Highway stretches 1,650 miles from Washington's Olympic Peninsula to Southern California's sunny beaches, threading through some of the most dramatic coastal scenery on the planet. Drive past Oregon's sea stacks and tide pools, through the towering redwoods, along Big Sur's cliff-hugging curves, and down to the surf breaks of Malibu. This is the road trip that defines the American West Coast.",
    itinerary: [
      {day:1, title:'Olympic Coast', desc:'Start at Ruby Beach, drive south through coastal Washington.'},
      {day:2, title:'Oregon Coast North', desc:'Cannon Beach (Haystack Rock), Ecola State Park, Tillamook cheese factory.'},
      {day:3, title:'Oregon Coast South', desc:"Thor's Well, Cape Perpetua, Oregon Dunes, Bandon beach."},
      {day:4, title:'Redwood Country', desc:'Jedediah Smith Redwoods, Avenue of the Giants, Fern Canyon.'},
      {day:5, title:'Mendocino Coast', desc:'Fort Bragg Glass Beach, Point Arena Lighthouse.'},
      {day:6, title:'San Francisco', desc:'Golden Gate Bridge, Alcatraz, Fishermans Wharf. Rest day.'},
      {day:7, title:'Big Sur', desc:'Bixby Bridge, McWay Falls, Pfeiffer Beach purple sand. One of the most scenic drives in the world.'},
      {day:8, title:'Central Coast', desc:'Hearst Castle, Morro Bay, Pismo Beach.'},
      {day:9, title:'Santa Barbara & Ventura', desc:'Channel Islands day trip or Santa Barbara wine country.'},
      {day:10, title:'Los Angeles', desc:'Malibu beaches, Santa Monica Pier, Venice Beach. End of the road.'}
    ],
    tips: "Drive north-to-south so you're on the ocean side of the road. Big Sur has limited gas and no cell service — fill up in Carmel or San Simeon. Fog is common June–August on the northern coast. Highway 1 sections may close after storms — check Caltrans. Pull over often; the views never stop.",
    lodging: "Mix of coastal motels, Airbnbs, and campgrounds. Splurge options: Treebones Resort (Big Sur), Stephanie Inn (Cannon Beach). Budget: state park campgrounds along the entire route.",
    budget: "$140–220/day per person: $70–140 lodging, $30–50 food, $25–35 gas. Tolls on Golden Gate Bridge ($9).",
    bestMonths: "September–October: clearest skies, warm temps, no fog. May: wildflowers on the hillsides. Avoid: June–July fog ('June Gloom') on northern coast.",
    highlights: ['Driving across Bixby Bridge in Big Sur at golden hour', 'Walking through a cathedral of ancient redwoods at Fern Canyon', 'Sunset at Ruby Beach with sea stacks silhouetted']
  },
  'sw-canyon': {
    overview: "This 1,000-mile loop from Las Vegas plunges into the deepest canyons, most vivid slot canyons, and most photogenic bends in the American Southwest. Stand on the rim of the Grand Canyon at sunset, wade through Zion's Narrows, peer down at Horseshoe Bend, and photograph the light beams piercing Antelope Canyon. This is Instagram's favorite road trip — and it lives up to every photo.",
    itinerary: [
      {day:1, title:'Las Vegas to Grand Canyon', desc:'Drive to South Rim (4.5 hrs). Sunset at Mather Point or Hopi Point.'},
      {day:2, title:'Grand Canyon', desc:'Bright Angel Trail hike (to Indian Garden or 1.5-Mile Resthouse). Rim Trail walk.'},
      {day:3, title:'Page, Arizona', desc:'Horseshoe Bend (short hike), Antelope Canyon tour (book ahead). Lake Powell overlook.'},
      {day:4, title:'Drive to Bryce Canyon', desc:'Scenic Highway 89 through Marble Canyon. Arrive Bryce, sunset at Bryce Point.'},
      {day:5, title:'Bryce Canyon', desc:'Navajo Loop and Queens Garden. Drive Highway 12 to Escalante — stop at Calf Creek Falls.'},
      {day:6, title:'Zion National Park', desc:"Angels Landing or The Narrows. Canyon floor scenic drive."},
      {day:7, title:'Zion to Las Vegas', desc:'Morning: Emerald Pools. Afternoon: drive back to Vegas via I-15 (2.5 hrs).'}
    ],
    tips: "Antelope Canyon requires a Navajo guided tour — book 2+ weeks ahead (Upper is most photogenic, Lower is less crowded). Horseshoe Bend parking is $10, go at sunset. Grand Canyon South Rim is 1+ hour from the east entrance — plan accordingly. Carry 1 gallon of water per person per day.",
    lodging: "Tusayan or Williams near Grand Canyon. Page for Antelope Canyon/Horseshoe Bend. Bryce Canyon City. Springdale for Zion. All bookable but reserve early for summer.",
    budget: "$130–200/day per person: $60–120 lodging, $25–40 food, $15–25 gas. Antelope Canyon tour: $50–80/person.",
    bestMonths: "May and September: ideal temps (70–85°F), manageable crowds. March–April: Grand Canyon waterfalls flowing. Avoid: July–August (extreme heat, monsoon storms, packed crowds).",
    highlights: ['Light beams in Upper Antelope Canyon (aim for 11 AM–1 PM tour)', 'Sunset at Grand Canyon South Rim — 2 billion years of geology in golden light', 'Wading through The Narrows in Zion as canyon walls tower 1,000 feet above']
  },
  'ca-parks': {
    overview: "California has more national parks than any other state, and this 1,330-mile loop connects seven of them in a journey from granite cathedrals to ancient forests to scorching desert floors. Climb Half Dome in Yosemite, stand among the world's largest trees in Sequoia, cross Death Valley's salt flats at Badwater Basin (282 feet below sea level), scramble through Joshua Tree's alien boulder fields, and walk through Redwood forests that predate the Roman Empire.",
    itinerary: [
      {day:1, title:'San Francisco to Yosemite', desc:'Drive to Yosemite Valley. Tunnel View, Bridalveil Fall, Valley floor loop.'},
      {day:2, title:'Yosemite', desc:'Mist Trail to Vernal and Nevada Falls. Or Half Dome (permit required). Glacier Point sunset.'},
      {day:3, title:'Sequoia & Kings Canyon', desc:'General Sherman Tree (largest living tree on Earth), Moro Rock climb, Crystal Cave.'},
      {day:4, title:'Death Valley', desc:'Cross the Sierra. Badwater Basin, Artists Palette, Zabriskie Point sunset, Mesquite Flat dunes.'},
      {day:5, title:'Joshua Tree', desc:'Hidden Valley, Skull Rock, Cholla Cactus Garden. Stargazing at night.'},
      {day:6, title:'Pinnacles National Park', desc:'Drive north to Pinnacles. Bear Gulch Cave, High Peaks Trail with condor spotting.'},
      {day:7, title:'Big Sur Coast', desc:'Drive Highway 1 through Big Sur to the Redwoods. McWay Falls, Bixby Bridge.'},
      {day:8, title:'Redwood National Park', desc:'Avenue of the Giants, Fern Canyon, Tall Trees Grove.'},
      {day:9, title:'Lassen Volcanic', desc:'Bumpass Hell boardwalk (bubbling mud pots), Summit Lake, Manzanita Lake.'},
      {day:10, title:'Return to SF', desc:'Drive back through Sacramento. Optional: detour to Lake Tahoe.'}
    ],
    tips: "This route spans extreme elevations — pack layers for 14,000-ft Sierra passes and 120°F Death Valley. Death Valley is best November–March (dangerous heat otherwise). Yosemite requires day-use reservations in summer. Gas up before entering any park — remote stretches can be 100+ miles between stations.",
    lodging: "Yosemite: Curry Village or Majestic Hotel (book 6+ months ahead). Lone Pine or Stovepipe Wells for Death Valley. Twentynine Palms for Joshua Tree. Campgrounds throughout. San Francisco for first/last night.",
    budget: "$140–230/day per person: $70–140 lodging, $30–50 food, $20–30 gas. Annual park pass essential ($80).",
    bestMonths: "September–October: best all-around (Yosemite waterfalls low but comfortable temps everywhere). April–May: Yosemite waterfalls peak but Death Valley getting hot. Winter: desert parks ideal, mountain parks snowy.",
    highlights: ['Sunset at Glacier Point overlooking Half Dome and Yosemite Valley', 'Standing next to General Sherman — the largest living thing on Earth', 'Stargazing in Joshua Tree — one of the darkest skies in Southern California']
  },
  'rocky-mountain': {
    overview: "Colorado's four national parks showcase the Rocky Mountains' incredible diversity — from 14,000-foot alpine tundra to towering sand dunes, from a 2,000-foot-deep black canyon to 700-year-old cliff dwellings. This 900-mile circuit loops through the heart of the Rockies with Trail Ridge Road as the crown jewel, climbing above treeline to 12,183 feet with views stretching to infinity.",
    itinerary: [
      {day:1, title:'Denver to Rocky Mountain NP', desc:'Drive to Estes Park. Bear Lake area hikes, elk spotting at Moraine Park.'},
      {day:2, title:'Trail Ridge Road', desc:'Drive the highest continuous paved road in the US (12,183 ft). Alpine tundra, marmots, wildflowers.'},
      {day:3, title:'Drive to Great Sand Dunes', desc:'South through the San Luis Valley. Arrive at the tallest sand dunes in North America.'},
      {day:4, title:'Great Sand Dunes NP', desc:'Climb Star Dune (750 ft). Splash in Medano Creek. Sandboard or sand sled down the dunes.'},
      {day:5, title:'Black Canyon of the Gunnison', desc:'South Rim Drive. Painted Wall (2,250 ft — tallest cliff in Colorado). Gunnison Point overlook.'},
      {day:6, title:'Mesa Verde National Park', desc:'Cliff Palace tour (largest cliff dwelling in North America). Balcony House ladder climb.'},
      {day:7, title:'Return via Million Dollar Highway', desc:'Drive the Million Dollar Highway (US-550) through Ouray and Silverton. Hot springs stop. Return to Denver.'}
    ],
    tips: "Trail Ridge Road is open late May through mid-October (snow dependent). The Million Dollar Highway has steep drop-offs and no guardrails — drive with confidence. Altitude sickness is real above 10,000 ft — hydrate and take it easy the first day. Mesa Verde cliff dwelling tours require tickets (limited daily).",
    lodging: "Estes Park for Rocky Mountain NP. Alamosa or Great Sand Dunes Lodge. Montrose for Black Canyon. Cortez or Mancos for Mesa Verde. Mix of motels and campgrounds.",
    budget: "$110–180/day per person: $50–100 lodging, $25–40 food, $15–25 gas.",
    bestMonths: "June–July: wildflowers on Trail Ridge Road, all parks accessible. September: golden aspens, fewer crowds. Avoid: winter (Trail Ridge Road closed, Mesa Verde tours limited).",
    highlights: ['Driving Trail Ridge Road above the clouds at 12,000 feet', 'Climbing the tallest sand dunes in North America at sunrise', 'Standing inside Cliff Palace — a 700-year-old apartment complex built into a cliff']
  },
  'new-england': {
    overview: "Chase the most spectacular fall foliage in North America on this 800-mile loop through Maine, New Hampshire, and Vermont. Starting at Acadia's granite coastline where the first rays of autumn sunlight hit the US, the route threads through covered bridges, white-steepled villages, and mountain notches that blaze with crimson, amber, and gold from late September through mid-October.",
    itinerary: [
      {day:1, title:'Acadia National Park', desc:'Cadillac Mountain sunrise (first in the US). Jordan Pond House for popovers. Ocean Path.'},
      {day:2, title:'Acadia & Bar Harbor', desc:'Carriage roads by bike, Thunder Hole, Bass Harbor Lighthouse at sunset.'},
      {day:3, title:'Drive to White Mountains', desc:'Scenic drive through Maine to New Hampshire. Kancamagus Highway — peak foliage road.'},
      {day:4, title:'White Mountains', desc:'Franconia Notch: Flume Gorge, Artist Bluff hike. Drive Mount Washington Auto Road (if open).'},
      {day:5, title:'Vermont', desc:'Cross into Vermont. Stowe: covered bridges, cider mills, mountain views. Ben & Jerrys factory.'},
      {day:6, title:'Southern Vermont', desc:'Woodstock village (one of prettiest in America), Quechee Gorge, Killington gondola rides.'},
      {day:7, title:'Return', desc:'Drive south through the Berkshires or east to Boston.'}
    ],
    tips: "Foliage peaks progress south — northern Maine/NH peak first (late Sept), Vermont peaks early-mid October. Book lodging 3+ months ahead for peak foliage weeks. Kancamagus Highway is stunning but gridlocked on peak weekends — go midweek. Bring layers; mountain temps can be 30°F colder than valleys.",
    lodging: "Bar Harbor for Acadia. North Conway or Lincoln for White Mountains. Stowe or Woodstock for Vermont. Charming B&Bs are the quintessential New England lodging experience.",
    budget: "$130–220/day per person: $70–140 lodging (B&Bs premium during foliage), $25–45 food, $15–25 gas. Acadia: $35/vehicle.",
    bestMonths: "Late September–mid October: THE reason to do this trip. First two weeks of October are statistically peak. Check New England foliage tracker maps for real-time updates.",
    highlights: ['Cadillac Mountain sunrise — first sunlight in the United States', 'Driving the Kancamagus Highway at peak foliage', 'A classic Vermont village with white church steeple framed by blazing maples']
  },
  'florida-keys': {
    overview: "The Overseas Highway (US-1) hops across 42 bridges connecting a chain of coral islands from Miami to Key West, with the turquoise Atlantic on one side and the warm Gulf on the other. Add the Everglades' river of grass and Biscayne's underwater coral reefs, and you have America's only tropical road trip — complete with key lime pie, Ernest Hemingway's cats, and sunsets that turn the sky every shade of pink.",
    itinerary: [
      {day:1, title:'Everglades National Park', desc:'Anhinga Trail (guaranteed alligator sightings), Shark Valley tram or bike ride.'},
      {day:2, title:'Biscayne NP & Key Largo', desc:'Morning: Biscayne glass-bottom boat or snorkel tour. Afternoon: drive to Key Largo, John Pennekamp snorkeling.'},
      {day:3, title:'Islamorada & Marathon', desc:'Robbie\'s Marina (feed the tarpon), Bahia Honda State Park — best beach in the Keys.'},
      {day:4, title:'Seven Mile Bridge to Key West', desc:'Drive the iconic Seven Mile Bridge. Arrive Key West: Duval Street, Mallory Square sunset.'},
      {day:5, title:'Key West', desc:'Hemingway Home, Fort Jefferson day trip (Dry Tortugas ferry), southernmost point buoy photo.'}
    ],
    tips: "Only one road in and out — traffic can be brutal on Friday afternoons (Miami exodus) and Sunday returns. The best snorkeling is at John Pennekamp and Looe Key. Book the Dry Tortugas ferry weeks ahead (Yankee Freedom, $190/person). Gas prices increase the further south you go.",
    lodging: "Key Largo: budget-friendly. Islamorada: mid-range resorts. Marathon: family-friendly. Key West: most expensive — book early. Camping at Bahia Honda is amazing if you can get a spot.",
    budget: "$150–280/day per person: $80–180 lodging (Key West is pricey), $30–50 food, $10–15 gas. Snorkel tours: $40–70. Dry Tortugas ferry: $190.",
    bestMonths: "November–March: dry season, comfortable temps (70–80°F), less humidity. April: pleasant but getting warmer. Avoid: June–November (hurricane season), August (extreme heat/humidity).",
    highlights: ['Driving the Seven Mile Bridge with ocean on both sides', 'Snorkeling at John Pennekamp — the only living coral reef in the continental US', 'Sunset celebration at Mallory Square with street performers and fire eaters']
  },
  'alaska': {
    overview: "Alaska's parks are measured in millions of acres and accessed by bush planes, gravel roads, and sheer determination. This 1,000-mile route connects Denali's 20,310-foot peak (North America's highest), Wrangell-St. Elias' vast ice fields (larger than Switzerland), and Kenai Fjords' tidewater glaciers calving into the sea. Wildlife encounters are not optional — moose, bears, eagles, and whales are everywhere.",
    itinerary: [
      {day:1, title:'Arrive Anchorage', desc:'Explore downtown, visit the Alaska Wildlife Conservation Center on the way to the Kenai Peninsula.'},
      {day:2, title:'Kenai Fjords NP', desc:'Full-day boat cruise from Seward: tidewater glaciers, humpback whales, puffins, sea otters.'},
      {day:3, title:'Seward to Denali', desc:'Drive north via Anchorage to Denali (5 hrs). Evening: Horseshoe Lake trail, watch for moose.'},
      {day:4, title:'Denali National Park', desc:'Bus tour to Wonder Lake (11 hrs round-trip) or Eielson Visitor Center (8 hrs). Denali visible on clear days.'},
      {day:5, title:'Denali Day 2', desc:'Savage River Loop hike, sled dog demonstration, Denali Park Village.'},
      {day:6, title:'Drive to Wrangell-St. Elias', desc:'Long drive south and east via Glennallen to McCarthy (6+ hrs, last 60 miles unpaved).'},
      {day:7, title:'Wrangell-St. Elias', desc:'Kennecott Mines National Historic Landmark, Root Glacier hike (walk on the glacier).'},
      {day:8, title:'Return to Anchorage', desc:'Drive back via the scenic Glenn Highway. Departure.'}
    ],
    tips: "The McCarthy Road (last 60 miles to Wrangell-St. Elias) is unpaved and rough — high clearance vehicle recommended. Denali bus tours book months ahead in summer. Alaska summer daylight is 18–22 hours — pace yourself. Mosquito repellent is mandatory June–August. Gas stations are sparse — never pass one without filling up.",
    lodging: "Seward has hotels and B&Bs. Denali: park lodges or Healy motels. McCarthy: Ma Johnson's Hotel or Kennicott Glacier Lodge (limited — book early). Camping throughout but bring cold-weather gear.",
    budget: "$180–300/day per person: $100–180 lodging, $35–60 food (Alaska is expensive), $25–40 gas. Kenai Fjords boat tour: $180–220. Denali bus: $55–75.",
    bestMonths: "Late June–early August: longest days, warmest temps, all facilities open. Mid-September: fall colors, northern lights possible, fewer crowds but facilities closing. Avoid: May (muddy, facilities closed) and late September+ (snow, closures).",
    highlights: ['Seeing Denali fully unclouded — only happens ~30% of summer days', 'Watching a tidewater glacier calve into the ocean from a Kenai Fjords boat', 'Walking on Root Glacier in Wrangell-St. Elias — an ice age experience']
  },
  'hawaii': {
    overview: "Island-hop across Hawaii's three most dramatic islands — from the Big Island's active volcanoes and black sand beaches, to Maui's sunrise above the clouds at Haleakala, to Kauai's Na Pali Coast cliffs and Waimea Canyon (the 'Grand Canyon of the Pacific'). Each island has a completely different personality, ecosystem, and vibe.",
    itinerary: [
      {day:1, title:'Big Island — Hilo Side', desc:'Arrive Kona or Hilo. Rainbow Falls, Akaka Falls, Mauna Kea stargazing (if clear).'},
      {day:2, title:'Hawaii Volcanoes NP', desc:'Kilauea crater overlook, Thurston Lava Tube, Chain of Craters Road. Check for active lava flows.'},
      {day:3, title:'Big Island — Kona Side', desc:'Puuhonua o Honaunau (Place of Refuge), Kealakekua Bay snorkeling, Kona coffee farm tour.'},
      {day:4, title:'Fly to Maui', desc:'Short inter-island flight. Arrive Kahului, drive to Kihei or Lahaina.'},
      {day:5, title:'Haleakala Sunrise', desc:'3 AM alarm for Haleakala sunrise (10,023 ft — above the clouds). Afternoon: Road to Hana begins.'},
      {day:6, title:'Road to Hana', desc:'620 curves, 59 bridges. Stops: Twin Falls, Waianapanapa black sand beach, Seven Sacred Pools.'},
      {day:7, title:'Fly to Kauai', desc:'Inter-island flight. Arrive Lihue. Poipu Beach, Spouting Horn blowhole.'},
      {day:8, title:'Na Pali Coast', desc:'Boat tour or helicopter of Na Pali Coast — 4,000-foot sea cliffs. Or hike Kalalau Trail (2 miles to first beach).'},
      {day:9, title:'Waimea Canyon', desc:"Waimea Canyon Drive — Mark Twain called it the Grand Canyon of the Pacific. Pu'u O Kila lookout."},
      {day:10, title:'Departure', desc:'North Shore: Hanalei Bay, Kilauea Lighthouse. Fly home from Lihue.'}
    ],
    tips: "Inter-island flights are short (30–45 min) and cheap if booked early ($60–120 one-way). Haleakala sunrise requires a reservation ($1, books out fast). Road to Hana: start early, budget a full day, don't try to rush. Rent a jeep on Kauai for unpaved roads. Reef-safe sunscreen only (Hawaii law).",
    lodging: "Big Island: Kona coast resorts or Volcano area B&Bs. Maui: Kihei (affordable) or Lahaina/Kaanapali (splurge). Kauai: Poipu (south) or Princeville (north). Airbnbs popular on all islands.",
    budget: "$180–350/day per person: $100–200 lodging, $35–60 food, $20–30 car rental, inter-island flights $60–120 each. Activities (boats, helicopters) extra.",
    bestMonths: "April–May: great weather, less crowded, reasonable prices. September–October: warm, dry, whale season starting. November–March: whale watching peak but rainier (especially Kauai). Year-round viable.",
    highlights: ['Haleakala sunrise — watching dawn break above a sea of clouds', 'Na Pali Coast by boat — 4,000-foot emerald cliffs rising from the ocean', 'Walking through a lava tube at Hawaii Volcanoes National Park']
  },
  'going-sun': {
    overview: "Going-to-the-Sun Road is 50 miles of pure alpine drama — carved into the side of the Continental Divide, climbing to 6,646 feet at Logan Pass through Glacier National Park. It took 20 years to build and remains one of the most extraordinary engineering feats in the national park system. Waterfalls cascade directly onto the road, mountain goats graze roadside, and the views at every turn make you forget to breathe.",
    itinerary: [
      {day:1, title:'West Glacier to Logan Pass', desc:'Enter from the west side. Lake McDonald, Trail of the Cedars, Avalanche Creek. Stop at Weeping Wall and The Loop.'},
      {day:2, title:'Logan Pass & East Side', desc:'Hidden Lake Overlook hike (mountain goats guaranteed). Drive to St. Mary. Wild Goose Island viewpoint at sunrise.'}
    ],
    tips: "Vehicle reservations required for Going-to-the-Sun Road entry (May–September). Opens late June/early July — check nps.gov/glac for exact date. Drive west-to-east in the morning for best light. Vehicles over 21 feet or 8 feet wide are prohibited. Go early — parking at Logan Pass fills by 8 AM in summer.",
    lodging: "West Glacier: Belton Chalet, Glacier Guides Lodge. Inside park: Lake McDonald Lodge, Rising Sun Motor Inn. East side: St. Mary, Many Glacier area.",
    budget: "$120–200/day per person: $60–130 lodging, $25–35 food, $10–15 gas. Park entrance: $35/vehicle.",
    bestMonths: "Mid-July: road fully open, wildflowers peak at Logan Pass. August: warm, all facilities operating. September: crowds thin, fall colors in valleys (road may close late Sept).",
    highlights: ['Logan Pass at sunrise with wildflowers and mountain goats', 'Weeping Wall — a waterfall that cascades directly onto your car', 'Wild Goose Island at St. Mary Lake — the iconic Glacier photo']
  },
  'beartooth': {
    overview: "Charles Kuralt called the Beartooth Highway 'the most beautiful drive in America.' This 69-mile All-American Road climbs from the lush forests of Red Lodge, Montana to 10,947 feet — above treeline in a world of alpine tundra, snowfields, and crystalline lakes — before dropping into Yellowstone's northeast entrance near Cooke City. It's a drive through every ecosystem from prairie to arctic.",
    itinerary: [
      {day:1, title:'Red Lodge to Beartooth Pass', desc:'Start in Red Lodge. Climb 27 switchbacks to Beartooth Pass (10,947 ft). Stop at Rock Creek Vista, Twin Lakes overlook.'},
      {day:2, title:'Top of the World to Cooke City', desc:'Beartooth Lake, Clay Butte fire lookout. Descend to Cooke City.'},
      {day:3, title:'Enter Yellowstone NE', desc:'Lamar Valley — the Serengeti of North America. Wolf and bison watching at dawn.'}
    ],
    tips: "Open only Memorial Day to mid-October. Snow possible ANY month at the top — check road conditions. Gas up in Red Lodge; no stations for 60+ miles. The switchbacks are intense but well-paved. Altitude can cause headaches — take it slow. Best light is early morning.",
    lodging: "Red Lodge: charming ski town with hotels and restaurants. Cooke City: small, rustic. Inside Yellowstone: Roosevelt Lodge (nearby).",
    budget: "$100–160/day per person: $50–90 lodging, $25–35 food, $10–15 gas.",
    bestMonths: "July–August: snow melted at the top, wildflowers, clear skies. Late June: dramatic snowbanks still lining the road (photogenic). September: golden larches, fewer cars.",
    highlights: ['Standing at 10,947 feet surrounded by snowfields in July', 'The 27 switchbacks climbing out of Red Lodge — jaw-dropping at every turn', 'Entering Yellowstone through the quiet northeast — Lamar Valley wolves at dawn']
  },
  'cascade-loop': {
    overview: "Washington's 440-mile Cascade Loop circles the North Cascades mountain range through alpine passes, lakeside orchards, and the Bavarian-themed village of Leavenworth. It's the Pacific Northwest road trip for people who want mountains, wine country, and small-town charm without the crowds of the national parks.",
    itinerary: [
      {day:1, title:'Seattle to Leavenworth', desc:'Drive US-2 east over Stevens Pass. Arrive in Leavenworth — Bavarian village, bratwurst, and beer.'},
      {day:2, title:'Leavenworth to Lake Chelan', desc:'Fruit orchards of the Wenatchee Valley. Lake Chelan wine tasting. Boat to Stehekin (optional).'},
      {day:3, title:'North Cascades Highway', desc:'Drive SR-20 through North Cascades NP. Diablo Lake (turquoise!), Washington Pass overlook, Rainy Pass.'},
      {day:4, title:'Winthrop & Methow Valley', desc:'Western-themed town of Winthrop. Mountain biking or hiking. Sun Mountain Lodge.'},
      {day:5, title:'Return to Seattle', desc:'Drive west via Marblemount and I-5. Optional: detour to La Conner or Whidbey Island.'}
    ],
    tips: "North Cascades Highway (SR-20) closes November through May. The loop is best driven clockwise (eastbound morning light). Leavenworth is packed on weekends — visit midweek. Bring layers; temperatures drop significantly at the passes.",
    lodging: "Leavenworth: Bavarian lodges and B&Bs. Chelan: lakeside resorts. Winthrop: Sun Mountain Lodge (splurge) or motels. Marblemount: rustic cabins.",
    budget: "$120–200/day per person: $60–120 lodging, $25–40 food, $15–25 gas.",
    bestMonths: "July–August: all roads open, warm, long days. Late September: fall colors in the larch forests (golden). June: waterfalls peak but some roads may still be closed.",
    highlights: ['Turquoise waters of Diablo Lake from the SR-20 overlook', 'Leavenworth at Christmas — 500,000 lights in a Bavarian village', 'Washington Pass overlook — the most dramatic viewpoint on the loop']
  },
  'crater-oregon': {
    overview: "Oregon's only national park sits at the top of a collapsed volcano, filled with the deepest, bluest lake in America. Combine it with the dramatic Oregon coast — sea stacks, tide pools, and wild headlands — for a 500-mile loop that shows Oregon at its most spectacular. Crater Lake's blue has to be seen to be believed; no photograph captures it.",
    itinerary: [
      {day:1, title:'Portland to Crater Lake', desc:'Drive south via I-5 and OR-138. Arrive late afternoon. Rim Village sunset.'},
      {day:2, title:'Crater Lake', desc:'Rim Drive (33 miles around the lake). Wizard Island boat tour (book ahead). Cleetwood Cove trail to swim in the lake.'},
      {day:3, title:'Crater Lake to Coast', desc:'Drive west to the coast via Roseburg. Arrive Bandon or Gold Beach.'},
      {day:4, title:'Southern Oregon Coast', desc:'Samuel H. Boardman Scenic Corridor — sea stacks, arches, hidden beaches.'},
      {day:5, title:'Return North', desc:'Cape Perpetua, Thor\'s Well (at high tide), Heceta Head Lighthouse. Return to Portland via Florence.'}
    ],
    tips: "Rim Drive is open late June through October. Wizard Island boat tour sells out — book at recreation.gov. Crater Lake elevation is 7,100 ft — snow possible into June. The lake water is 38°F even in summer — swimming is for the brave. Oregon coast fog is common in summer mornings.",
    lodging: "Crater Lake Lodge (inside the park — book 6+ months ahead). Klamath Falls or Roseburg as alternatives. Bandon or Gold Beach on the coast. Florence or Newport heading north.",
    budget: "$110–180/day per person: $50–100 lodging, $25–40 food, $15–20 gas. Crater Lake: $30/vehicle. Wizard Island boat: $60.",
    bestMonths: "Late July–August: Rim Drive fully open, clearest skies, warmest lake temps (still cold). September: fewer crowds, first snow dustings on the rim. Coast: September–October best (least fog).",
    highlights: ['First sight of Crater Lake — the bluest water you will ever see', 'Swimming in the lake at Cleetwood Cove (if you dare)', 'Samuel H. Boardman Corridor — Oregon\'s most dramatic coastline']
  },
  'skyline-drive': {
    overview: "Shenandoah's Skyline Drive is 105 miles along the crest of the Blue Ridge Mountains with 75 scenic overlooks, each one more beautiful than the last. It's the East Coast's answer to Going-to-the-Sun Road — quieter, greener, and in October, absolutely ablaze with color. Deer browse roadside, black bears lope through the woods, and the Appalachian Trail crosses the road at over 30 points.",
    itinerary: [
      {day:1, title:'North Entrance to Big Meadows', desc:'Enter at Front Royal. Mary\'s Rock tunnel, Stony Man summit hike (highest accessible peak). Big Meadows Lodge.'},
      {day:2, title:'Central District', desc:'Dark Hollow Falls (shortest waterfall hike in the park), Hawksbill Summit. Byrd Visitor Center. Sunset at Crescent Rock Overlook.'},
      {day:3, title:'South to Rockfish Gap', desc:'Doyles River Falls, Blackrock Summit. Exit at Rockfish Gap (connects to Blue Ridge Parkway if continuing south).'}
    ],
    tips: "Speed limit is 35 mph — this is not a commuter road. Deer are everywhere at dawn/dusk — drive carefully. Cell service is mostly nonexistent on the ridge. The best overlooks face west (sunsets). Fall color peaks around October 10–20 in the central section.",
    lodging: "Big Meadows Lodge and Skyland Resort are inside the park (reserve early). Luray and Front Royal have motels and B&Bs. Camping at 4 campgrounds along the drive.",
    budget: "$90–160/day per person: $40–90 lodging, $20–35 food, $10–15 gas. Park entrance: $30/vehicle.",
    bestMonths: "October 10–25: peak fall foliage. May: wildflowers and waterfalls at their best. June–August: green and lush but hazy. Avoid: winter (portions close for ice/snow).",
    highlights: ['Sunset from Crescent Rock Overlook during peak foliage', 'Hiking the Appalachian Trail for a section — it crosses Skyline Drive 32 times', 'Stony Man summit — easiest hike to the best panoramic view in Virginia']
  },
  'route-66': {
    overview: "The Mother Road stretches 2,448 miles from Chicago to Santa Monica through the heartland of America — neon motels, roadside diners, ghost towns, painted deserts, and a healthy dose of nostalgia for a country that traveled by two-lane highway. It's not about the destinations (though the Grand Canyon and Petrified Forest are on the route); it's about the journey, the quirky Americana, and the feeling of driving into an endless horizon.",
    itinerary: [
      {day:1, title:'Chicago, IL', desc:'Start at the Route 66 Begin sign on Adams Street. Gemini Giant in Wilmington. Springfield: Abe Lincoln sites.'},
      {day:2, title:'St. Louis, MO', desc:'Gateway Arch, Ted Drewes frozen custard (Route 66 tradition).'},
      {day:3, title:'Missouri to Oklahoma', desc:'Devil\'s Elbow, Totem Pole Park, Blue Whale of Catoosa.'},
      {day:4, title:'Oklahoma City', desc:'Pops 66 Soda Ranch, Oklahoma City National Memorial.'},
      {day:5, title:'Texas Panhandle', desc:'Cadillac Ranch (spray paint your message), Big Texan Steak Ranch in Amarillo.'},
      {day:6, title:'New Mexico', desc:'Blue Hole of Santa Rosa, Route 66 Auto Museum in Santa Fe, Albuquerque Old Town.'},
      {day:7, title:'Gallup to Petrified Forest', desc:'Gallup murals, Petrified Forest National Park, Painted Desert.'},
      {day:8, title:'Arizona', desc:'Meteor Crater, Winslow (stand on the corner), Seligman (birthplace of Route 66 revival).'},
      {day:9, title:'Grand Canyon Detour', desc:'Side trip to Grand Canyon South Rim (1 hour from Williams).'},
      {day:10, title:'Kingman to Oatman', desc:'Oatman ghost town (wild burros!), cool springs, London Bridge in Lake Havasu City.'},
      {day:11, title:'Mojave Desert', desc:'Amboy: Roy\'s Motel and Cafe, Bagdad Cafe. Desert heat and emptiness.'},
      {day:12, title:'Barstow to San Bernardino', desc:'Calico Ghost Town, Route 66 Museum in Victorville.'},
      {day:13, title:'Los Angeles Area', desc:'Fair Oaks Pharmacy, Pasadena. Hollywood Boulevard.'},
      {day:14, title:'Santa Monica Pier', desc:'End of the trail at the Santa Monica Pier. Photo at the Route 66 End sign.'}
    ],
    tips: "Original Route 66 is discontinuous — sometimes it's a frontage road alongside I-40. GPS alone won't find it; get the EZ66 Guide or Route 66 Navigation app. Gas and services can be scarce in western Oklahoma, the Texas Panhandle, and the Mojave. Many classic motels are cash-only. Summer in the desert is brutal — carry extra water.",
    lodging: "Classic Route 66 motels: Wigwam Motel (Holbrook or San Bernardino), Blue Swallow Motel (Tucumcari), El Rancho Hotel (Gallup). Mix of motels, camping, and occasional splurges.",
    budget: "$100–170/day per person: $40–80 lodging (motels are cheap), $25–40 food (diners!), $30–40 gas (long distances). Attractions mostly free or cheap.",
    bestMonths: "September–October: comfortable temperatures everywhere, beautiful light. April–May: spring wildflowers in the desert. Avoid: July–August (deadly desert heat in AZ/CA/NM sections).",
    highlights: ['Cadillac Ranch at sunset — spray painting your message on half-buried Cadillacs', 'The original neon signs lighting up at dusk in Seligman and Tucumcari', 'Reaching the Santa Monica Pier — end of 2,448 miles of American highway']
  },
  'yosemite-tahoe': {
    overview: "Northern California's greatest hits in one 500-mile loop: Yosemite's granite monoliths and waterfalls, the giant sequoia groves of Mariposa, and Lake Tahoe's impossibly blue alpine waters straddling the California-Nevada border. Add winding Sierra Nevada passes, Gold Rush towns, and some of the best hiking in the western US.",
    itinerary: [
      {day:1, title:'San Francisco to Yosemite', desc:'Drive to Yosemite Valley (3.5 hrs). Tunnel View, Valley floor walk, Yosemite Falls.'},
      {day:2, title:'Yosemite', desc:'Mist Trail to Vernal Fall. Glacier Point sunset drive. Mariposa Grove giant sequoias.'},
      {day:3, title:'Yosemite to Tahoe', desc:'Drive Tioga Road (seasonal) through Tuolumne Meadows. Mono Lake tufa towers. Continue to South Lake Tahoe.'},
      {day:4, title:'Lake Tahoe', desc:'Emerald Bay State Park, Vikingsholm castle hike. Tahoe Rim Trail section. Sunset from Nevada side.'},
      {day:5, title:'Return to SF', desc:'Drive via Donner Pass and Sacramento. Optional: detour to Apple Hill for cider and pie.'}
    ],
    tips: "Tioga Road (Yosemite's high-country pass) is open late May through November — check conditions. If closed, take Highway 120 to 395 to 89 (adds 2 hours but equally scenic). Tahoe is crowded on weekends — visit midweek. Yosemite Valley day-use reservations required in summer.",
    lodging: "Yosemite: Curry Village, Majestic Hotel, or Groveland/Mariposa gateway towns. Tahoe: South Lake Tahoe has the most options. Camping at Tuolumne Meadows is spectacular.",
    budget: "$140–220/day per person: $70–140 lodging, $30–45 food, $20–30 gas.",
    bestMonths: "September–October: Tioga Road open, waterfalls modest but crowds thinning, Tahoe warm enough to swim. May–June: Yosemite waterfalls at peak but Tioga Road may not be open yet.",
    highlights: ['Tunnel View — the single most famous viewpoint in any US national park', 'Driving Tioga Road through Tuolumne Meadows at 8,600 feet', 'Emerald Bay at Lake Tahoe — the most photographed spot in the Sierra Nevada']
  },
  'texas-hill': {
    overview: "The Texas Hill Country is an unexpected paradise of rolling limestone hills, crystal-clear swimming holes, wildflower-blanketed meadows, and German heritage towns where kolaches and barbecue share the menu. In spring, bluebonnets carpet every roadside, and in summer, the Guadalupe and Frio Rivers become Texas's favorite natural waterparks. It's the antidote to everything you think you know about Texas.",
    itinerary: [
      {day:1, title:'Austin to Fredericksburg', desc:'Drive through wine country on US-290. Fredericksburg: German heritage, Nimitz Museum, Main Street shops.'},
      {day:2, title:'Enchanted Rock', desc:'Hike the pink granite dome (summit trail 0.6 mi). Luckenbach for live music and beer. Willow City Loop if wildflower season.'},
      {day:3, title:'Bandera & Medina', desc:'Bandera: Cowboy Capital of the World, dude ranch day ride. Medina: apple orchards and Love Creek.'},
      {day:4, title:'Garner State Park & Frio River', desc:'Swim and tube the crystal-clear Frio River. Evening: two-step dance at Garner State Park pavilion.'},
      {day:5, title:'San Antonio', desc:'River Walk, the Alamo, San Antonio Missions (UNESCO). Return to Austin.'}
    ],
    tips: "Wildflower season is mid-March through mid-April — the Willow City Loop north of Fredericksburg is the best drive for bluebonnets. Enchanted Rock fills up early on weekends — arrive before 9 AM or reserve day-use. Hill Country roads are gorgeous but winding — slow down and enjoy. BBQ joints close when the meat runs out — go early.",
    lodging: "Fredericksburg: B&Bs and Sunday houses (historic). Bandera: dude ranches. Garner State Park: cabins or camping. San Antonio: River Walk hotels. Wimberley and Dripping Springs for Austin-area charm.",
    budget: "$100–170/day per person: $50–100 lodging, $25–40 food (BBQ is cheap), $10–20 gas. Most state parks: $5–10/person.",
    bestMonths: "March–April: wildflower season (THE reason to visit). October–November: pleasant temps, fall foliage on cypress trees along rivers. Avoid: August (100°F+ daily).",
    highlights: ['Bluebonnet season on the Willow City Loop — seas of blue as far as you can see', 'Floating the Frio River on a tube with a cold Lone Star beer', 'Smoked brisket at a legendary Hill Country BBQ joint (Snow\'s, Kreuz, or Franklin)']
  },
  'so-cal-desert': {
    overview: "Southern California's desert circuit takes you from the lowest point in North America to Joshua Tree's surreal boulder fields to the sand dunes of the Mojave — an 800-mile journey through landscapes that look more like Mars than Earth. Spring wildflower superbloom years paint the desert floor in impossible colors, and the night skies are dark enough to see the Milky Way with the naked eye.",
    itinerary: [
      {day:1, title:'LA to Joshua Tree', desc:'Drive to Twentynine Palms. Hidden Valley, Skull Rock, Keys View sunset.'},
      {day:2, title:'Joshua Tree', desc:'Ryan Mountain hike for 360° views. Cholla Cactus Garden at golden hour. Stargazing.'},
      {day:3, title:'Joshua Tree to Death Valley', desc:'Drive north via Amboy and Baker. Arrive Death Valley: Zabriskie Point sunset.'},
      {day:4, title:'Death Valley', desc:'Badwater Basin (282 ft below sea level), Artists Palette, Mesquite Flat sand dunes at sunrise. Devils Golf Course.'},
      {day:5, title:'Return to LA', desc:'Drive via Mojave National Preserve: Kelso Dunes, lava tubes. Return to LA via Barstow.'}
    ],
    tips: "NEVER visit Death Valley June–September (temps reach 130°F). Carry 2 gallons of water per person per day. Gas up before entering any park — distances are huge. Cell service is nonexistent in most of the desert. Best stargazing: new moon nights in Joshua Tree or Death Valley.",
    lodging: "Twentynine Palms or Joshua Tree town for JT. Furnace Creek Ranch or Stovepipe Wells in Death Valley (limited — book early). Camping is excellent in both parks. Amboy and Baker have minimal services.",
    budget: "$100–170/day per person: $50–100 lodging, $20–35 food, $20–30 gas. Both parks: $30/vehicle each or annual pass.",
    bestMonths: "October–November: comfortable temps (70–85°F), clear skies. February–March: wildflower potential (superbloom years). April: still pleasant but warming. Avoid: June–September (life-threatening heat in Death Valley).",
    highlights: ['Standing at Badwater Basin — the lowest point in North America', 'Cholla Cactus Garden at golden hour — the spines glow like fiber optics', 'Milky Way stargazing in Joshua Tree — one of Southern California\'s darkest skies']
  }
};
