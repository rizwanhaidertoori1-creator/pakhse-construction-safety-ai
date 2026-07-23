import { RegulatoryFramework, HazardCategory, ToolboxTalk, EmergencyContact, QuizQuestion } from '../types';

export const PAKISTAN_REGULATIONS: RegulatoryFramework[] = [
  {
    id: 'posha-2019',
    name: 'Punjab Occupational Safety and Health Act 2019',
    shortName: 'POSHA 2019 (Punjab)',
    region: 'Punjab Province',
    description: 'Mandates compulsory safety officers, risk evaluations, employer duty of care, and written safety policies for all construction sites in Punjab employing 10+ workers.',
    keyMandates: [
      'Compulsory appointment of qualified HSE Officers on active sites',
      'Mandatory free provision of PPE (Hard hats, harnesses, boots) by employers',
      'Mandatory incident logging & notification within 24 hours to Labour Inspector',
      'Right of workers to refuse dangerous work without penalty'
    ],
    penaltiesSummary: 'Fines up to PKR 100,000 to 500,000 and imprisonment up to 6 months for grave non-compliance.',
    officialDocRef: 'Govt of Punjab Gazette No. PAP/Legis-2(23)/2018'
  },
  {
    id: 'sindh-osh-2017',
    name: 'Sindh Occupational Safety and Health Act 2017',
    shortName: 'Sindh OSH 2017',
    region: 'Sindh Province',
    description: 'Comprehensive health & safety legislation for Sindh covering Karachi high-rises, ports, and industrial construction.',
    keyMandates: [
      'Establishment of Safety Committees on construction projects with >20 staff',
      'Mandatory scaffold tagging and structural stability certification',
      'Strict noise & air particulate emission limits during urban building',
      'Medical health checks and heatwave hydration provisions for outdoor workers'
    ],
    penaltiesSummary: 'Fines up to PKR 200,000 and potential site closure notices.',
    officialDocRef: 'Sindh Act No. I of 2018'
  },
  {
    id: 'pec-safety-code',
    name: 'PEC Building Code of Pakistan - Safety Provisions 2007/2021',
    shortName: 'PEC Building Code (National)',
    region: 'Federal / All Pakistan',
    description: 'Pakistan Engineering Council guidelines regulating structural safety, scaffolding design, deep foundation shoring, and seismic building codes.',
    keyMandates: [
      'Standardized safety factor (>4) for all suspended scaffold platforms',
      'Mandatory trench shoring for excavation deeper than 1.5 meters (5 feet)',
      'Tower crane & lifting gear third-party load test certification every 6 months',
      'Seismic zone structural compliance checks during reinforcement steel laying'
    ],
    penaltiesSummary: 'Revocation of contractor PEC license & professional engineer registration.',
    officialDocRef: 'PEC Bylaws / Statutory Order S.R.O. 1057(I)/2007'
  },
  {
    id: 'pepa-1997',
    name: 'Pakistan Environmental Protection Act (PEPA 1997) & EPAs',
    shortName: 'PEPA 1997 / Environmental EPA',
    region: 'Federal & Provincial EPAs (Pak-EPA, Punjab EPA, Sindh EPA)',
    description: 'Governs Environmental Impact Assessments (EIA), Initial Environmental Examinations (IEE), air dust control, effluent disposal, and noise pollution from construction.',
    keyMandates: [
      'Compulsory IEE/EIA approval before major infrastructure or commercial high-rise construction',
      'Compliance with National Environmental Quality Standards (NEQS) for noise (<65 dB daytime) and air (PM2.5/PM10 misting)',
      'Prohibition of open dumping of concrete sludge & demolition waste into natural storm drains/nullahs'
    ],
    penaltiesSummary: 'Environmental Tribunal fines up to PKR 5 Million and environmental stop-work orders.',
    officialDocRef: 'Act No. XXXIV of 1997'
  },
  {
    id: 'factories-act-1934',
    name: 'West Pakistan Factories Rules 1962 / Factories Act 1934',
    shortName: 'Factories Act 1934',
    region: 'National Legacy Framework',
    description: 'Historic statutory baseline for industrial and hazardous work, covering machinery guarding, hoist/lift safety, and ventilation.',
    keyMandates: [
      'Fencing and guard-rails around open pits, vats, and high floor openings',
      'Maximum weight lifting limits for manual labor (50 kg max for adults)',
      'Provision of clean drinking water, shade shelters, and first-aid kits on work sites'
    ],
    penaltiesSummary: 'Magisterial summary proceedings and site fines.',
    officialDocRef: 'Act XXV of 1934'
  }
];

