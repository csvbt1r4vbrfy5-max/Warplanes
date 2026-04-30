export type AircraftCategory =
  | "مقاتلات التفوق الجوي"
  | "قاذفات استراتيجية"
  | "استطلاع واستخبارات"
  | "طائرات بدون طيار قتالية";

export interface Operator {
  country: string;
  flag: string;
  year: number;
}

export interface AircraftSpecs {
  maxSpeed: number; // كم/س
  maxSpeedUnit: string;
  range: number; // كم
  rangeUnit: string;
  serviceCeiling: number; // متر
  serviceCeilingUnit: string;
  endurance: number; // ساعة
  enduranceUnit: string;
  wingspan: number; // متر
  length: number; // متر
  weight: number; // كجم (أقصى وزن عند الإقلاع)
  crew: number;
  stealthRating: number; // 0-100
  weaponCapacity: number; // كجم
  generation: string;
}

export interface Aircraft {
  id: string;
  name: string;
  designation: string;
  nato: string;
  category: AircraftCategory;
  manufacturer: string;
  firstFlight: number;
  status: "نشطة" | "قيد التطوير" | "محدودة" | "متقاعدة";
  description: string;
  specs: AircraftSpecs;
  operators: Operator[];
  imageColor: string; // لون التدرج للعنصر النائب
  imageUrl?: string; // رابط الصورة الحقيقية
}

export interface TimelineMilestone {
  year: number;
  era: string;
  title: string;
  description: string;
  keyAircraft: string;
  generation?: string;
}