export const HAZARD_CATEGORIES: HazardCategory[] = [
  {
    id: 'scaffolding-falls',
    title: 'Working at Height & Scaffolding',
    titleUrdu: 'بلندی پر کام اور سکیفولڈنگ کی حفاظت',
    iconName: 'Building2',
    description: 'Falls from heights are the #1 cause of fatalities on Pakistani construction sites (unbraced bamboo/pipe scaffolding, missing guardrails, unanchored lanyards).',
    pakistanContextNote: 'Prevalent use of makeshift bamboo or uninspected steel pipe scaffolding without double lanyards in multi-story residential and commercial buildings.',
    commonHazards: [
      'Unanchored or missing safety harnesses',
      'Scaffold planks without locking pins or toe-boards',
      'Working on wet bamboo during monsoon rains',
      'Uncovered floor voids and elevator shaft openings'
    ],
    controlMeasures: [
      'Enforce Green Tag (Inspected & Safe) / Red Tag (Do Not Use) system',
      'Install 100% fall protection lifelines and double lanyard shock-absorbing harnesses',
      'Cap and cover all floor openings with secure 3/4" plywood marked "DANGER / KHATRA"',
      'Erect double guardrails (top-rail at 42" and mid-rail at 21") on all perimeters'
    ],
    requiredPpe: ['Full Body Harness with Dual Lanyard', 'Safety Helmet with Chinstrap', 'Anti-slip Steel Toe Boots']
  },
  {
    id: 'deep-excavation',
    title: 'Trenching & Deep Excavations',
    titleUrdu: 'کھدائی اور خندقوں کی حفاظت',
    iconName: 'Shovel',
    description: 'Cave-ins and sidewall collapses in alluvial clay soil (Lahore, Multan) or loose sandy soil (Karachi coastal areas).',
    pakistanContextNote: 'Deep basement digging in dense urban areas like Gulberg Lahore or Clifton Karachi without proper steel sheet piling or soil sloped benches.',
    commonHazards: [
      'Unshored excavation walls exceeding 1.5 meters depth',
      'Heavy machinery or excavated soil piled right at the edge (<1 meter)',
      'Underground utility line strikes (Sui Gas, K-Electric/LESCO, PTCL cables)',
      'Water ingress and mud softening during heavy rainfall'
    ],
    controlMeasures: [
      'Slope walls at 45° angle or install timber/steel shoring box for >1.5m depth',
      'Keep heavy loads and excavated dirt at least 1.5 meters away from trench crest',
      'Conduct pre-dig scanning & clearance with gas and power utility departments',
      'Provide ladder access every 7.5 meters inside the trench'
    ],
    requiredPpe: ['High-Vis Reflective Vest', 'Hard Hat', 'Gum Boots / Steel Toe Rubber Boots', 'Dust Mask']
  },
  {
    id: 'monsoon-electrical',
    title: 'Electrical & Monsoon Safety',
    titleUrdu: 'بجلی اور مون سون کی تحفظ',
    iconName: 'Zap',
    description: 'Electrocution caused by temporary site distribution boards (DBs), damaged cables sitting in standing water, and lack of ELCB/GFCI breakers.',
    pakistanContextNote: 'Heavy Pakistani monsoons cause urban flooding on construction sites; temporary site wiring often uses joints without waterproof insulation.',
    commonHazards: [
      'Bare wire joints inserted directly into sockets without plugs',
      'Waterlogged distribution boards without rain proofing or ground earth rods',
      'Using electric concrete vibrators or cutters with submerged power cords',
      'Touch potential near steel crane booms under overhead power lines'
    ],
    controlMeasures: [
      'Mandatory Earth Leakage Circuit Breakers (ELCB / GFCI 30mA) on all temporary DBs',
      'Elevate power cables on insulated wooden tree poles 2.5m above standing water',
      'Industrial weatherproof IP67 plugs and sockets only—strictly ban bare wires',
      'Daily pre-shift inspection of power tools by qualified electrician'
    ],
    requiredPpe: ['Electrical Hazard Safety Shoes (10kV rated)', 'Insulated Rubber Gloves', 'Safety Glasses']
  },
  {
    id: 'heatwave-health',
    title: 'Extreme Heat Stress & Hydration',
    titleUrdu: 'شدید گرمی اور ڈی ہائیڈریشن سے بچاؤ',
    iconName: 'Sun',
    description: 'Heat stroke, severe dehydration, and physical exhaustion during summer months in Punjab, Sindh, and Balochistan (42°C to 48°C).',
    pakistanContextNote: 'High humidity combined with ambient temperatures above 40°C in interior Sindh and southern Punjab creates life-threatening WBGT heat stress conditions.',
    commonHazards: [
      'Continuous strenuous manual labor under direct noon sun without shade',
      'Lack of clean cool drinking water and ORS (Oral Rehydration Salts)',
      'Worker hesitation to report dizziness due to fear of wage loss',
      'Wearing heavy non-breathable synthetic clothing under hot weather'
    ],
    controlMeasures: [
      'Implement work-rest shift rotations (15 min rest per hour in shade when >40°C)',
      'Provide shaded rest shelters equipped with pedestal fans and cold water taps',
      'Distribute free ORS packets and urge 1 glass of water every 20 minutes',
      'Train supervisors to recognize early symptoms of heat stroke (dry skin, confusion)'
    ],
    requiredPpe: ['Lightweight Cotton Under-clothing', 'Wide-brim Neck Shade attachments for Hard Hats', 'UV Protective Sunglasses']
  },
  {
    id: 'environmental-dust',
    title: 'Air Quality, Dust & Waste Control',
    titleUrdu: 'فضائی آلودگی، گردوغبار اور ماحولیات',
    iconName: 'Wind',
    description: 'Silica dust inhalation from concrete cutting, brick grinding, dry batching, and open transport of aggregate in dense cities.',
    pakistanContextNote: 'Severe winter smog in Lahore/Faisalabad and high urban dust in Karachi require strict PM2.5/PM10 emission controls under PEPA guidelines.',
    commonHazards: [
      'Crystalline silica dust exposure causing silicosis and respiratory illness',
      'Uncovered dump trucks spreading dust across public highways',
      'Burning construction packaging or trash on site',
      'Runoff wash-water containing concrete cement slurry contaminating ground drains'
    ],
    controlMeasures: [
      'Continuous water spray misting on dry earthworks and stone crushing',
      'Mandatory wet-cutting methods for bricks, tiles, and concrete blocks',
      'Cover all transport trucks carrying sand/gravel with tarpaulin sheets',
      'Establish concrete washout pits lined with thick plastic membrane'
    ],
    requiredPpe: ['N95 / FFP2 Dust Respirator', 'Sealed Goggles', 'Earplugs']
  }
];