// ─── بيانات الطائرات ─────────────────────────────────────────────────────────
export const aircraftData: Aircraft[] = [
  // ─── مقاتلات التفوق الجوي ──────────────────────────────────────────
  {
    id: "f22",
    name: "F-22 Raptor",
    imageUrl: "/images/aircraft/f22.png",
    designation: "F-22A",
    nato: "غير متاح",
    category: "مقاتلات التفوق الجوي",
    manufacturer: "لوكيهيد مارتن",
    firstFlight: 1997,
    status: "نشطة",
    description:
      "إف-22 رابتور هي مقاتلة تكتيكية شبحية ذات مقعد واحد ومحركين، تعمل في جميع الأحوال الجوية، تم تطويرها للقوات الجوية الأمريكية. تجمع بين التخفي، والسرعة الفائقة، والمناورة العالية، والإلكترونيات المتكاملة لتحقيق قدرة الرصد الأول والضرب الأول والقتل الأول.",
    specs: {
      maxSpeed: 2414,
      maxSpeedUnit: "كم/س",
      range: 2960,
      rangeUnit: "كم",
      serviceCeiling: 19812,
      serviceCeilingUnit: "م",
      endurance: 3.2,
      enduranceUnit: "ساعة",
      wingspan: 13.56,
      length: 18.92,
      weight: 38000,
      crew: 1,
      stealthRating: 95,
      weaponCapacity: 2270,
      generation: "الجيل الخامس",
    },
    operators: [{ country: "الولايات المتحدة", flag: "🇺🇸", year: 2005 }],
    imageColor: "#1a1a2e",
  },
  {
    id: "su57",
    name: "Su-57 Felon",
    imageUrl: "/images/aircraft/su57.png",
    designation: "Su-57",
    nato: "فيلون",
    category: "مقاتلات التفوق الجوي",
    manufacturer: "سوخوي",
    firstFlight: 2010,
    status: "نشطة",
    description:
      "سوخوي سو-57 هي مقاتلة شبحية متعددة المهام من الجيل الخامس، ذات مقعد واحد ومحركين، طورتها شركة سوخوي. وهي أول طائرة في الخدمة العسكرية الروسية تستخدم تقنية التخفي، ومصممة لتخلف ميج-29 وسو-27 في الخدمة الخطوط الأمامية.",
    specs: {
      maxSpeed: 2600,
      maxSpeedUnit: "كم/س",
      range: 3500,
      rangeUnit: "كم",
      serviceCeiling: 20000,
      serviceCeilingUnit: "م",
      endurance: 3.8,
      enduranceUnit: "ساعة",
      wingspan: 14.1,
      length: 19.8,
      weight: 35000,
      crew: 1,
      stealthRating: 80,
      weaponCapacity: 4700,
      generation: "الجيل الخامس",
    },
    operators: [{ country: "روسيا", flag: "🇷🇺", year: 2020 }],
    imageColor: "#16213e",
  },
  {
    id: "j20",
    name: "J-20 Mighty Dragon",
    imageUrl: "/images/aircraft/j20.png",
    designation: "J-20",
    nato: "فاجين",
    category: "مقاتلات التفوق الجوي",
    manufacturer: "تشنغدو للفضاء",
    firstFlight: 2011,
    status: "نشطة",
    description:
      "تشنغدو جي-20 هي مقاتلة شبحية ثنائية المحرك تعمل في جميع الأحوال الجوية، طورتها شركة تشنغدو للطيران الصينية. صممت كمقاتلة تفوق جوي مع قدرة ضرب دقيقة؛ وهي منحدرة من برنامج J-XX في التسعينيات.",
    specs: {
      maxSpeed: 2100,
      maxSpeedUnit: "كم/س",
      range: 5500,
      rangeUnit: "كم",
      serviceCeiling: 20000,
      serviceCeilingUnit: "م",
      endurance: 4.5,
      enduranceUnit: "ساعة",
      wingspan: 13.01,
      length: 20.4,
      weight: 37000,
      crew: 1,
      stealthRating: 85,
      weaponCapacity: 4000,
      generation: "الجيل الخامس",
    },
    operators: [{ country: "الصين", flag: "🇨🇳", year: 2017 }],
    imageColor: "#0f3460",
  },
  {
    id: "eurofighter",
    name: "Eurofighter Typhoon",
    imageUrl: "/images/aircraft/eurofighter.png",
    designation: "EF2000",
    nato: "غير متاح",
    category: "مقاتلات التفوق الجوي",
    manufacturer: "إيرباص للدفاع",
    firstFlight: 1994,
    status: "نشطة",
    description:
      "يوروفايتر تايفون هي مقاتلة أوروبية متعددة الجنسيات بمحركين وجناح دلتا. تجمع بين خفة الحركة العالية والقدرة على القتال خارج نطاق الرؤية والإلكترونيات المتقدمة لتوفير التفوق الجوي عبر نطاق عملياتي واسع.",
    specs: {
      maxSpeed: 2495,
      maxSpeedUnit: "كم/س",
      range: 2900,
      rangeUnit: "كم",
      serviceCeiling: 19812,
      serviceCeilingUnit: "م",
      endurance: 3.0,
      enduranceUnit: "ساعة",
      wingspan: 10.95,
      length: 15.96,
      weight: 23500,
      crew: 1,
      stealthRating: 30,
      weaponCapacity: 6500,
      generation: "جيل 4.5",
    },
    operators: [
      { country: "ألمانيا", flag: "🇩🇪", year: 2003 },
      { country: "المملكة المتحدة", flag: "🇬🇧", year: 2003 },
      { country: "إسبانيا", flag: "🇪🇸", year: 2003 },
      { country: "إيطاليا", flag: "🇮🇹", year: 2003 },
      { country: "السعودية", flag: "🇸🇦", year: 2009 },
    ],
    imageColor: "#1a1a3e",
  },

  // ─── قاذفات استراتيجية ─────────────────────────────────────────────────
  {
    id: "b2",
    name: "B-2 Spirit",
    imageUrl: "/images/aircraft/b2.png",
    designation: "B-2A",
    nato: "غير متاح",
    category: "قاذفات استراتيجية",
    manufacturer: "نورثروب جرومان",
    firstFlight: 1989,
    status: "نشطة",
    description:
      "نورثروب جرومان بي-2 سبيريت هي قاذفة استراتيجية أمريكية ثقيلة للاختراق، تتميز بتقنية التخفي المنخفضة المصممة لاختراق الدفاعات المضادة للطائرات الكثيفة. وهي بتصميم جناحي طائر مع طاقم من شخصين، ويمكنها حمل أسلحة تقليدية ونووية.",
    specs: {
      maxSpeed: 1010,
      maxSpeedUnit: "كم/س",
      range: 11100,
      rangeUnit: "كم",
      serviceCeiling: 15200,
      serviceCeilingUnit: "م",
      endurance: 33,
      enduranceUnit: "ساعة",
      wingspan: 52.43,
      length: 21.03,
      weight: 170600,
      crew: 2,
      stealthRating: 98,
      weaponCapacity: 23000,
      generation: "شبحية",
    },
    operators: [{ country: "الولايات المتحدة", flag: "🇺🇸", year: 1997 }],
    imageColor: "#0d1117",
  },
  {
    id: "b21",
    name: "B-21 Raider",
    imageUrl: "/images/aircraft/b21.png",
    designation: "B-21",
    nato: "غير متاح",
    category: "قاذفات استراتيجية",
    manufacturer: "نورثروب جرومان",
    firstFlight: 2023,
    status: "قيد التطوير",
    description:
      "نورثروب جرومان بي-21 رايدر هي قاذفة شبحية استراتيجية أمريكية قيد التطوير. صممت لأداء مهام الضرب التقليدية والنووية بعيدة المدى، وتمثل الجيل القادم من تكنولوجيا القاذفات الشبحية ومن المتوقع أن تحل محل بي-2 سبيريت.",
    specs: {
      maxSpeed: 1050,
      maxSpeedUnit: "كم/س",
      range: 12500,
      rangeUnit: "كم",
      serviceCeiling: 15500,
      serviceCeilingUnit: "م",
      endurance: 36,
      enduranceUnit: "ساعة",
      wingspan: 47.0,
      length: 16.8,
      weight: 100000,
      crew: 2,
      stealthRating: 99,
      weaponCapacity: 13600,
      generation: "الجيل السادس",
    },
    operators: [{ country: "الولايات المتحدة", flag: "🇺🇸", year: 2026 }],
    imageColor: "#0a0e14",
  },
  {
    id: "tu160",
    name: "Tu-160 White Swan",
    imageUrl: "/images/aircraft/tu160.png",
    designation: "Tu-160M",
    nato: "بلاك جاك",
    category: "قاذفات استراتيجية",
    manufacturer: "توبوليف",
    firstFlight: 1981,
    status: "نشطة",
    description:
      "توبوليف تو-160 هي قاذفة استراتيجية ثقيلة تفوق سرعتها سرعة الصوت بجناح متغير، صممها مكتب توبوليف للتصميم في الاتحاد السوفيتي. وهي أكبر وأثقل طائرة قتالية بنيت على الإطلاق، وأسرع قاذفة مستخدمة حالياً.",
    specs: {
      maxSpeed: 2220,
      maxSpeedUnit: "كم/س",
      range: 12300,
      rangeUnit: "كم",
      serviceCeiling: 15600,
      serviceCeilingUnit: "م",
      endurance: 15,
      enduranceUnit: "ساعة",
      wingspan: 55.7,
      length: 54.1,
      weight: 275000,
      crew: 4,
      stealthRating: 10,
      weaponCapacity: 40000,
      generation: "الجيل الرابع",
    },
    operators: [{ country: "روسيا", flag: "🇷🇺", year: 1987 }],
    imageColor: "#141414",
  },
  {
    id: "h20",
    name: "Xian H-20",
    imageUrl: "/images/aircraft/h20.png",
    designation: "H-20",
    nato: "غير متاح",
    category: "قاذفات استراتيجية",
    manufacturer: "شيان للطائرات",
    firstFlight: 2025,
    status: "قيد التطوير",
    description:
      "شيان H-20 هي قاذفة شبحية دون سرعة الصوت قيد التطوير في الصين. صممت كجناح طائر بخصائص شبحية مشابهة لبي-2 سبيريت. ستكون H-20 أول قاذفة استراتيجية شبحية مخصصة للصين.",
    specs: {
      maxSpeed: 960,
      maxSpeedUnit: "كم/س",
      range: 8500,
      rangeUnit: "كم",
      serviceCeiling: 15000,
      serviceCeilingUnit: "م",
      endurance: 20,
      enduranceUnit: "ساعة",
      wingspan: 40.0,
      length: 20.0,
      weight: 80000,
      crew: 2,
      stealthRating: 92,
      weaponCapacity: 10000,
      generation: "الجيل الخامس",
    },
    operators: [{ country: "الصين", flag: "🇨🇳", year: 2026 }],
    imageColor: "#0d0d1a",
  },

  // ─── استطلاع واستخبارات ─────────────────────────────────────────────
  {
    id: "u2",
    name: "U-2 Dragon Lady",
    imageUrl: "/images/aircraft/u2.png",
    designation: "U-2S",
    nato: "غير متاح",
    category: "استطلاع واستخبارات",
    manufacturer: "لوكيهيد مارتن",
    firstFlight: 1955,
    status: "نشطة",
    description:
      "لوكيهيد يو-2 هي طائرة استطلاع ذات محرك نفاث واحد وتطير على ارتفاعات عالية، تديرها القوات الجوية الأمريكية. توفر جمع معلومات استخباراتية في جميع الأحوال الجوية وعلى مدار الساعة، وهي في الخدمة المستمرة منذ عام 1955.",
    specs: {
      maxSpeed: 805,
      maxSpeedUnit: "كم/س",
      range: 10300,
      rangeUnit: "كم",
      serviceCeiling: 21336,
      serviceCeilingUnit: "م",
      endurance: 12,
      enduranceUnit: "ساعة",
      wingspan: 31.39,
      length: 19.2,
      weight: 18600,
      crew: 1,
      stealthRating: 15,
      weaponCapacity: 0,
      generation: "الحرب الباردة",
    },
    operators: [{ country: "الولايات المتحدة", flag: "🇺🇸", year: 1957 }],
    imageColor: "#1a1a2e",
  },
  {
    id: "sr71",
    name: "SR-71 Blackbird",
    imageUrl: "/images/aircraft/sr71.png",
    designation: "SR-71A",
    nato: "غير متاح",
    category: "استطلاع واستخبارات",
    manufacturer: "لوكيهيد سكونك ووركس",
    firstFlight: 1964,
    status: "متقاعدة",
    description:
      "لوكيهيد إس آر-71 بلاك بيرد هي طائرة استطلاع استراتيجية بعيدة المدى وتطير على ارتفاعات عالية، وصلت سرعتها إلى ما فوق ماخ 3، كانت تديرها القوات الجوية الأمريكية. تظل أسرع طائرة مأهولة تعمل بمحرك تنفس هوائي بنيت على الإطلاق.",
    specs: {
      maxSpeed: 3540,
      maxSpeedUnit: "كم/س",
      range: 5400,
      rangeUnit: "كم",
      serviceCeiling: 25929,
      serviceCeilingUnit: "م",
      endurance: 5.5,
      enduranceUnit: "ساعة",
      wingspan: 16.94,
      length: 32.74,
      weight: 78000,
      crew: 2,
      stealthRating: 40,
      weaponCapacity: 0,
      generation: "الحرب الباردة",
    },
    operators: [{ country: "الولايات المتحدة", flag: "🇺🇸", year: 1966 }],
    imageColor: "#0d0d1a",
  },
  {
    id: "globalHawk",
    name: "RQ-4 Global Hawk",
    imageUrl: "/images/aircraft/globalHawk.png",
    designation: "RQ-4B",
    nato: "غير متاح",
    category: "استطلاع واستخبارات",
    manufacturer: "نورثروب جرومان",
    firstFlight: 1998,
    status: "نشطة",
    description:
      "نورثروب جرومان إر كيو-4 غلوبال هوك هي طائرة بدون طيار تستخدم للمراقبة على ارتفاعات عالية وقدرة تحمل طويلة. يمكنها مسح ما يصل إلى 100,000 كيلومتر مربع من التضاريس يومياً وتوفر معلومات استخباراتية في الوقت الفعلي تقريباً.",
    specs: {
      maxSpeed: 629,
      maxSpeedUnit: "كم/س",
      range: 22780,
      rangeUnit: "كم",
      serviceCeiling: 18288,
      serviceCeilingUnit: "م",
      endurance: 34,
      enduranceUnit: "ساعة",
      wingspan: 39.9,
      length: 14.5,
      weight: 14628,
      crew: 0,
      stealthRating: 20,
      weaponCapacity: 0,
      generation: "حديثة",
    },
    operators: [
      { country: "الولايات المتحدة", flag: "🇺🇸", year: 2001 },
      { country: "اليابان", flag: "🇯🇵", year: 2015 },
      { country: "كوريا الجنوبية", flag: "🇰🇷", year: 2019 },
    ],
    imageColor: "#162447",
  },
  {
    id: "rc135",
    name: "RC-135 Rivet Joint",
    imageUrl: "/images/aircraft/rc135.png",
    designation: "RC-135V/W",
    nato: "غير متاح",
    category: "استطلاع واستخبارات",
    manufacturer: "بوينغ",
    firstFlight: 1961,
    status: "نشطة",
    description:
      "بوينغ آر سي-135 هي عائلة من طائرات الاستطلاع الكبيرة التي تستخدمها القوات الجوية الأمريكية والقوات الجوية الملكية. توفر نسخة ريفيت جوينت دعماً للحرب الإلكترونية في الوقت الفعلي تقريباً للمستهلكين على مستوى المسرح والمستوى الوطني.",
    specs: {
      maxSpeed: 933,
      maxSpeedUnit: "كم/س",
      range: 5200,
      rangeUnit: "كم",
      serviceCeiling: 12500,
      serviceCeilingUnit: "م",
      endurance: 11,
      enduranceUnit: "ساعة",
      wingspan: 39.88,
      length: 41.53,
      weight: 146000,
      crew: 32,
      stealthRating: 5,
      weaponCapacity: 0,
      generation: "الحرب الباردة",
    },
    operators: [
      { country: "الولايات المتحدة", flag: "🇺🇸", year: 1964 },
      { country: "المملكة المتحدة", flag: "🇬🇧", year: 2013 },
    ],
    imageColor: "#1b1b3a",
  },

  // ─── طائرات بدون طيار قتالية ───────────────────────────────────────────
  {
    id: "mq9",
    name: "MQ-9 Reaper",
    imageUrl: "/images/aircraft/mq9.png",
    designation: "MQ-9A",
    nato: "غير متاح",
    category: "طائرات بدون طيار قتالية",
    manufacturer: "جنرال أتوميكس",
    firstFlight: 2001,
    status: "نشطة",
    description:
      "جنرال أتوميكس إم كيو-9 ريبر هي طائرة بدون طيار قادرة على الطيران عن بعد أو بشكل مستقل. وهي أول طائرة بدون طيار صيادة-قاتلة مصممة للمراقبة طويلة الأمد على ارتفاعات عالية مع حمل ذخائر ضرب دقيقة.",
    specs: {
      maxSpeed: 482,
      maxSpeedUnit: "كم/س",
      range: 1850,
      rangeUnit: "كم",
      serviceCeiling: 15240,
      serviceCeilingUnit: "م",
      endurance: 27,
      enduranceUnit: "ساعة",
      wingspan: 20.12,
      length: 11.0,
      weight: 4760,
      crew: 0,
      stealthRating: 15,
      weaponCapacity: 1700,
      generation: "حديثة",
    },
    operators: [
      { country: "الولايات المتحدة", flag: "🇺🇸", year: 2007 },
      { country: "المملكة المتحدة", flag: "🇬🇧", year: 2007 },
      { country: "فرنسا", flag: "🇫🇷", year: 2014 },
      { country: "إيطاليا", flag: "🇮🇹", year: 2015 },
    ],
    imageColor: "#1a1a2e",
  },
  {
    id: "bayraktar",
    name: "Bayraktar TB2",
    imageUrl: "/images/aircraft/bayraktar.png",
    designation: "TB2",
    nato: "غير متاح",
    category: "طائرات بدون طيار قتالية",
    manufacturer: "بايكار",
    firstFlight: 2014,
    status: "نشطة",
    description:
      "بيرقدار TB2 هي طائرة بدون طيار قتالية تركية متوسطة الارتفاع وطويلة الأمد. تم تصديرها على نطاق واسع وأثبتت كفاءتها القتالية في صراعات متعددة، مما أظهر قدرة فعالة في الحرب غير المتكافئة.",
    specs: {
      maxSpeed: 220,
      maxSpeedUnit: "كم/س",
      range: 150,
      rangeUnit: "كم",
      serviceCeiling: 8230,
      serviceCeilingUnit: "م",
      endurance: 27,
      enduranceUnit: "ساعة",
      wingspan: 12.0,
      length: 6.5,
      weight: 700,
      crew: 0,
      stealthRating: 10,
      weaponCapacity: 150,
      generation: "حديثة",
    },
    operators: [
      { country: "تركيا", flag: "🇹🇷", year: 2015 },
      { country: "أوكرانيا", flag: "🇺🇦", year: 2019 },
      { country: "قطر", flag: "🇶🇦", year: 2018 },
      { country: "أذربيجان", flag: "🇦🇿", year: 2020 },
      { country: "بولندا", flag: "🇵🇱", year: 2022 },
    ],
    imageColor: "#1b2838",
  },
  {
    id: "xq58",
    name: "XQ-58 Valkyrie",
    imageUrl: "/images/aircraft/xq58.png",
    designation: "XQ-58A",
    nato: "غير متاح",
    category: "طائرات بدون طيار قتالية",
    manufacturer: "كراتوس للدفاع",
    firstFlight: 2019,
    status: "قيد التطوير",
    description:
      "كراتوس إكس كيو-58 فالكيري هي طائرة قتالية تجريبية شبحية بدون طيار، صممت لتكون 'جناحاً وفياً' منخفض التكلفة يعمل جنباً إلى جنب مع المقاتلات المأهولة. وتتميز بقدرة إطلاق واسترداد مستقلة عن المدرج.",
    specs: {
      maxSpeed: 1050,
      maxSpeedUnit: "كم/س",
      range: 5556,
      rangeUnit: "كم",
      serviceCeiling: 13716,
      serviceCeilingUnit: "م",
      endurance: 6.5,
      enduranceUnit: "ساعة",
      wingspan: 8.2,
      length: 9.14,
      weight: 2722,
      crew: 0,
      stealthRating: 65,
      weaponCapacity: 272,
      generation: "الجيل القادم",
    },
    operators: [{ country: "الولايات المتحدة", flag: "🇺🇸", year: 2026 }],
    imageColor: "#0f2027",
  },
  {
    id: "s70",
    name: "S-70 Okhotnik-B",
    imageUrl: "/images/aircraft/s70.png",
    designation: "S-70",
    nato: "غير متاح",
    category: "طائرات بدون طيار قتالية",
    manufacturer: "سوخوي",
    firstFlight: 2019,
    status: "قيد التطوير",
    description:
      "سوخوي إس-70 أوخوتنيك-بي هي طائرة قتالية شبحية ثقيلة بدون طيار روسية. صممت كجناح طائر، وتعمل كـ 'جناح وفير' لمقاتلة سو-57 وهي قادرة على مهام الضرب العميق المستقلة.",
    specs: {
      maxSpeed: 1000,
      maxSpeedUnit: "كم/س",
      range: 6000,
      rangeUnit: "كم",
      serviceCeiling: 18000,
      serviceCeilingUnit: "م",
      endurance: 10,
      enduranceUnit: "ساعة",
      wingspan: 19.0,
      length: 14.0,
      weight: 25000,
      crew: 0,
      stealthRating: 75,
      weaponCapacity: 2800,
      generation: "الجيل القادم",
    },
    operators: [{ country: "روسيا", flag: "🇷🇺", year: 2025 }],
    imageColor: "#111827",
  },
];