export const PRELOADED_TOOLBOX_TALKS: ToolboxTalk[] = [
  {
    id: 'tbt-01',
    topic: '100% Fall Protection & Harness Inspection',
    topicUrdu: '100% گرنے سے بچاؤ اور ہارنس کی جانچ',
    category: 'Work at Height',
    estimatedMinutes: 5,
    keyTalkingPointsEnglish: [
      'Always inspect your safety harness before putting it on: check webbing for cuts, fraying, chemical damage, and buckle rust.',
      'Tie off your lanyard to an approved anchorage point capable of supporting 5,000 lbs (2,260 kg)—never tie off to scaffolding guardrails or rebar stubs.',
      'Maintain 100% tie-off using a dual-lanyard system when transferring between anchorage points above 2 meters height.',
      'Immediately report any harness that has arrested a fall so it can be destroyed and taken out of service.'
    ],
    keyTalkingPointsUrdu: [
      'سیفٹی ہارنس پہننے سے پہلے اس کے تمام پٹوں، سلائی اور بکلز کی اچھی طرح جانچ کریں۔',
      'لینیارڈ کو صرف مضبوط اور تصدیق شدہ اینکر پوائنٹ سے باندھیں، سکیفولڈنگ کے پائپ یا سریا سے ہرگز نہ باندھیں۔',
      '2 میٹر سے زیادہ بلندی پر کام کرتے وقت ہمیشہ ڈبل لینیارڈ استعمال کریں تاکہ ہر وقت ایک پٹا جڑا رہے۔',
      'اگر کوئی ہارنس کبھی حادثے میں استعمال ہوئی ہو تو اسے فوراً ضائع کر کے نیا ڈبل لینیارڈ ہارنس طلب کریں۔'
    ],
    interactiveQuestions: [
      'What is the minimum height in Pakistan where fall protection is mandatory? (Answer: 2 meters / 6.5 feet)',
      'Where should you NOT tie off your lanyard? (Answer: Scaffolding pipes, electrical conduits, rebar)'
    ],
    supervisorNote: 'Ensure every worker adjusts their harness shoulder and leg straps snugly before ascending.'
  },
  {
    id: 'tbt-02',
    topic: 'Monsoon Site Electrocution & Cable Elevation',
    topicUrdu: 'مون سون میں برقی کرنٹ اور تاروں کی حفاظت',
    category: 'Electrical Safety',
    estimatedMinutes: 5,
    keyTalkingPointsEnglish: [
      'Water and electricity are a deadly combination—never handle electric tools with wet hands or standing in puddles.',
      'Inspect all extension cords: ensure no joints are covered in electrical tape without IP67 waterproof junction boxes.',
      'Verify that the temporary Distribution Board (DB) has an active ELCB (Earth Leakage Circuit Breaker) test button.',
      'Elevate all site cables on dry wooden A-frames or insulated hooks at least 2.5 meters above the ground.'
    ],
    keyTalkingPointsUrdu: [
      'پانی اور بجلی کا ملاپ انتہائی خطرناک ہے - گییلے ہاتھوں سے بجلی کے اوزار کبھی نہ چھوئیں۔',
      'تاروں میں ننگے جوڑ یا کچی ٹیپ نہ لگائیں، صرف واٹر پروف پلگ کا استعمال کریں۔',
      'مین ڈسٹری بیوشن بورڈ میں ELCB / GFCI بریکر بٹن کی دبا کر روزانہ ٹیسٹنگ کریں۔',
      'زمین پر پانی میں بچھائی گئی تاروں کو لکڑی کی گھوڑیوں پر 2.5 میٹر اونچائی پر معلق کریں۔'
    ],
    interactiveQuestions: [
      'What device protects you if current leaks to ground? (Answer: ELCB / GFCI breaker)',
      'Can we use bare wires in plug sockets? (Answer: No, strictly prohibited)'
    ],
    supervisorNote: 'Check site earth resistance and test all DB circuit breakers before daily shift starts.'
  },
  {
    id: 'tbt-03',
    topic: 'Heat Stress Management & Hydration SOP',
    topicUrdu: 'شدید گرمی میں ڈی ہائیڈریشن اور لو سے بچاؤ',
    category: 'Occupational Health',
    estimatedMinutes: 5,
    keyTalkingPointsEnglish: [
      'Drink 1 full cup of clean water or ORS mix every 20 minutes, even if you do not feel thirsty.',
      'Watch your co-workers for heat illness signs: cessation of sweating, confusion, slurred speech, or dizziness.',
      'Take mandatory 10-15 minute rest breaks inside shaded, ventilated rest areas during peak hours (12 PM to 3 PM).',
      'Report immediately to the site First Aid post if you feel throbbing headache or nausea.'
    ],
    keyTalkingPointsUrdu: [
      'پیاس نہ بھی لگے تو بھی ہر 20 منٹ بعد ایک گلاس صاف پانی یا او آر ایس والا پانی پوئیں۔',
      'اپنے ساتھیوں پر نظر رکھیں - اگر کسی کو چکر ائیں، پسینہ انا بند ہو جائے یا بے ہوشی محسوس ہو تو فوراً سائے میں لائیں۔',
      'دوپہر 12 سے 3 بجے کے شدید دھوپ کے اوقات میں سائے دار شیڈ میں وقتاً فوقتاً آرام کریں۔',
      'سر درد یا الٹی کی صورت میں فوراً سائٹ فرسٹ ایڈ افسر کو اطلاع دیں۔'
    ],
    interactiveQuestions: [
      'How often should you drink water in 40°C heat? (Answer: Every 15-20 minutes)',
      'What should you do if a colleague stops sweating and looks confused? (Answer: Move to shade, loosen clothes, apply cool water, call First Aid)'
    ],
    supervisorNote: 'Keep chilled water dispensers fully stocked with ORS packets at every work section.'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    serviceName: 'Rescue 1122 (Punjab, KPK, Balochistan)',
    serviceNameUrdu: 'ریسکیو 1122 (پنجاب، کے پی کے، بلوچستان)',
    number: '1122',
    coverage: 'Punjab, Khyber Pakhtunkhwa, Gilgit-Baltistan, Balochistan',
    description: 'Emergency ambulance, fire brigade, collapse rescue, and high-rise technical rescue service.',
    priority: 'Immediate'
  },
  {
    serviceName: 'Sindh Emergency Rescue 1122',
    serviceNameUrdu: 'سندھ ایمرجنسی ریسکیو 1122',
    number: '1122',
    coverage: 'Karachi, Hyderabad, Sukkur, Sindh Province',
    description: 'Govt of Sindh emergency service for urban accidents, fire, and medical transportation.',
    priority: 'Immediate'
  },
  {
    serviceName: 'Edhi Foundation Ambulance Service',
    serviceNameUrdu: 'ایدھی ایمبولینس سروس',
    number: '115',
    coverage: 'Nationwide (All Pakistan Cities & Highways)',
    description: 'Largest nationwide emergency medical transport and casualty relief service.',
    priority: 'Immediate'
  },
  {
    serviceName: 'Chhipa Welfare Emergency',
    serviceNameUrdu: 'چیپا ویلفیئر ایمرجنسی',
    number: '1020',
    coverage: 'Karachi, Sindh & Major Urban Centers',
    description: 'Rapid ambulance response and disaster relief team.',
    priority: 'Immediate'
  },
  {
    serviceName: 'Pakistan Engineering Council (PEC) Safety Desk',
    serviceNameUrdu: 'پاکستان انجینئرنگ کونسل سیفٹی ڈیسک',
    number: '051-9219012',
    coverage: 'Federal HQ, Islamabad',
    description: 'Reporting structural integrity breaches, serious crane failure, or contractor safety violations.',
    priority: 'Standard'
  },
  {
    serviceName: 'Punjab Environmental Protection Agency (EPA)',
    serviceNameUrdu: 'محکمہ تحفظ ماحول پنجاب',
    number: '042-99232321',
    coverage: 'Punjab Region',
    description: 'Reporting illegal chemical dumping, hazardous smog dust emissions, or industrial effluent spills.',
    priority: 'Standard'
  }
];