// ─── أيقونات الفئات ────────────────────────────────────────────────────────
export const categoryIcons: Record<AircraftCategory, string> = {
  "مقاتلات التفوق الجوي": "crosshair",
  "قاذفات استراتيجية": "bomb",
  "استطلاع واستخبارات": "radar",
  "طائرات بدون طيار قتالية": "bot",
};

// ─── بيانات الجدول الزمني ─────────────────────────────────────────────────
export const timelineData: TimelineMilestone[] = [
  {
    year: 1914,
    era: "الحرب العالمية الأولى",
    title: "فجر القتال الجوي",
    description:
      "شهدت الحرب العالمية الأولى أول استخدام للطائرات في القتال. قدمت الطائرات ثنائية الجناحين المبكرة مثل SPAD S.XIII و Fokker Dr.I مفهوم القتال الجوي القريب. كان الاستطلاع هو المهمة الأساسية، لكن المقاتلات تطورت بسرعة لتأمين التفوق الجوي.",
    keyAircraft: "Fokker Dr.I Triplane",
    generation: "الجيل الأول",
  },
  {
    year: 1939,
    era: "الحرب العالمية الثانية",
    title: "عصر المحرك المكبسي",
    description:
      "شهدت الحرب العالمية الثانية قفزات هائلة في تكنولوجيا الطيران. حددت طائرات سوبرمارين سبتفاير، وبي-51 موستانج، وميتسوبيشي زيرو معالم القتال الجوي. أعادت حملات القصف الاستراتيجي بواسطة B-17 Flying Fortress و Avro Lancaster تشكيل عقيدة الحرب بشكل دائم.",
    keyAircraft: "P-51 Mustang",
    generation: "الجيل الثاني",
  },
  {
    year: 1947,
    era: "عصر النفاث",
    title: "كسر حاجز الصوت",
    description:
      "كسر تشاك ييجر حاجز الصوت في طائرة بيل إكس-1. حول عصر النفاث تصميم المقاتلات بطائرات مثل إف-86 سابر وميج-15. أصبحت الأجنحة المرتدة والمحركات ذات الاحتراق اللاحق معياراً، ودخل القتال الجوي عصر ما فوق الصوت.",
    keyAircraft: "Bell X-1 / F-86 Sabre",
    generation: "الجيل الثاني",
  },
  {
    year: 1960,
    era: "الحرب الباردة",
    title: "ماخ 2+ وعصر الصواريخ",
    description:
      "دفعت الحرب الباردة تطوير طيران غير مسبوق. حققت إس آر-71 بلاك بيرد سرعة ماخ 3+، وأصبحت إف-4 فانتوم العمود الفقري للغرب، وحددت قاذفات القنابل العابرة للقارات مثل بي-52 ستراتوفورتريس استراتيجية الردع النووي.",
    keyAircraft: "SR-71 Blackbird",
    generation: "الجيل الثالث",
  },
  {
    year: 1974,
    era: "الجيل الرابع",
    title: "الرشاقة والإلكترونيات",
    description:
      "قدمت مقاتلات الجيل الرابع ضوابط الطيران بالسلك، ورادار النظر لأسفل/الإطلاق لأسفل، والصواريخ خارج نطاق الرؤية. وضعت طائرات إف-15 إيجل، وإف-16 فايتينج فالكون، وسو-27 فلانكر معايير جديدة للمناورة القتالية الجوية.",
    keyAircraft: "F-15 Eagle",
    generation: "الجيل الرابع",
  },
  {
    year: 1989,
    era: "شبحية",
    title: "ثورة التخفي",
    description:
      "أثبتت بي-2 سبيريت وإف-117 نايت هوك تكنولوجيا التخفي في القتال خلال حرب الخليج. غير تصميم التخفي المنخفض حسابات الحرب الجوية بشكل أساسي، مما جعل الدفاعات الجوية التقليدية أقل فعالية.",
    keyAircraft: "F-117 Nighthawk",
    generation: "شبحية",
  },
  {
    year: 2005,
    era: "الجيل الخامس",
    title: "سيادة الجيل الخامس",
    description:
      "دخلت إف-22 رابتور الخدمة كأول مقاتلة جيل خامس عاملة في العالم، تجمع بين التخفي، والسرعة الفائقة، والإلكترونيات المتقدمة، واندماج أجهزة الاستشعار. وتبعتها إف-35 لايتنينج الثانية، مع التركيز على القدرة متعددة المهام والشراكات الدولية.",
    keyAircraft: "F-22 Raptor",
    generation: "الجيل الخامس",
  },
  {
    year: 2020,
    era: "عصر الدرون",
    title: "صعود القتال غير المأهول",
    description:
      "أثبتت الطائرات بدون طيار القتالية مثل إم كيو-9 ريبر وبيرقدار TB2 أنها حاسمة في الصراعات الحديثة. تعيد الأنظمة المستقلة، والقتال المدعوم بالذكاء الاصطناعي، ومفاهيم الجناح الوفي تشكيل مستقبل الحرب الجوية خارج المنصات المأهولة.",
    keyAircraft: "MQ-9 Reaper / Bayraktar TB2",
    generation: "حديثة",
  },
  {
    year: 2030,
    era: "الجيل السادس",
    title: "السيادة الجوية للجيل القادم",
    description:
      "تهدف برامج مثل NGAD و Tempest و FCAS إلى تقديم قدرات الجيل السادس: منصات مأهولة اختيارياً، وأسلحة الطاقة الموجهة، ومساعدي طيارين يعملون بالذكاء الاصطناعي، وأسراب طائرات بدون طيار متكاملة تعمل كنظام قتالي شبكي.",
    keyAircraft: "NGAD / Tempest / FCAS",
    generation: "الجيل السادس",
  },
];

// ─── وظائف مساعدة ──────────────────────────────────────────────────────
export function getAircraftByCategory(
  category: AircraftCategory
): Aircraft[] {
  return aircraftData.filter((a) => a.category === category);
}

export function getAircraftById(id: string): Aircraft | undefined {
  return aircraftData.find((a) => a.id === id);
}

export const categories: AircraftCategory[] = [
  "مقاتلات التفوق الجوي",
  "قاذفات استراتيجية",
  "استطلاع واستخبارات",
  "طائرات بدون طيار قتالية",
];

// أقصى القيم المرجعية لتطبيع المقارنة
export const specMaxValues = {
  maxSpeed: 3600,
  range: 23000,
  serviceCeiling: 26000,
  endurance: 36,
  stealthRating: 100,
  weaponCapacity: 40000,
};