export const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'You are supervising concrete casting on the 8th floor of a high-rise building in Lahore. Workers are installing perimeter formwork near the edge. According to POSHA 2019 and PEC Safety Provisions, what is the mandatory requirement?',
    options: [
      'Workers only need to wear hard hats and steel toe boots',
      'A safety net can be omitted if workers promise to be careful',
      'Full body harness with dual lanyards anchored to tested life-lines and perimeter guardrails must be installed',
      'Only team leaders need fall protection'
    ],
    correctIndex: 2,
    explanation: 'Both POSHA 2019 and PEC Safety Codes mandate 100% fall protection (harness + guardrails/lifelines) for any work exposed to a fall hazard above 2 meters.',
    pakCodeRef: 'POSHA 2019 Sec 12 & PEC Building Code Safety Clause 4.2'
  },
  {
    id: 2,
    scenario: 'During heavy monsoon rains in Karachi, standing water forms near the main electrical distribution board. A technician wants to plug in a portable concrete mixer using bare wire ends stuck into a socket. What is the correct action?',
    options: [
      'Allow it if he wears dry rubber shoes',
      'Immediately stop the activity, switch off DB power, prohibit bare wires, and require IP67 industrial waterproof plugs connected to an ELCB breaker',
      'Wrap electrical tape around the bare wire and continue',
      'Put a wooden board under the wire and run it through the puddle'
    ],
    correctIndex: 1,
    explanation: 'Bare wire insertion into sockets is strictly illegal and a prime cause of workplace electrocution in Pakistan. IP67 weatherproof sockets and 30mA ELCB breakers are mandatory.',
    pakCodeRef: 'Factories Act 1934 Sec 33-N & NEBOSH/OSHA Standards'
  },
  {
    id: 3,
    scenario: 'You are excavating a 3.0-meter deep utility basement trench in clay soil in Multan. What soil stability control must be provided before workers enter the trench?',
    options: [
      'No extra support is needed if the soil looks dry',
      'Sprinkle water on the trench walls to keep them firm',
      'Provide engineered timber/steel trench shoring box or slope the trench walls at 45° angle with ladder egress every 7.5 meters',
      'Place sandbags only at the top rim'
    ],
    correctIndex: 2,
    explanation: 'Excavations exceeding 1.5 meters depth in Pakistan require engineered shoring, benching, or 45° sloping to prevent catastrophic soil collapse.',
    pakCodeRef: 'PEC Building Code Safety Provisions Clause 6.1 & West Pak Factories Rules'
  },
  {
    id: 4,
    scenario: 'The ambient temperature at a road construction site in Multan reaches 44°C with high humidity during summer. A mason reports feeling dizzy, headache, and has stopped sweating. What is the immediate first aid protocol?',
    options: [
      'Give him hot tea and ask him to finish his shift quickly',
      'Move him immediately to a shaded, cool area, loosen clothing, apply cool damp cloths, offer chilled ORS water if conscious, and call Rescue 1122',
      'Tell him to lie down under the sun until the truck arrives',
      'Give him painkiller tablets and send him back to laying bricks'
    ],
    correctIndex: 1,
    explanation: 'These are classic signs of life-threatening Heat Stroke. Immediate rapid cooling and emergency medical assistance (Rescue 1122) are required.',
    pakCodeRef: 'Sindh OSH Act 2017 & POSHA Heatwave Working SOP'
  }
];
