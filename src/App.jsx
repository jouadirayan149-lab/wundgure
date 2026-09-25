import React, { useState, useEffect } from "react";
import {
  Search,
  Compass,
  CloudSun,
  Activity,
  Loader2,
  Star,
  Share2,
  Menu,
  X,
  TrendingUp,
  Waves,
  Home,
  MapPin,
  Calendar,
  Trash2,
  Navigation,
  Globe,
  Settings,
  AlertTriangle,
} from "lucide-react";

// تحسين البحث عن القرى والدواوير والمناطق الصغيرة في المغرب.
// بعض قواعد البيانات تفهرس الاسم باللاتينية فقط، لذلك نبحث أيضاً بصيغة لاتينية تقريبية.
const MOROCCO_SEARCH_ALIASES = {
  "الغزوة": ["Ghazoua", "Ghazwa"],
  "سميمو": ["Smimou", "Sidi Mbarek Smimou"],
  "شيشاوة": ["Chichaoua"],
};

const arabicToLatinSearch = (value) => {
  const map = {
    "ا":"a","أ":"a","إ":"i","آ":"a","ء":"a","ؤ":"w","ئ":"y",
    "ب":"b","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"dh",
    "ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"d","ط":"t","ظ":"z",
    "ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n",
    "ه":"h","و":"w","ي":"y","ى":"a","ة":"a","پ":"p","ڤ":"v","گ":"g","چ":"ch"
  };
  return String(value || "")
    .split("")
    .map(ch => map[ch] ?? ch)
    .join("")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const buildMoroccoSearchVariants = (query) => {
  const raw = String(query || "").trim();
  if (!raw) return [];
  const variants = [raw];
  const normalized = raw.replace(/^ال/, "");
  if (normalized && normalized !== raw) variants.push(normalized);
  const aliases = MOROCCO_SEARCH_ALIASES[raw] || MOROCCO_SEARCH_ALIASES[normalized] || [];
  variants.push(...aliases);
  const latin = arabicToLatinSearch(raw);
  if (latin && latin !== raw) variants.push(latin);
  return [...new Set(variants.map(v => v.trim()).filter(Boolean))];
};

// قاموس الترجمات للغات المختلفة
const translations = {
  ar: {
    home: "موقعي",
    gps: "موقع GPS",
    searchPlaceholder: "ابحث عن موقع...",
    spots: "المواقع",
    maps: "الخرائط",
    archive: "الأرشيف",
    options: "الإعدادات",
    favorites: "المفضلات:",
    setHome: "تعيين كموقع شخصي",
    currentHome: "موقعك الشخصي الحالي",
    forecast: "التوقعات",
    graph: "الرسم البياني",
    tides: "المد والأمواج",
    earthquakes: "الزلازل",
    share: "مشاركة",
    selectDay: "اختر اليوم:",
    today: "اليوم",
    tomorrow: "غداً",
    windSpeed: "سرعة الرياح",
    windGusts: "هبات الرياح",
    windDir: "اتجاه الرياح",
    waveHeight: "ارتفاع الموج (m)",
    wavePeriod: "فترة الموج (s)",
    waveDir: "اتجاه الموج",
    oceanCurrent: "سرعة التيار المائي",
    currentDir: "اتجاه التيار المائي",
    seaDanger: "مؤشر خطورة البحر",
    pressure: "الضغط الجوي",
    temp: "درجة الحرارة",
    humidity: "الرطوبة",
    clouds: "الغطاء السحابي",
    graphTitle: "رسم بياني لسرعة الرياح والهبات",
    graphDesc: "تطور سرعات الرياح خلال ساعات اليوم المحدد:",
    tidesTitle: "أوقات المد والجزر وحالة الأمواج البحرية",
    tidesDesc: "بيانات ومواعيد حركة المد والجزر التقريبية للموقع الحالي:",
    highTide: "مد مرتفع (High Tide)",
    lowTide: "جزر منخفض (Low Tide)",
    optionsTitle: "خيارات اللغة ووحدات القياس",
    windCompass: "بوصلة الرياح",
    north: "شمال",
    east: "شرق",
    south: "جنوب",
    west: "غرب",
    liveGraph: "الرسم البياني التفاعلي",
    smartAlerts: "تنبيهات الطقس الذكية",
    noAlerts: "لا توجد تنبيهات مهمة حالياً",
    alertStrongWind: "رياح قوية",
    alertGust: "هبات قوية",
    alertWaves: "أمواج مرتفعة",
    alertVisibility: "رؤية ضعيفة",
    alertHeat: "حرارة مرتفعة",
    alertUV: "مؤشر UV مرتفع",
    selectLang: "اختر لغة الموقع المفضلة:",
    selectSpeed: "اختر وحدة قياس سرعة الرياح:",
  },
  en: {
    home: "Home",
    gps: "GPS",
    searchPlaceholder: "Search spot...",
    spots: "Spots",
    maps: "Maps",
    archive: "Archive",
    options: "Options",
    favorites: "Favorites:",
    setHome: "Set as Home Spot",
    currentHome: "Current Home Spot",
    forecast: "Forecast",
    graph: "Graph",
    tides: "Tides & Waves",
    earthquakes: "Earthquakes",
    share: "Share",
    selectDay: "Select Day:",
    today: "Today",
    tomorrow: "Tomorrow",
    windSpeed: "Wind speed",
    windGusts: "Wind gusts",
    windDir: "Wind direction",
    waveHeight: "Wave height (m)",
    wavePeriod: "Wave period (s)",
    waveDir: "Wave direction",
    oceanCurrent: "Ocean Current Speed",
    currentDir: "Current Direction",
    seaDanger: "Sea Danger Rating",
    pressure: "Pressure",
    temp: "Temperature",
    humidity: "Humidity",
    clouds: "Cloud cover",
    graphTitle: "Wind & Gusts Graph",
    graphDesc: "Wind speed development during the selected day:",
    tidesTitle: "Tides & Waves Forecast",
    tidesDesc: "Approximate tides and wave movement data for current location:",
    highTide: "High Tide",
    lowTide: "Low Tide",
    optionsTitle: "Language & Units Options",
    windCompass: "Wind Compass",
    north: "North",
    east: "East",
    south: "South",
    west: "West",
    liveGraph: "Interactive Graph",
    smartAlerts: "Smart Weather Alerts",
    noAlerts: "No important alerts right now",
    alertStrongWind: "Strong wind",
    alertGust: "Strong gusts",
    alertWaves: "High waves",
    alertVisibility: "Low visibility",
    alertHeat: "High temperature",
    alertUV: "High UV index",
    selectLang: "Choose your preferred language:",
    selectSpeed: "Choose wind speed unit:",
  },
  fr: {
    home: "Accueil",
    gps: "GPS",
    searchPlaceholder: "Rechercher un spot...",
    spots: "Spots",
    maps: "Cartes",
    archive: "Archive",
    options: "Options",
    favorites: "Favoris :",
    setHome: "Définir comme favori principal",
    currentHome: "Votre spot principal",
    forecast: "Prévisions",
    graph: "Graphique",
    tides: "Marées & Vagues",
    earthquakes: "Séismes",
    share: "Partager",
    selectDay: "Choisir le jour :",
    today: "Aujourd'hui",
    tomorrow: "Demain",
    windSpeed: "Vitesse du vent",
    windGusts: "Rafales",
    windDir: "Direction du vent",
    waveHeight: "Hauteur des vagues (m)",
    wavePeriod: "Période des vagues (s)",
    waveDir: "Direction des vagues",
    oceanCurrent: "Courant marin",
    currentDir: "Direction du courant",
    seaDanger: "Indice de danger mer",
    pressure: "Pression",
    temp: "Température",
    humidity: "Humidité",
    clouds: "Nébulosité",
    graphTitle: "Graphique du Vent et des Rafales",
    graphDesc: "Évolution de la vitesse du vent pour la journée :",
    tidesTitle: "Prévisions des Marées et Vagues",
    tidesDesc: "Données approximatives des marées pour l'emplacement actuel :",
    highTide: "Marée Haute",
    lowTide: "Marée Basse",
    optionsTitle: "Options de Langue et d'Unités",
    windCompass: "Boussole du vent",
    north: "Nord",
    east: "Est",
    south: "Sud",
    west: "Ouest",
    liveGraph: "Graphique interactif",
    smartAlerts: "Alertes météo intelligentes",
    noAlerts: "Aucune alerte importante actuellement",
    alertStrongWind: "Vent fort",
    alertGust: "Fortes rafales",
    alertWaves: "Vagues élevées",
    alertVisibility: "Faible visibilité",
    alertHeat: "Température élevée",
    alertUV: "Indice UV élevé",
    selectLang: "Choisissez votre langue préférée :",
    selectSpeed: "Choisissez l'unité de vitesse du vent :",
  },
};

// لائحة المدن المغربية المعروضة في قسم "مدن المغرب" في أسفل الموقع.
const MOROCCO_CITIES = [
    "أگادير",
    "أكدز",
    "آيت باها",
    "آيت أورير",
    "أکنول",
    "الحسيمة",
    "أمزميز",
    "أرفود",
    "أصيلة",
    "أزمور",
    "أزيلال",
    "أزرو",
    "عين بني مطهر",
    "آيت ملول",
    "بن جرير",
    "بني ملال",
    "بن سليمان",
    "بركان",
    "برشيد",
    "بيوكرى",
    "بني تجيت",
    "بوعنان",
    "بوعرفة",
    "بوذنيب",
    "بويزكارن",
    "بوجدور",
    "بومالن دادس",
    "بوسكورة",
    "الدار البيضاء",
    "شفشاون",
    "شيشاوة",
    "الداخلة",
    "دار بوعزة",
    "الدشيرة الجهادية",
    "دبدو",
    "دمنات",
    "الشماعية",
    "الحاجب",
    "الجديدة",
    "الريش",
    "الرشيدية",
    "الصويرة",
    "فاس",
    "فكيك",
    "الفقيه بن صالح",
    "فم الجمعة",
    "كلميمة",
    "كلميم",
    "جرسيف",
    "إفران",
    "إمنتانوت",
    "إنزگان",
    "قلعة مكونة",
    "قلعة السراغنة",
    "القنيطرة",
    "الخميسات",
    "خنيفرة",
    "خريبكة",
    "القصر الكبير",
    "العيون",
    "الكويرة",
    "العرائش",
    "مراكش",
    "ماسّة",
    "مكناس",
    "مليليه",
    "ميضار",
    "ميدلت",
    "ميسور",
    "المحمدية",
    "الناظور",
    "ورزازات",
    "واد زم",
    "وزان",
    "وجدة",
    "أولاد تايمة",
    "الرباط",
    "الريصاني",
    "الرماني",
    "آسفي",
    "سلا",
    "سبت جزولة",
    "صفرو",
    "سطات",
    "سيدي الزوين",
    "سيدي بنّور",
    "سيدي بوعثمان",
    "سيدي مختار",
    "سيدي إيفني",
    "سيدي قاسم",
    "سيدي رحُال",
    "سيدي سليمان",
    "سكورة",
    "السمارة",
    "سوق الأربعاء",
    "أولاد النمة",
    "تافراوت",
    "تحناوت",
    "تالوين",
    "تالسينت",
    "تامنار",
    "تملالت",
    "طانطان",
    "طنجة",
    "تاونات",
    "تاوريرت",
    "طرفاية",
    "تارجيست",
    "تارودانت",
    "طاطا",
    "تازة",
    "تمارة",
    "تندرارة",
    "تطوان",
    "تنجداد",
    "تنغير",
    "تزنيت",
    "اليوسفية",
    "زاكورة",
    "زايو"
];


// إحداثيات ثابتة للمدن المغربية المعروضة في القسم السفلي.
// هذا يمنع اختفاء الإحصائيات بسبب اختلاف كتابة اسم المدينة في خدمات الـGeocoding.
const MOROCCO_CITY_COORDS = {
  "أگادير": [30.4278, -9.5981], "أكدز": [30.6936, -6.4466], "آيت باها": [30.0693, -9.1521], "آيت أورير": [31.5644, -7.6628],
  "أکنول": [34.6496, -3.8631], "الحسيمة": [35.2517, -3.9372], "أمزميز": [31.2167, -8.2500], "أرفود": [31.4340, -4.2320],
  "أصيلة": [35.4653, -6.0342], "أزمور": [33.2895, -8.3420], "أزيلال": [31.9669, -6.5694], "أزرو": [33.4344, -5.2213],
  "عين بني مطهر": [34.0889, -2.0247], "آيت ملول": [30.3342, -9.4972], "بن جرير": [32.2300, -7.9500], "بني ملال": [32.3394, -6.3608],
  "بن سليمان": [33.6200, -7.1300], "بركان": [34.9200, -2.3200], "برشيد": [33.2650, -7.5870], "بيوكرى": [30.2130, -9.3690],
  "بني تجيت": [32.2833, -3.4833], "بوعنان": [32.0275, -3.0400], "بوعرفة": [32.5330, -1.9640], "بوذنيب": [31.9500, -3.6100],
  "بويزكارن": [29.2030, -9.3700], "بوجدور": [26.1250, -14.4840], "بومالن دادس": [31.3725, -5.9950], "بوسكورة": [33.4500, -7.6500],
  "الدار البيضاء": [33.5731, -7.5898], "شفشاون": [35.1688, -5.2636], "شيشاوة": [31.5430, -8.7600], "الداخلة": [23.6848, -15.9579],
  "دار بوعزة": [33.5300, -7.8500], "الدشيرة الجهادية": [30.5500, -9.7000], "دبدو": [33.9830, -3.0400], "دمنات": [31.7300, -7.0050],
  "الشماعية": [32.0510, -8.4000], "الحاجب": [33.6870, -5.3710], "الجديدة": [33.2316, -8.5007], "الريش": [32.8180, -4.4890],
  "الرشيدية": [31.9314, -4.4240], "الصويرة": [31.5125, -9.7700], "فاس": [34.0331, -5.0003], "فكيك": [32.1080, -1.2290],
  "الفقيه بن صالح": [32.5020, -6.6900], "فم الجمعة": [32.2180, -6.7230], "كلميمة": [31.6800, -4.8200], "كلميم": [28.9870, -10.0570],
  "جرسيف": [34.2250, -3.3530], "إفران": [33.5228, -5.1100], "إمنتانوت": [31.1770, -8.8440], "إنزگان": [30.3550, -9.5370],
  "قلعة مكونة": [31.2450, -6.0600], "قلعة السراغنة": [32.0570, -7.4050], "القنيطرة": [34.2610, -6.5802], "الخميسات": [33.8240, -6.0660],
  "خنيفرة": [32.9390, -5.6680], "خريبكة": [32.8850, -6.9060], "القصر الكبير": [35.0000, -5.9000], "العيون": [27.1536, -13.2033],
  "الكويرة": [21.5000, -17.0500], "العرائش": [35.1932, -6.1557], "مراكش": [31.6295, -7.9811], "ماسّة": [30.0041, -9.6375],
  "مكناس": [33.8935, -5.5473], "مليليه": [35.2923, -2.9381], "ميضار": [34.9400, -3.5300], "ميدلت": [32.6850, -4.7450],
  "ميسور": [33.0470, -4.9920], "المحمدية": [33.6861, -7.3830], "الناظور": [35.1681, -2.9335], "ورزازات": [30.9335, -6.9370],
  "واد زم": [32.8627, -6.5736], "وزان": [34.7958, -5.5785], "وجدة": [34.6814, -1.9086], "أولاد تايمة": [30.3940, -9.2080],
  "الرباط": [34.0133, -6.8326], "الريصاني": [31.2800, -4.2700], "الرماني": [33.5280, -6.6070], "آسفي": [32.2994, -9.2372],
  "سلا": [34.0531, -6.7985], "سبت جزولة": [32.8620, -9.1800], "صفرو": [33.8300, -4.8350], "سطات": [33.0010, -7.6200],
  "سيدي الزوين": [31.5700, -8.9600], "سيدي بنّور": [32.6500, -8.4300], "سيدي بوعثمان": [31.9000, -8.9700], "سيدي مختار": [31.5500, -9.3000],
  "سيدي إيفني": [29.3800, -10.1700], "سيدي قاسم": [34.2200, -5.7000], "سيدي رحُال": [33.4900, -7.4700], "سيدي سليمان": [34.2600, -5.9300],
  "سكورة": [31.0630, -6.5500], "السمارة": [26.7384, -11.6719], "سوق الأربعاء": [34.6850, -5.7100], "أولاد النمة": [32.3000, -6.6800],
  "تافراوت": [29.7200, -8.9700], "تحناوت": [31.3620, -8.0880], "تالوين": [30.5290, -7.9250], "تالسينت": [32.5300, -2.6800],
  "تامنار": [31.0800, -9.7100], "تملالت": [31.7300, -8.1400], "طانطان": [28.4380, -11.1030], "طنجة": [35.7673, -5.7998],
  "تاونات": [34.5360, -4.6400], "تاوريرت": [34.4070, -2.8930], "طرفاية": [27.9400, -12.9260], "تارجيست": [34.9370, -4.3180],
  "تارودانت": [30.4700, -8.8800], "طاطا": [29.7450, -7.9700], "تازة": [34.2130, -4.0100], "تمارة": [33.9287, -6.9066],
  "تندرارة": [34.7800, -2.0000], "تطوان": [35.5785, -5.3684], "تنجداد": [31.5150, -5.5300], "تنغير": [31.5150, -5.5320],
  "تزنيت": [29.6974, -9.7316], "اليوسفية": [32.2460, -8.5300], "زاكورة": [30.3300, -5.8400], "زايو": [34.9420, -2.7320]
};

const MOROCCO_CITY_FRENCH = {
  "أگادير": "Agadir", "أكدز": "Agdz", "آيت باها": "Ait Baha", "آيت أورير": "Ait Ourir", "أکنول": "Aknoul",
  "الحسيمة": "Al Hoceima", "أمزميز": "Amizmiz", "أرفود": "Erfoud", "أصيلة": "Asilah", "أزمور": "Azemmour",
  "أزيلال": "Azilal", "أزرو": "Azrou", "عين بني مطهر": "Ain Beni Mathar", "آيت ملول": "Ait Melloul", "بن جرير": "Ben Guerir",
  "بني ملال": "Beni Mellal", "بن سليمان": "Benslimane", "بركان": "Berkane", "برشيد": "Berrechid", "بيوكرى": "Biougra",
  "بني تجيت": "Beni Tajjite", "بوعنان": "Bouanane", "بوعرفة": "Bouarfa", "بوذنيب": "Boudnib", "بويزكارن": "Bouizakarne",
  "بوجدور": "Boujdour", "بومالن دادس": "Boumalne Dades", "بوسكورة": "Bouskoura", "الدار البيضاء": "Casablanca", "شفشاون": "Chefchaouen",
  "شيشاوة": "Chichaoua", "الداخلة": "Dakhla", "دار بوعزة": "Dar Bouazza", "الدشيرة الجهادية": "Dcheira", "دبدو": "Debdou",
  "دمنات": "Demnate", "الشماعية": "Chemaia", "الحاجب": "El Hajeb", "الجديدة": "El Jadida", "الريش": "Er-Rich",
  "الرشيدية": "Errachidia", "الصويرة": "Essaouira", "فاس": "Fes", "فكيك": "Figuig", "الفقيه بن صالح": "Fquih Ben Salah",
  "فم الجمعة": "Foum Jemaa", "كلميمة": "Goulmima", "كلميم": "Guelmim", "جرسيف": "Guercif", "إفران": "Ifrane",
  "إمنتانوت": "Imintanoute", "إنزگان": "Inezgane", "قلعة مكونة": "Kalaat M'Gouna", "قلعة السراغنة": "El Kelaa des Sraghna", "القنيطرة": "Kenitra",
  "الخميسات": "Khemisset", "خنيفرة": "Khenifra", "خريبكة": "Khouribga", "القصر الكبير": "Ksar El Kebir", "العيون": "Laayoune",
  "الكويرة": "Lagouira", "العرائش": "Larache", "مراكش": "Marrakech", "ماسّة": "Massa", "مكناس": "Meknes",
  "مليليه": "Melilla", "ميضار": "Midar", "ميدلت": "Midelt", "ميسور": "Missour", "المحمدية": "Mohammedia",
  "الناظور": "Nador", "ورزازات": "Ouarzazate", "واد زم": "Oued Zem", "وزان": "Ouazzane", "وجدة": "Oujda",
  "أولاد تايمة": "Ouled Teima", "الرباط": "Rabat", "الريصاني": "Rissani", "الرماني": "Rommani", "آسفي": "Safi",
  "سلا": "Sale", "سبت جزولة": "Sebt Gzoula", "صفرو": "Sefrou", "سطات": "Settat", "سيدي الزوين": "Sidi Zouine",
  "سيدي بنّور": "Sidi Bennour", "سيدي بوعثمان": "Sidi Bou Othmane", "سيدي مختار": "Sidi Mokhtar", "سيدي إيفني": "Sidi Ifni", "سيدي قاسم": "Sidi Kacem",
  "سيدي رحُال": "Sidi Rahhal", "سيدي سليمان": "Sidi Slimane", "سكورة": "Skoura", "السمارة": "Smara", "سوق الأربعاء": "Souk El Arbaa",
  "أولاد النمة": "Ouled Nemma", "تافراوت": "Tafraoute", "تحناوت": "Tahannaout", "تالوين": "Taliouine", "تالسينت": "Talsint",
  "تامنار": "Tamanar", "تملالت": "Tamallalt", "طانطان": "Tan-Tan", "طنجة": "Tangier", "تاونات": "Taounate", "تاوريرت": "Taourirt",
  "طرفاية": "Tarfaya", "تارجيست": "Targuist", "تارودانت": "Taroudant", "طاطا": "Tata", "تازة": "Taza", "تمارة": "Temara",
  "تندرارة": "Tendrara", "تطوان": "Tetouan", "تنجداد": "Tingdad", "تنغير": "Tinghir", "تزنيت": "Tiznit", "اليوسفية": "Youssoufia",
  "زاكورة": "Zagora", "زايو": "Zaio"
};

const normalizeCitySearch = (value) => String(value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[’'`]/g, "")
  .replace(/[^\p{L}\p{N}]+/gu, " ")
  .trim()
  .toLocaleLowerCase();

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [moroccoCityQuery, setMoroccoCityQuery] = useState("");
  const [moroccoWeather, setMoroccoWeather] = useState({});
  const [moroccoWeatherLoading, setMoroccoWeatherLoading] = useState(false);

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchSuggestionsLoading, setSearchSuggestionsLoading] = useState(false);
  const [locationName, setLocationName] = useState("Morocco - Casablanca");
  const [coords, setCoords] = useState({
    lat: 33.5731,
    lon: -7.5898,
  });

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("forecast");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [liveSecond, setLiveSecond] = useState(0);
  const [graphHover, setGraphHover] = useState(null);

  const [speedUnit, setSpeedUnit] = useState(() => {
    try {
      return localStorage.getItem("wg_speed_unit") || "kn";
    } catch (e) {
      return "kn";
    }
  });
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("wg_language") || "ar";
    } catch (e) {
      return "ar";
    }
  });

  const t = translations[lang] || translations.ar;
  const isRtl = lang === "ar";

  // حفظ اللغة ووحدة سرعة الرياح تلقائياً في المتصفح
  useEffect(() => {
    try {
      localStorage.setItem("wg_language", lang);
    } catch (e) {}
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem("wg_speed_unit", speedUnit);
    } catch (e) {}
  }, [speedUnit]);

  // حركة Live تتحدث كل ثانية بدون إرسال طلب API كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveSecond((value) => value + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedMoroccoCity, setSelectedMoroccoCity] = useState(null);

  const [archive, setArchive] = useState(() => {
    try {
      const saved = localStorage.getItem("wg_archive");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const addToArchive = (spot) => {
    if (!spot?.name || !Number.isFinite(Number(spot.lat)) || !Number.isFinite(Number(spot.lon))) return;
    const item = { name: spot.name, lat: Number(spot.lat), lon: Number(spot.lon), time: Date.now() };
    setArchive((prev) => {
      const filtered = prev.filter((x) => x.name !== item.name);
      const updated = [item, ...filtered].slice(0, 20);
      try { localStorage.setItem("wg_archive", JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const clearArchive = () => {
    setArchive([]);
    try { localStorage.removeItem("wg_archive"); } catch (e) {}
  };

  const [homeSpot, setHomeSpot] = useState(() => {
    try {
      const saved = localStorage.getItem("wg_home_spot");
      return saved
        ? JSON.parse(saved)
        : { name: "Morocco - Casablanca", lat: 33.5731, lon: -7.5898 };
    } catch (e) {
      return { name: "Morocco - Casablanca", lat: 33.5731, lon: -7.5898 };
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("wg_favorites");
      return saved
        ? JSON.parse(saved)
        : [
            { name: "Morocco - Casablanca", lat: 33.5731, lon: -7.5898 },
            { name: "Morocco - Dakhla", lat: 23.6848, lon: -15.9579 },
            { name: "Morocco - Tangier", lat: 35.7595, lon: -5.834 },
          ];
    } catch (e) {
      return [
        { name: "Morocco - Casablanca", lat: 33.5731, lon: -7.5898 },
      ];
    }
  });

  const isFavorite = favorites.some((fav) => fav.name === locationName);
  const isHomeSpot = homeSpot.name === locationName;

  const toggleFavorite = () => {
    let updated;
    if (isFavorite) {
      updated = favorites.filter((fav) => fav.name !== locationName);
    } else {
      updated = [
        ...favorites,
        {
          name: locationName,
          lat: coords.lat,
          lon: coords.lon,
        },
      ];
    }
    setFavorites(updated);
    try {
      localStorage.setItem("wg_favorites", JSON.stringify(updated));
    } catch (e) {}
  };

  const removeFavoriteByName = (e, nameToRemove) => {
    e.stopPropagation();
    const updated = favorites.filter((fav) => fav.name !== nameToRemove);
    setFavorites(updated);
    try {
      localStorage.setItem("wg_favorites", JSON.stringify(updated));
    } catch (e) {}
  };

  const setAsHomeSpot = () => {
    const newHome = { name: locationName, lat: coords.lat, lon: coords.lon };
    setHomeSpot(newHome);
    try {
      localStorage.setItem("wg_home_spot", JSON.stringify(newHome));
      alert(`تم تعيين "${locationName}" كـ موقع شخصي رئيسي بنجاح! 🏠`);
    } catch (e) {}
  };

  const goToHomeSpot = () => {
    setCoords({ lat: homeSpot.lat, lon: homeSpot.lon });
    setLocationName(homeSpot.name);
    setSelectedDayIndex(0);
    addToArchive(homeSpot);
    fetchWeather(homeSpot.lat, homeSpot.lon);
  };

  const getGpsLocation = () => {
    if (!navigator.geolocation) {
      alert("GPS is not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoords({ lat, lon });
        const gpsName = `My GPS (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
        setLocationName(gpsName);
        setSelectedDayIndex(0);
        addToArchive({ name: gpsName, lat, lon });
        await fetchWeather(lat, lon);
      },
      (error) => {
        setLoading(false);
        alert("Unable to retrieve your GPS location.");
      },
      { enableHighAccuracy: true }
    );
  };

  // دالة جلب الطقس والأمواج والتيارات المائية بالتزامن
  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      // 1. جلب بيانات الطقس والرياح
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_gusts_10m,wind_direction_10m,cloud_cover,uv_index,visibility&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_gusts_10m,wind_direction_10m,cloud_cover,uv_index,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,sunrise,sunset&forecast_days=15&wind_speed_unit=${speedUnit}&timezone=auto`
      );
      const data = await weatherRes.json();

      // 2. جلب بيانات البحر، الأمواج، والتيارات المائية وسط الماء
      try {
        const marineRes = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_period,wave_direction,ocean_current_velocity,ocean_current_direction,sea_surface_temperature&timezone=auto`
        );
        const marineData = await marineRes.json();

        if (marineData && marineData.hourly) {
          data.hourly.wave_height = marineData.hourly.wave_height;
          data.hourly.wave_period = marineData.hourly.wave_period;
          data.hourly.wave_direction = marineData.hourly.wave_direction;
          data.hourly.ocean_current_velocity = marineData.hourly.ocean_current_velocity;
          data.hourly.ocean_current_direction = marineData.hourly.ocean_current_direction;
          data.hourly.sea_surface_temperature = marineData.hourly.sea_surface_temperature;
        }
      } catch (marineErr) {
        console.warn("Marine API warning:", marineErr);
      }

      setWeatherData(data);
    } catch (err) {
      console.error("Weather error:", err);
    } finally {
      setLoading(false);
    }
  };

  // جلب الطقس عند تغيير الموقع/الوحدة، ثم تحديث البيانات تلقائياً كل 5 دقائق.
  // هذا يضمن أن بطاقة "الآن" لا تبقى على قراءة قديمة.
  useEffect(() => {
    let cancelled = false;

    const refreshWeather = async () => {
      if (!cancelled) {
        await fetchWeather(coords.lat, coords.lon);
      }
    };

    refreshWeather();
    const interval = setInterval(refreshWeather, 5 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [coords.lat, coords.lon, speedUnit]);

  // اقتراحات البحث أثناء الكتابة: نستعمل Open-Meteo + Nominatim معاً،
  // لأن Open-Meteo ممتاز للمدن لكنه قد لا يعيد القرى والدواوير والمناطق الصغيرة.
  useEffect(() => {
    const query = searchQuery.trim();

    if (query.length < 2) {
      setSearchSuggestions([]);
      setSearchSuggestionsLoading(false);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        setSearchSuggestionsLoading(true);

        const language = lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en";
        const encodedQuery = encodeURIComponent(query);

        const searchVariants = buildMoroccoSearchVariants(query);
        const openMeteoRequests = searchVariants.map((variant) =>
          fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(variant + ", Morocco")}&count=50&language=${language}&countryCode=MA&format=json`
          ).then((res) => res.json())
        );
        const nominatimRequests = searchVariants.map((variant) =>
          fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=40&countrycodes=ma&accept-language=${language},ar,en&q=${encodeURIComponent(variant)}`
          ).then((res) => res.json())
        );
        const [openMeteoResults, nominatimResults] = await Promise.all([
          Promise.allSettled(openMeteoRequests),
          Promise.allSettled(nominatimRequests),
        ]);

        if (cancelled) return;

        const combined = [];

        openMeteoResults.forEach((openMeteoResult) => {
          if (openMeteoResult.status !== "fulfilled") return;
          const items = Array.isArray(openMeteoResult.value?.results)
            ? openMeteoResult.value.results
            : [];

          items.forEach((item) => {
            const latitude = Number(item.latitude);
            const longitude = Number(item.longitude);
            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;

            combined.push({
              id: `om-${item.id || `${latitude}-${longitude}`}`,
              latitude,
              longitude,
              name: item.name || query,
              country: item.country || "",
              country_code: item.country_code || "",
              admin1: item.admin1 || "",
              type: item.feature_code || item.type || "",
              source: "open-meteo",
            });
          });
        });

        nominatimResults.forEach((nominatimResult) => {
          if (nominatimResult.status !== "fulfilled") return;
          const items = Array.isArray(nominatimResult.value)
            ? nominatimResult.value
            : [];

          items.forEach((place, index) => {
            const latitude = Number(place.lat);
            const longitude = Number(place.lon);
            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;

            const address = place.address || {};
            const name =
              place.name ||
              address.village ||
              address.town ||
              address.city ||
              address.municipality ||
              address.hamlet ||
              address.suburb ||
              address.neighbourhood ||
              query;
            const placeType =
              place.type ||
              place.addresstype ||
              (address.village ? "village" : address.hamlet ? "hamlet" : address.town ? "town" : "place");

            combined.push({
              id: `nom-${place.osm_type || "place"}-${place.osm_id || index}-${latitude}-${longitude}`,
              latitude,
              longitude,
              name,
              country: address.country || "",
              country_code: address.country_code || "",
              admin1: address.state || address.region || address.province || "",
              type: placeType,
              source: "nominatim",
            });
          });
        });

        // إزالة النتائج المتكررة حسب الاسم + الإحداثيات التقريبية.
        const unique = new Map();
        combined.forEach((item) => {
          const key = `${String(item.name).trim().toLocaleLowerCase()}|${item.latitude.toFixed(3)}|${item.longitude.toFixed(3)}`;
          if (!unique.has(key)) unique.set(key, item);
        });

        const q = query.toLocaleLowerCase();
        const sorted = Array.from(unique.values()).sort((a, b) => {
          const aName = String(a.name || "").toLocaleLowerCase();
          const bName = String(b.name || "").toLocaleLowerCase();

          // أولوية للاسم الذي يبدأ بما كتبه المستخدم، ثم الذي يحتوي عليه.
          const aStarts = aName.startsWith(q) ? 0 : aName.includes(q) ? 1 : 2;
          const bStarts = bName.startsWith(q) ? 0 : bName.includes(q) ? 1 : 2;
          if (aStarts !== bStarts) return aStarts - bStarts;

          return aName.localeCompare(bName, lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en");
        });

        // نعطي مساحة أكبر للقرى والدواوير والمناطق الصغيرة.
        setSearchSuggestions(sorted.slice(0, 20));
      } catch (err) {
        if (!cancelled) {
          console.warn("Search suggestions warning:", err);
          setSearchSuggestions([]);
        }
      } finally {
        if (!cancelled) setSearchSuggestionsLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery, lang]);

  const selectSearchSuggestion = async (spot) => {
    const lat = Number(spot.latitude);
    const lon = Number(spot.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

    const city = spot.name || searchQuery.trim();
    const country = spot.country || "";
    const name = country ? `${country} - ${city}` : city;

    setSearchQuery("");
    setSearchSuggestions([]);
    setCoords({ lat, lon });
    setLocationName(name);
    setSelectedDayIndex(0);
    addToArchive({ name, lat, lon });
    await fetchWeather(lat, lon);
  };

  const selectMoroccoCity = async (cityName) => {
    const query = String(cityName || "").trim();
    if (!query) return;

    setSelectedMoroccoCity(query);
    setSelectedDayIndex(0);

    const coordsPair = MOROCCO_CITY_COORDS[query];
    if (Array.isArray(coordsPair) && coordsPair.length === 2) {
      const lat = Number(coordsPair[0]);
      const lon = Number(coordsPair[1]);
      const name = lang === "fr" ? (MOROCCO_CITY_FRENCH[query] || query) : query;
      setLoading(true);
      try {
        setCoords({ lat, lon });
        setLocationName(`Morocco - ${name}`);
        setSelectedDayIndex(0);
        setMoroccoCityQuery("");
        addToArchive({ name: `Morocco - ${name}`, lat, lon });
        await fetchWeather(lat, lon);
      } finally {
        setLoading(false);
      }
      return;
    }

    // احتياط إضافي إذا أضيفت مدينة جديدة ولم تكن لها إحداثيات ثابتة.
    setLoading(true);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=${lang}&format=json`
      );
      const data = await res.json();
      const results = Array.isArray(data.results) ? data.results : [];
      const result = results.find((item) => String(item.country_code || "").toUpperCase() === "MA") || results[0];
      if (!result || !Number.isFinite(Number(result.latitude)) || !Number.isFinite(Number(result.longitude))) throw new Error("City not found");
      await selectSearchSuggestion({ latitude: Number(result.latitude), longitude: Number(result.longitude), name: result.name || query, country: result.country || "Morocco" });
      setMoroccoCityQuery("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.warn("Morocco city selection warning:", err);
      alert(isRtl ? `لم يتم العثور على مدينة: ${query}` : lang === "fr" ? `Ville introuvable : ${query}` : `City not found: ${query}`);
    } finally {
      setLoading(false);
    }
  };

  // حالة الطقس حسب weather_code من Open-Meteo
  const getMoroccoWeatherInfo = (code) => {
    const weatherMap = {
      0:  { icon: "☀️", ar: "صافي", en: "Clear", fr: "Dégagé" },
      1:  { icon: "🌤️", ar: "صافي غالباً", en: "Mainly clear", fr: "Plutôt dégagé" },
      2:  { icon: "⛅", ar: "غائم جزئياً", en: "Partly cloudy", fr: "Partiellement nuageux" },
      3:  { icon: "☁️", ar: "غائم", en: "Overcast", fr: "Couvert" },
      45: { icon: "🌫️", ar: "ضباب", en: "Fog", fr: "Brouillard" },
      48: { icon: "🌫️", ar: "ضباب كثيف", en: "Rime fog", fr: "Brouillard givrant" },
      51: { icon: "🌦️", ar: "رذاذ خفيف", en: "Light drizzle", fr: "Bruine légère" },
      53: { icon: "🌦️", ar: "رذاذ متوسط", en: "Moderate drizzle", fr: "Bruine modérée" },
      55: { icon: "🌧️", ar: "رذاذ قوي", en: "Dense drizzle", fr: "Forte bruine" },
      61: { icon: "🌧️", ar: "مطر خفيف", en: "Light rain", fr: "Pluie légère" },
      63: { icon: "🌧️", ar: "مطر متوسط", en: "Moderate rain", fr: "Pluie modérée" },
      65: { icon: "🌧️", ar: "مطر غزير", en: "Heavy rain", fr: "Forte pluie" },
      71: { icon: "🌨️", ar: "ثلج خفيف", en: "Light snow", fr: "Neige légère" },
      73: { icon: "❄️", ar: "ثلج متوسط", en: "Moderate snow", fr: "Neige modérée" },
      75: { icon: "❄️", ar: "ثلج كثيف", en: "Heavy snow", fr: "Forte neige" },
      80: { icon: "🌦️", ar: "زخات مطر", en: "Rain showers", fr: "Averses" },
      81: { icon: "🌧️", ar: "زخات متوسطة", en: "Moderate showers", fr: "Averses modérées" },
      82: { icon: "⛈️", ar: "زخات قوية", en: "Violent showers", fr: "Fortes averses" },
      85: { icon: "🌨️", ar: "زخات ثلج", en: "Snow showers", fr: "Averses de neige" },
      86: { icon: "❄️", ar: "ثلج قوي", en: "Heavy snow showers", fr: "Fortes averses de neige" },
      95: { icon: "⛈️", ar: "عاصفة رعدية", en: "Thunderstorm", fr: "Orage" },
      96: { icon: "⛈️", ar: "عاصفة مع برد", en: "Thunderstorm + hail", fr: "Orage + grêle" },
      99: { icon: "⛈️", ar: "عاصفة وبرد قوي", en: "Heavy thunderstorm", fr: "Fort orage" },
    };
    const item = weatherMap[Number(code)] || { icon: "🌤️", ar: "غير معروف", en: "Unknown", fr: "Inconnu" };
    return { icon: item.icon, label: lang === "fr" ? item.fr : lang === "en" ? item.en : item.ar };
  };

  // جلب الطقس لجميع المدن باستعمال إحداثيات ثابتة.
  // Open-Meteo يدعم عدة إحداثيات في طلب واحد، لذلك لا نحتاج Geocoding لكل مدينة.
  useEffect(() => {
    let cancelled = false;

    const loadMoroccoCitiesWeather = async () => {
      setMoroccoWeatherLoading(true);
      const weatherResults = {};
      try {
        const validCities = MOROCCO_CITIES
          .map((city) => {
            const point = MOROCCO_CITY_COORDS[city];
            return point ? { city, lat: point[0], lon: point[1] } : null;
          })
          .filter(Boolean);

        for (let i = 0; i < validCities.length; i += 40) {
          if (cancelled) return;
          const batch = validCities.slice(i, i + 40);
          const latitudes = batch.map((item) => item.lat).join(',');
          const longitudes = batch.map((item) => item.lon).join(',');

          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitudes}&longitude=${longitudes}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,pressure_msl,precipitation,precipitation_probability&timezone=auto`
          );

          if (!response.ok) throw new Error(`Weather API ${response.status}`);
          const data = await response.json();
          const weatherArray = Array.isArray(data) ? data : [data];

          batch.forEach((item, index) => {
            const current = weatherArray[index]?.current;
            if (current && Number.isFinite(Number(current.temperature_2m))) {
              weatherResults[item.city] = {
                temperature: Number(current.temperature_2m),
                weatherCode: Number(current.weather_code),
                humidity: Number(current.relative_humidity_2m),
                wind: Number(current.wind_speed_10m),
                pressure: Number(current.pressure_msl),
                precipitation: Number(current.precipitation || 0),
                precipitationProbability: Number(current.precipitation_probability || 0),
              };
            }
          });
        }

        if (!cancelled) setMoroccoWeather(weatherResults);
      } catch (error) {
        console.warn('Morocco cities weather warning:', error);
        if (!cancelled) setMoroccoWeather(weatherResults);
      } finally {
        if (!cancelled) setMoroccoWeatherLoading(false);
      }
    };

    loadMoroccoCitiesWeather();
    const interval = setInterval(loadMoroccoCitiesWeather, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // 🌍 مراقب الزلازل العالمي — معلومات مباشرة من USGS + الدولة والعلم
  useEffect(() => {
    const listElement = document.getElementById('wg-earthquake-list');
    const alertElement = document.getElementById('wg-earthquake-alert');
    const countElement = document.getElementById('wg-earthquake-count');
  const tabCountElement = document.getElementById('wg-earthquake-tab-count');
    const notifyBtn = document.getElementById('wg-earthquake-notify-btn');
    if (!listElement) return;

    let cancelled = false;
    let timer = null;
    let firstLoad = true;
    const knownIds = new Set();
    const countryCache = new Map();

    const formatTime = (ms) => {
      try { return new Date(ms).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }); }
      catch (_) { return new Date(ms).toLocaleString(); }
    };

    const escapeHtml = (value) => String(value ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

    const flagFromIso = (iso) => {
      const code = String(iso || '').trim().toUpperCase();
      if (!/^[A-Z]{2}$/.test(code)) return '🌍';
      return String.fromCodePoint(...[...code].map((c) => 127397 + c.charCodeAt(0)));
    };

    const magnitudeClass = (mag) => {
      if (mag >= 6) return 'wg-eq-mag-critical';
      if (mag >= 5) return 'wg-eq-mag-high';
      if (mag >= 4) return 'wg-eq-mag-medium';
      if (mag >= 3) return 'wg-eq-mag-low';
      return 'wg-eq-mag-small';
    };

    const getPlaceParts = (place) => {
      const clean = String(place || 'منطقة غير محددة').trim();
      const ofParts = clean.split(/\s+of\s+/i);
      const locationPart = ofParts.length > 1 ? ofParts[ofParts.length - 1].trim() : clean;
      const distancePart = ofParts.length > 1 ? ofParts.slice(0, -1).join(' of ') : '';
      return { locationPart, distancePart };
    };

    const getCountry = async (quake) => {
      const coords = quake?.geometry?.coordinates || [];
      const lat = Number(coords[1]);
      const lon = Number(coords[0]);
      const key = quake?.id || `${lat.toFixed(3)}:${lon.toFixed(3)}`;
      if (countryCache.has(key)) return countryCache.get(key);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return { name: 'دولة غير محددة', iso: '', flag: '🌍' };
      try {
        const res = await fetch(`https://earthquake.usgs.gov/ws/geoserve/regions.json?latitude=${lat}&longitude=${lon}&type=admin`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`USGS regions ${res.status}`);
        const data = await res.json();
        const admin = data?.admin?.features?.[0]?.properties || data?.admin?.features?.[0]?.properties || {};
        const name = admin.country || admin.country_name || 'دولة غير محددة';
        const iso = admin.iso || admin.country_code || '';
        const result = { name, iso, flag: flagFromIso(iso) };
        countryCache.set(key, result);
        return result;
      } catch (_) {
        return { name: 'منطقة دولية / بحر', iso: '', flag: '🌍' };
      }
    };

    const showAlert = (quake, country) => {
      if (!quake) return;
      const mag = Number(quake.properties?.mag);
      const place = quake.properties?.place || 'منطقة غير محددة';
      const depth = Number(quake.geometry?.coordinates?.[2]);
      const title = `زلزال جديد — M${Number.isFinite(mag) ? mag.toFixed(1) : '?'}`;
      const details = `${country?.flag || '🌍'} ${country?.name || 'دولة غير محددة'} · ${place} · ${Number.isFinite(depth) ? depth.toFixed(1) + ' km' : 'العمق غير متوفر'} · ${formatTime(quake.properties?.time)}`;
      if (alertElement) {
        alertElement.innerHTML = `<span class="wg-eq-alert-icon">⚠️</span><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(details)}</span></div><button type="button" class="wg-eq-alert-close" aria-label="إغلاق">×</button>`;
        alertElement.classList.add('show');
        const close = alertElement.querySelector('.wg-eq-alert-close');
        if (close) close.onclick = () => alertElement.classList.remove('show');
        clearTimeout(showAlert._timer);
        showAlert._timer = setTimeout(() => alertElement.classList.remove('show'), 15000);
      }
      if ('Notification' in window && Notification.permission === 'granted') {
        try { new Notification(`⚠️ ${title}`, { body: details, tag: `windgure-earthquake-${quake.id || Date.now()}` }); } catch (_) {}
      }
    };

    const requestNotifications = async () => {
      if (!('Notification' in window)) return;
      try {
        const permission = await Notification.requestPermission();
        if (notifyBtn) notifyBtn.textContent = permission === 'granted' ? '🔔 التنبيهات مفعلة' : '🔔 تفعيل التنبيهات';
        if (alertElement) {
          alertElement.innerHTML = permission === 'granted'
            ? '<span class="wg-eq-alert-icon">🔔</span><div><strong>تم تفعيل تنبيهات الزلازل</strong><span>غادي يوصلك إشعار عند اكتشاف زلزال جديد.</span></div>'
            : '<span class="wg-eq-alert-icon">🔕</span><div><strong>التنبيهات غير مفعلة</strong><span>يمكنك تفعيلها من إعدادات المتصفح.</span></div>';
          alertElement.classList.add('show');
          clearTimeout(requestNotifications._timer);
          requestNotifications._timer = setTimeout(() => alertElement.classList.remove('show'), 5000);
        }
      } catch (_) {}
    };

    const updateNotificationButton = () => {
      if (!notifyBtn) return;
      if (!('Notification' in window)) { notifyBtn.textContent = '🔕 غير مدعوم'; notifyBtn.disabled = true; return; }
      notifyBtn.textContent = Notification.permission === 'granted' ? '🔔 التنبيهات مفعلة' : '🔔 تفعيل التنبيهات';
    };

    const loadLeaflet = () => new Promise((resolve, reject) => {
      if (window.L) return resolve(window.L);
      const existing = document.getElementById('wg-earthquake-leaflet-js');
      if (existing) {
        existing.addEventListener('load', () => resolve(window.L), { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const css = document.getElementById('wg-earthquake-leaflet-css') || document.createElement('link');
      css.id = 'wg-earthquake-leaflet-css';
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      if (!css.parentNode) document.head.appendChild(css);
      const script = document.createElement('script');
      script.id = 'wg-earthquake-leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => resolve(window.L);
      script.onerror = reject;
      document.head.appendChild(script);
    });

    const openEarthquakeLocation = async (quake) => {
      const modal = document.getElementById('wg-earthquake-location-modal');
      const mapElement = document.getElementById('wg-earthquake-detail-map');
      if (!modal || !mapElement || !quake) return;

      const coords = quake.geometry?.coordinates || [];
      const lon = Number(coords[0]);
      const lat = Number(coords[1]);
      const depth = Number(coords[2]);
      const mag = Number(quake.properties?.mag);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

      const country = await getCountry(quake);
      const place = quake.properties?.place || 'منطقة غير محددة';
      const detailMag = document.getElementById('wg-eq-detail-mag');
      const detailCountry = document.getElementById('wg-eq-detail-country');
      const detailPlace = document.getElementById('wg-eq-detail-place');
      const detailDepth = document.getElementById('wg-eq-detail-depth');
      const detailCoords = document.getElementById('wg-eq-detail-coords');
      const detailTime = document.getElementById('wg-eq-detail-time');
      const detailTsunami = document.getElementById('wg-eq-detail-tsunami');
      const detailUsps = document.getElementById('wg-eq-detail-usgs');

      if (detailMag) detailMag.textContent = `M${Number.isFinite(mag) ? mag.toFixed(1) : '?'}`;
      if (detailCountry) detailCountry.textContent = `${country?.flag || '🌍'} ${country?.name || 'دولة غير محددة'}`;
      if (detailPlace) detailPlace.textContent = place;
      if (detailDepth) detailDepth.textContent = Number.isFinite(depth) ? `${depth.toFixed(1)} km` : '—';
      if (detailCoords) detailCoords.textContent = `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
      if (detailTime) detailTime.textContent = formatTime(quake.properties?.time);
      if (detailTsunami) detailTsunami.textContent = Number(quake.properties?.tsunami) === 1 ? '🌊 Tsunami signal' : '✓ No tsunami signal';
      if (detailUsps) detailUsps.href = quake.properties?.url || 'https://earthquake.usgs.gov/earthquakes/map/';

      modal.classList.add('show');
      document.body.classList.add('wg-earthquake-modal-open');

      try {
        const L = await loadLeaflet();
        if (cancelled || !L) return;
        if (window.wgEarthquakeDetailMap) {
          window.wgEarthquakeDetailMap.remove();
          window.wgEarthquakeDetailMap = null;
        }
        const map = L.map(mapElement, { zoomControl: true, attributionControl: true, scrollWheelZoom: true }).setView([lat, lon], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // خريطة حقيقية: النقطة نفسها هي الإحداثيات الرسمية للزلزال من USGS.
        const color = mag >= 6 ? '#991b1b' : mag >= 5 ? '#dc2626' : mag >= 4 ? '#f97316' : '#eab308';
        const radius = Math.max(9, Math.min(22, 8 + (Number.isFinite(mag) ? mag * 2 : 8)));
        const epicentre = L.latLng(lat, lon);
        L.circle(epicentre, {
          radius: Math.max(2500, Math.min(18000, radius * 900)),
          color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.10
        }).addTo(map);
        L.circleMarker(epicentre, {
          radius: Math.min(16, radius / 1.2),
          color: '#ffffff',
          weight: 3,
          fillColor: color,
          fillOpacity: 1
        }).addTo(map)
          .bindTooltip(`Epicentre · M${Number.isFinite(mag) ? mag.toFixed(1) : '?'}`, { direction: 'top', offset: [0, -10] })
          .bindPopup(`<div style="font-family:Arial,sans-serif;min-width:190px"><strong style="font-size:18px;color:${color}">M${Number.isFinite(mag) ? mag.toFixed(1) : '?'}</strong><br><b>📍 ${escapeHtml(place)}</b><br><span>↕️ Profondeur: ${Number.isFinite(depth) ? depth.toFixed(1) : '—'} km</span><br><span>🌐 ${lat.toFixed(5)}, ${lon.toFixed(5)}</span></div>`)
          .openPopup();
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
        window.wgEarthquakeDetailMap = map;
        setTimeout(() => {
          map.invalidateSize();
          map.setView(epicentre, 8, { animate: false });
        }, 180);
      } catch (err) {
        console.warn('Windgure earthquake detail map warning:', err);
        mapElement.innerHTML = '<div class="wg-earthquake-map-error">تعذر تحميل الخريطة. الإحداثيات مازالت ظاهرة فوق.</div>';
      }
    };

    const closeEarthquakeLocation = () => {
      const modal = document.getElementById('wg-earthquake-location-modal');
      if (modal) modal.classList.remove('show');
      document.body.classList.remove('wg-earthquake-modal-open');
      if (window.wgEarthquakeDetailMap) {
        window.wgEarthquakeDetailMap.remove();
        window.wgEarthquakeDetailMap = null;
      }
    };

    const bindEarthquakeRows = (quakeById) => {
      listElement.querySelectorAll('.wg-earthquake-card').forEach((row) => {
        const handler = () => {
          const quake = quakeById.get(row.dataset.earthquakeId);
          if (quake) openEarthquakeLocation(quake);
        };
        row.addEventListener('click', handler);
        row.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handler();
          }
        });
      });
    };

    const renderQuakes = async (data) => {
      if (cancelled) return;
      const features = Array.isArray(data?.features) ? data.features : [];
      // ترتيب الزلازل من الأقوى إلى الأضعف حسب مقدار الزلزال (Magnitude).
      // عند تساوي القوة، الأحدث يظهر أولاً.
      const sorted = [...features].sort((a, b) => {
        const magA = Number(a.properties?.mag);
        const magB = Number(b.properties?.mag);
        const safeA = Number.isFinite(magA) ? magA : -Infinity;
        const safeB = Number.isFinite(magB) ? magB : -Infinity;
        if (safeB !== safeA) return safeB - safeA;
        return Number(b.properties?.time || 0) - Number(a.properties?.time || 0);
      });
      // نعرض أقوى 12 زلزالاً في القائمة، وليس آخر 12 حسب الوقت.
      const visible = sorted.slice(0, 12);
      if (countElement) countElement.textContent = `${features.length} زلزال · آخر 24 ساعة`;
    if (tabCountElement) tabCountElement.textContent = features.length;

      if (!visible.length) {
        listElement.innerHTML = '<div class="wg-earthquake-empty">🌍 لا توجد زلازل مسجلة حالياً في البيانات المتاحة.</div>';
      } else {
        const enriched = await Promise.all(visible.map(async (quake) => ({ quake, country: await getCountry(quake) })));
        if (cancelled) return;
        listElement.innerHTML = enriched.map(({ quake, country }) => {
          const mag = Number(quake.properties?.mag);
          const place = quake.properties?.place || 'منطقة غير محددة';
          const { locationPart, distancePart } = getPlaceParts(place);
          const depth = Number(quake.geometry?.coordinates?.[2]);
          const coords = quake.geometry?.coordinates || [];
          const lon = Number(coords[0]);
          const lat = Number(coords[1]);
          const tsunami = Number(quake.properties?.tsunami) === 1;
          const alert = quake.properties?.alert;
          const detailUrl = quake.properties?.url || 'https://earthquake.usgs.gov/earthquakes/map/';
          return `<article class="wg-earthquake-card" data-earthquake-id="${escapeHtml(quake.id || '')}" tabindex="0" role="button" aria-label="عرض موقع الزلزال ${escapeHtml(place)}">
            <div class="wg-eq-left"><div class="wg-eq-magnitude ${magnitudeClass(mag)}">M${Number.isFinite(mag) ? mag.toFixed(1) : '?'}</div><span class="wg-eq-time">${escapeHtml(formatTime(quake.properties?.time))}</span></div>
            <div class="wg-eq-main">
              <div class="wg-eq-country"><span class="wg-eq-flag" aria-hidden="true">${country.flag}</span><div><strong>${escapeHtml(country.name)}</strong><span>${escapeHtml(locationPart)}</span></div></div>
              <div class="wg-eq-place">${escapeHtml(distancePart ? distancePart + ' — ' + locationPart : place)}</div>
              <div class="wg-eq-meta"><span>↕️ <b>${Number.isFinite(depth) ? depth.toFixed(1) + ' km' : '—'}</b></span><span>🌐 <b>${Number.isFinite(lat) && Number.isFinite(lon) ? lat.toFixed(2) + ', ' + lon.toFixed(2) : '—'}</b></span><span>${tsunami ? '🌊 <b>Tsunami</b>' : `● <b>${escapeHtml(alert || 'Surveillance')}</b>`}</span></div>
            </div>
            <a class="wg-eq-usgs" href="${escapeHtml(detailUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Détails USGS">USGS ↗</a>
          </article>`;
        }).join('');
        const quakeById = new Map(enriched.map(({ quake }) => [quake.id, quake]));
        bindEarthquakeRows(quakeById);

        if (!firstLoad) {
          const fresh = features.filter((q) => q.id && !knownIds.has(q.id));
          if (fresh.length) {
            const newest = fresh.sort((a, b) => Number(b.properties?.time || 0) - Number(a.properties?.time || 0))[0];
            const country = await getCountry(newest);
            if (!cancelled) showAlert(newest, country);
          }
        }
      }

      features.forEach((q) => { if (q.id) knownIds.add(q.id); });
      firstLoad = false;
    };

    const refresh = async () => {
      try {
        const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', { cache: 'no-store' });
        if (!res.ok) throw new Error(`USGS ${res.status}`);
        await renderQuakes(await res.json());
      } catch (err) {
        console.warn('Windgure earthquake feed warning:', err);
        if (countElement) countElement.textContent = 'تعذر تحديث بيانات الزلازل';
      if (tabCountElement) tabCountElement.textContent = '—';
        if (listElement) listElement.innerHTML = '<div class="wg-earthquake-empty">⚠️ تعذر جلب بيانات الزلازل حالياً. حاول بعد قليل.</div>';
      }
    };

    updateNotificationButton();
    if (notifyBtn && !notifyBtn._wgBound) { notifyBtn.addEventListener('click', requestNotifications); notifyBtn._wgBound = true; }
    const closeLocationButton = document.getElementById('wg-earthquake-location-close');
    const locationModal = document.getElementById('wg-earthquake-location-modal');
    const onCloseLocation = () => closeEarthquakeLocation();
    if (closeLocationButton && !closeLocationButton._wgBound) { closeLocationButton.addEventListener('click', onCloseLocation); closeLocationButton._wgBound = true; }
    if (locationModal && !locationModal._wgBound) {
      locationModal.addEventListener('click', (event) => { if (event.target === locationModal) closeEarthquakeLocation(); });
      locationModal._wgBound = true;
    }
    refresh();
    timer = setInterval(refresh, 60000);

    return () => {
      cancelled = true;
      clearInterval(timer);
      if (notifyBtn && notifyBtn._wgBound) { notifyBtn.removeEventListener('click', requestNotifications); notifyBtn._wgBound = false; }
      closeEarthquakeLocation();
    };
  }, [activeTab]);

  // بحث مباشر في أي مكان بالمغرب: مدينة، قرية، دوار أو منطقة صغيرة.
  // لا نعتمد فقط على MOROCCO_CITIES. نبحث في Open-Meteo + Nominatim ثم
  // نختار أفضل نتيجة مغربية ونفتح طقسها مباشرة.
  const searchAnyMoroccoPlace = async (placeName) => {
    const query = String(placeName || "").trim();
    if (query.length < 2) return;

    setLoading(true);
    try {
      const normalize = normalizeCitySearch;
      const q = normalize(query);
      let candidates = [];

      // 1) Open-Meteo: أكثر من لغة + فلترة المغرب.
      const languages = ["ar", "fr", "en"];
      await Promise.all(languages.map(async (language) => {
        try {
          const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=100&language=${language}&format=json&countryCode=MA`;
          const res = await fetch(url);
          if (!res.ok) return;
          const data = await res.json();
          if (Array.isArray(data.results)) candidates.push(...data.results);
        } catch (err) {
          console.warn("Open-Meteo Morocco geocoding warning:", err);
        }
      }));

      // 2) Nominatim دائماً، وليس فقط عندما يفشل Open-Meteo.
      // هذا مهم للقرى والدواوير والأسماء المحلية الصغيرة.
      try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&namedetails=1&limit=30&accept-language=ar,fr,en&countrycodes=ma&q=${encodeURIComponent(query)}`;
        const res = await fetch(nominatimUrl, {
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            candidates.push(...data.map((item) => ({
              name: item.name || item.display_name?.split(",")[0]?.trim() || query,
              latitude: Number(item.lat),
              longitude: Number(item.lon),
              country: "المغرب",
              country_code: "MA",
              admin1: item.address?.state || item.address?.region || "",
              admin2: item.address?.province || item.address?.county || "",
              timezone: "Africa/Casablanca",
              elevation: null,
              feature_code: item.type || item.class || "",
              display_name: item.display_name || query,
              namedetails: item.namedetails || {},
            })));
          }
        }
      } catch (err) {
        console.warn("Nominatim Morocco geocoding warning:", err);
      }

      // 3) إذا لم توجد نتيجة مغربية، نعيد المحاولة بدون countryCode ثم نختار المغرب إن وجد.
      if (candidates.length === 0) {
        try {
          const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=100&language=en&format=json`;
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.results)) candidates.push(...data.results);
          }
        } catch (err) {
          console.warn("Open-Meteo global geocoding fallback warning:", err);
        }
      }

      // إزالة التكرار.
      const unique = [];
      const seen = new Set();
      candidates.forEach((item) => {
        const lat = Number(item.latitude);
        const lon = Number(item.longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
        const countryCode = String(item.country_code || "").toUpperCase();
        const isMorocco = countryCode === "MA" || String(item.country || "").toLowerCase().includes("morocc") || String(item.country || "").includes("المغرب");
        if (!isMorocco) return;
        const key = `${lat.toFixed(5)},${lon.toFixed(5)}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push({ ...item, latitude: lat, longitude: lon, country_code: "MA" });
        }
      });

      if (unique.length === 0) {
        alert(isRtl ? `ما لقيتش المكان «${query}». جرّب الاسم بالفرنسية أو الإنجليزية.` : lang === "fr" ? `Lieu introuvable : ${query}. Essayez aussi le nom français ou anglais.` : `لم يتم العثور على المكان: ${query}`);
        return;
      }

      // ترتيب النتائج: تطابق الاسم أولاً، ثم بداية الاسم، ثم الاحتواء.
      const scored = unique.map((item) => {
        const names = [
          item.name,
          item.display_name,
          item.namedetails?.name,
          item.namedetails?.['name:ar'],
          item.namedetails?.['name:fr'],
          item.namedetails?.['name:en'],
        ].filter(Boolean).map(normalize);
        let score = 0;
        if (names.some((n) => n === q)) score += 1000;
        if (names.some((n) => n.startsWith(q))) score += 500;
        if (names.some((n) => n.includes(q))) score += 200;
        // نعطي أفضلية للأماكن المأهولة على الطرق/المعالم عندما تكون الأسماء متساوية.
        const feature = String(item.feature_code || "").toUpperCase();
        if (/PPL|PPLA|PPLA2|PPLA3|PPLC/.test(feature)) score += 80;
        return { item, score };
      }).sort((a, b) => b.score - a.score);

      const result = scored[0].item;
      const resultName = result.name || result.display_name?.split(",")[0]?.trim() || query;

      // فتح طقس المكان مباشرة + نقل الخريطة/الموقع إليه عبر coords.
      await selectSearchSuggestion({
        latitude: Number(result.latitude),
        longitude: Number(result.longitude),
        name: resultName,
        country: "Morocco",
      });
      setMoroccoCityQuery("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Any Morocco place search failed:", err);
      alert(isRtl ? `تعذر البحث عن: ${query}` : lang === "fr" ? `Recherche impossible : ${query}` : `تعذر البحث عن: ${query}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // عند الضغط على Enter، إذا كانت هناك اقتراحات نختار أول اقتراح واضح.
    if (searchSuggestions.length > 0) {
      await selectSearchSuggestion(searchSuggestions[0]);
      return;
    }

    try {
      setLoading(true);

      // البحث أولاً عبر Open-Meteo بعدة نتائج وباللغة المختارة.
      // هذا مهم خصوصاً للمدن المكتوبة بالعربية مثل: الدار البيضاء، الرباط، طنجة...
      let results = [];
      const language = lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en";
      const searchVariants = buildMoroccoSearchVariants(query);

      // نبحث بكل الصيغ: الاسم الأصلي، بدون "الـ"، الاسم اللاتيني والمرادفات المعروفة.
      for (const variant of searchVariants) {
        try {
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(variant + ", Morocco")}&count=50&language=${language}&countryCode=MA&format=json`
          );
          const data = await res.json();
          if (Array.isArray(data.results)) results.push(...data.results);
        } catch (openMeteoErr) {
          console.warn("Open-Meteo search warning:", openMeteoErr);
        }
      }

      // Nominatim يبقى احتياطياً مهماً للقرى والدواوير التي لا تكون مفهرسة في Open-Meteo.
      if (results.length === 0) {
        try {
          const nominatimResponses = await Promise.allSettled(
            searchVariants.map((variant) =>
              fetch(
                `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=40&countrycodes=ma&accept-language=${lang === "ar" ? "ar,en" : lang === "fr" ? "fr,ar,en" : "en,ar"}&q=${encodeURIComponent(variant)}`
              ).then((res) => res.json())
            )
          );

          const nominatimData = nominatimResponses.flatMap((r) =>
            r.status === "fulfilled" && Array.isArray(r.value) ? r.value : []
          );

          results = nominatimData
            .map((place) => ({
              latitude: Number(place.lat),
              longitude: Number(place.lon),
              name:
                place.name ||
                place.address?.village ||
                place.address?.hamlet ||
                place.address?.town ||
                place.address?.city ||
                place.address?.municipality ||
                place.address?.suburb ||
                query,
              country: place.address?.country || "",
              country_code: place.address?.country_code || "",
              admin1: place.address?.state || place.address?.region || "",
            }))
            .filter(
              (place) =>
                Number.isFinite(place.latitude) && Number.isFinite(place.longitude)
            );
        } catch (nominatimErr) {
          console.warn("Nominatim search warning:", nominatimErr);
        }
      }

      // إزالة التكرار وإعطاء الأولوية للنتائج التي تطابق الاسم أو تبدأ به.
      const uniqueResults = [];
      const seenResults = new Set();
      for (const item of results) {
        const lat = Number(item.latitude);
        const lon = Number(item.longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
        const key = `${String(item.name || "").trim().toLocaleLowerCase()}|${lat.toFixed(3)}|${lon.toFixed(3)}`;
        if (!seenResults.has(key)) { seenResults.add(key); uniqueResults.push(item); }
      }
      const qLower = query.toLocaleLowerCase();
      uniqueResults.sort((a, b) => {
        const aName = String(a.name || "").toLocaleLowerCase();
        const bName = String(b.name || "").toLocaleLowerCase();
        const aScore = aName === qLower ? 0 : aName.startsWith(qLower) ? 1 : aName.includes(qLower) ? 2 : 3;
        const bScore = bName === qLower ? 0 : bName.startsWith(qLower) ? 1 : bName.includes(qLower) ? 2 : 3;
        return aScore - bScore;
      });
      results = uniqueResults;

      if (results.length > 0) {
        // نختار النتيجة الأولى، لكن نعرض اسم المكان بشكل أوضح.
        const spot = results[0];
        const newCoords = {
          lat: Number(spot.latitude),
          lon: Number(spot.longitude),
        };

        setCoords(newCoords);

        const country = spot.country || "";
        const city = spot.name || query;
        const name = country ? `${country} - ${city}` : city;

        setLocationName(name);
        setSelectedDayIndex(0);
        setSearchQuery("");
        setSearchSuggestions([]);
        addToArchive({ name, lat: newCoords.lat, lon: newCoords.lon });
        await fetchWeather(newCoords.lat, newCoords.lon);
      } else {
        alert(
          lang === "ar"
            ? `لم يتم العثور على «${query}». جرب اسم المدينة بالعربية أو بالفرنسية/الإنجليزية.`
            : lang === "fr"
            ? `Aucun résultat pour « ${query} ». Essayez un autre nom de ville.`
            : `No location found for “${query}”. Try another city name.`
        );
      }
    } catch (err) {
      console.error("Search error:", err);
      alert(
        lang === "ar"
          ? "وقع خطأ أثناء البحث. حاول مرة أخرى."
          : "Search failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectFavorite = (spot) => {
    addToArchive(spot);
    setCoords({ lat: spot.lat, lon: spot.lon });
    setLocationName(spot.name);
    setSelectedDayIndex(0);
    fetchWeather(spot.lat, spot.lon);
  };

  const shareLocation = async () => {
    const text = `Wind & Wave forecast - ${locationName}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "windgure",
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Location copied!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAvailableDays = () => {
    if (!weatherData?.hourly?.time) return [];
    const daysMap = [];
    const times = weatherData.hourly.time;
    for (let i = 0; i < times.length; i += 24) {
      const dayDate = times[i].split("T")[0];
      daysMap.push({
        index: daysMap.length,
        date: dayDate,
        label:
          daysMap.length === 0
            ? t.today
            : daysMap.length === 1
            ? t.tomorrow
            : dayDate,
      });
      if (daysMap.length >= 15) break;
    }
    return daysMap;
  };

  const availableDays = getAvailableDays();
  const startIndex = selectedDayIndex * 24;
  const endIndex = startIndex + 24;

  const getSunTimes = () => {
    if (!weatherData?.daily?.sunrise || !weatherData?.daily?.sunset)
      return { sunrise: "06:30", sunset: "19:15" };
    const sunriseFull = weatherData.daily.sunrise[selectedDayIndex] || "";
    const sunsetFull = weatherData.daily.sunset[selectedDayIndex] || "";
    return {
      sunrise: sunriseFull.split("T")[1] || "06:30",
      sunset: sunsetFull.split("T")[1] || "19:15",
    };
  };

  const sunTimes = getSunTimes();

  const getWindArrow = (deg) => {
    if (deg === null || deg === undefined) return "-";
    const arrows = ["↓", "↙", "←", "↖", "↑", "↗", "→", "↘"];
    const index = Math.round(deg / 45) % 8;
    return arrows[index];
  };

  const getDirectionLabel = (deg) => {
    if (deg === null || deg === undefined || Number.isNaN(Number(deg))) return "-";
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(Number(deg) / 45) % 8];
  };

  const getWindStyle = (val) => {
    if (val <= 3) return { backgroundColor: "#dff9ff", color: "#0f172a" };
    if (val <= 6) return { backgroundColor: "#8be9f5", color: "#0f172a" };
    if (val <= 8) return { backgroundColor: "#22d3ee", color: "#082f49", fontWeight: "700" };
    if (val <= 11) return { backgroundColor: "#00cfff", color: "#001018", fontWeight: "800" };
    if (val <= 14) return { backgroundColor: "#00e676", color: "#001b0b", fontWeight: "900" };
    if (val <= 19) return { backgroundColor: "#76ff03", color: "#101800", fontWeight: "900" };
    if (val <= 25) return { backgroundColor: "#ffe600", color: "#171200", fontWeight: "900" };
    if (val <= 30) return { backgroundColor: "#ff9800", color: "#1a0b00", fontWeight: "900" };
    return { backgroundColor: "#ff1744", color: "#ffffff", fontWeight: "900" };
  };

  // حاسبة خطورة البحر وعدد النجوم
  const getSeaDangerRating = (wave, gust, current) => {
    let score = 0;
    const w = wave || 0;
    const g = gust || 0;
    const c = current || 0;

    if (w > 3.0 || g > 35 || c > 2.5) score = 5;
    else if (w > 2.2 || g > 27 || c > 1.8) score = 4;
    else if (w > 1.5 || g > 20 || c > 1.2) score = 3;
    else if (w > 0.8 || g > 14 || c > 0.6) score = 2;
    else if (w > 0.3 || g > 7) score = 1;

    return score;
  };

  const renderDangerStars = (rating) => {
    if (rating === 0) return <span style={{ color: "#94a3b8" }}>-</span>;
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} style={{ color: rating >= 4 ? "#ef4444" : "#eab308", fontSize: "12px" }}>
          ★
        </span>
      );
    }
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: "1px" }}>
        {stars}
        {rating >= 4 && <AlertTriangle size={12} color="#ef4444" style={{ marginLeft: "2px" }} />}
      </div>
    );
  };

  const getTemperatureStyle = (temp) => {
    if (temp < 10) return { backgroundColor: "#60a5fa", color: "#ffffff", fontWeight: "800" };
    if (temp < 18) return { backgroundColor: "#7dd3fc", color: "#082f49", fontWeight: "800" };
    if (temp <= 23) return { backgroundColor: "#fde047", color: "#422006", fontWeight: "900" };
    if (temp <= 28) return { backgroundColor: "#fb923c", color: "#ffffff", fontWeight: "900" };
    if (temp <= 33) return { backgroundColor: "#fb7185", color: "#ffffff", fontWeight: "900" };
    return { backgroundColor: "#ef233c", color: "#ffffff", fontWeight: "900" };
  };

  const getCloudStyle = (cloud) => {
    if (cloud <= 20) return { backgroundColor: "#bae6fd", color: "#082f49" };
    if (cloud <= 40) return { backgroundColor: "#7dd3fc", color: "#082f49" };
    if (cloud <= 60) return { backgroundColor: "#cbd5e1", color: "#1e293b" };
    if (cloud <= 80) return { backgroundColor: "#64748b", color: "#ffffff" };
    return { backgroundColor: "#1e293b", color: "#ffffff" };
  };

  // بطاقة Live يجب أن تعرض الساعة الحالية فعلاً، وليس أول ساعة من اليوم.
  // هذا يمنع ظهور درجة حرارة قديمة (مثلاً درجة منتصف الليل) بدل درجة الحرارة الحالية.
  const getCurrentWeatherHourIndex = () => {
    const times = weatherData?.hourly?.time;
    if (!Array.isArray(times) || !times.length) return 0;

    try {
      const timeZone = weatherData?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hour12: false,
      }).formatToParts(new Date());
      const get = (type) => parts.find((part) => part.type === type)?.value || "";
      const currentHourKey = `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:00`;
      const exactIndex = times.findIndex((value) => String(value).slice(0, 13) === currentHourKey.slice(0, 13));
      if (exactIndex >= 0) return exactIndex;

      const now = Date.now();
      let closest = 0;
      let smallest = Infinity;
      times.forEach((value, index) => {
        const parsed = new Date(value).getTime();
        if (!Number.isNaN(parsed)) {
          const distance = Math.abs(parsed - now);
          if (distance < smallest) {
            smallest = distance;
            closest = index;
          }
        }
      });
      return closest;
    } catch (e) {
      return 0;
    }
  };

  // نحرك القيم تدريجياً بين ساعتين من التوقعات، لذلك تتغير الأرقام كل ثانية
  // بدون الادعاء أن الـ API يقيس الطقس فعلياً كل ثانية.
  const liveHourIndex = getCurrentWeatherHourIndex();
  const nextHourIndex = Math.min(liveHourIndex + 1, (weatherData?.hourly?.time?.length || 1) - 1);
  const liveProgress = (liveSecond % 60) / 60;

  const interpolate = (array, fallback = null) => {
    const a = array?.[liveHourIndex];
    const b = array?.[nextHourIndex];
    if (typeof a !== "number") return fallback;
    if (typeof b !== "number") return a;
    return a + (b - a) * liveProgress;
  };

  // القيم الحالية من Open-Meteo لها الأولوية على التوقع الساعي.
  // التوقع الساعي يبقى كخطة احتياطية إذا لم تتوفر current.
  const liveTemperature = typeof weatherData?.current?.temperature_2m === "number"
    ? weatherData.current.temperature_2m
    : interpolate(weatherData?.hourly?.temperature_2m);
  const liveHumidity = typeof weatherData?.current?.relative_humidity_2m === "number"
    ? weatherData.current.relative_humidity_2m
    : interpolate(weatherData?.hourly?.relative_humidity_2m);
  const livePressure = typeof weatherData?.current?.pressure_msl === "number"
    ? weatherData.current.pressure_msl
    : interpolate(weatherData?.hourly?.pressure_msl);
  const liveUv = typeof weatherData?.current?.uv_index === "number"
    ? weatherData.current.uv_index
    : interpolate(weatherData?.hourly?.uv_index);
  const liveVisibility = typeof weatherData?.current?.visibility === "number"
    ? weatherData.current.visibility
    : interpolate(weatherData?.hourly?.visibility);
  const liveWindSpeed = typeof weatherData?.current?.wind_speed_10m === "number"
    ? weatherData.current.wind_speed_10m
    : interpolate(weatherData?.hourly?.wind_speed_10m);
  const liveWindGust = typeof weatherData?.current?.wind_gusts_10m === "number"
    ? weatherData.current.wind_gusts_10m
    : interpolate(weatherData?.hourly?.wind_gusts_10m);
  const liveWindDirection = typeof weatherData?.current?.wind_direction_10m === "number"
    ? weatherData.current.wind_direction_10m
    : interpolate(weatherData?.hourly?.wind_direction_10m);
  const liveCloudCover = typeof weatherData?.current?.cloud_cover === "number"
    ? weatherData.current.cloud_cover
    : interpolate(weatherData?.hourly?.cloud_cover);
  const liveSeaTemp = interpolate(weatherData?.hourly?.sea_surface_temperature);

  const formatVisibility = (meters) => {
    if (meters === null || meters === undefined) return "-";
    return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${Math.round(meters)} m`;
  };

  const livePulse = 0.5 + ((Math.sin(liveSecond * 0.22) + 1) / 2) * 0.5;
  const liveWaveOffset = (liveSecond * 3) % 100;

  // تنبيهات ذكية مختصرة مبنية على بيانات الموقع الحالية
  const smartAlerts = [];
  if (typeof liveWindSpeed === "number" && liveWindSpeed >= 25) smartAlerts.push({ icon: "💨", text: t.alertStrongWind, value: `${liveWindSpeed.toFixed(1)} ${speedUnit}`, level: "high" });
  if (typeof liveWindGust === "number" && liveWindGust >= 30) smartAlerts.push({ icon: "🌬️", text: t.alertGust, value: `${liveWindGust.toFixed(1)} ${speedUnit}`, level: "high" });
  const liveWave = interpolate(weatherData?.hourly?.wave_height);
  if (typeof liveWave === "number" && liveWave >= 2) smartAlerts.push({ icon: "🌊", text: t.alertWaves, value: `${liveWave.toFixed(1)} m`, level: "high" });
  if (typeof liveVisibility === "number" && liveVisibility < 3000) smartAlerts.push({ icon: "👁️", text: t.alertVisibility, value: formatVisibility(liveVisibility), level: "medium" });
  if (typeof liveTemperature === "number" && liveTemperature >= 35) smartAlerts.push({ icon: "🌡️", text: t.alertHeat, value: `${Math.round(liveTemperature)}°C`, level: "medium" });
  if (typeof liveUv === "number" && liveUv >= 8) smartAlerts.push({ icon: "☀️", text: t.alertUV, value: `UV ${Number(liveUv).toFixed(1)}`, level: "medium" });

  return (
    <div className="wg-app" dir={isRtl ? "rtl" : "ltr"}>
      <style>{`
        * { box-sizing: border-box; }
        body { background: #f1f5f9; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; }
        .wg-app { min-height: 100vh; background: #f1f5f9; color: #0f172a; font-size: 13px; }
        .wg-header {
          background: linear-gradient(135deg, #07111f, #102a43, #063b4c);
          color: white; padding: 8px 14px;
          border-bottom: 2px solid #00d9ff;
          position: sticky; top: 0; z-index: 100;
        }
        .wg-header-main { display: flex; align-items: center; gap: 12px; max-width: 1800px; margin: auto; }
        
        .wg-logo { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .wg-logo-icon {
          width: 34px; height: 34px; background: linear-gradient(135deg, #00d9ff, #0284c7);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 10px rgba(0,217,255,0.4); color: #07111f;
        }
        .wg-logo-text { font-size: 20px; font-weight: 900; letter-spacing: 0.5px; }
        .wg-logo-text span { color: #22d3ee; }

        .home-btn {
          background: #0ea5e9; border: 0; color: white; padding: 7px 11px; border-radius: 6px;
          cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: 800; font-size: 12px;
        }
        .home-btn:hover { background: #0284c7; }

        .gps-btn {
          background: #059669; border: 0; color: white; padding: 7px 11px; border-radius: 6px;
          cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: 800; font-size: 12px;
        }
        .gps-btn:hover { background: #047857; }

        .wg-search { position: relative; width: 260px; }
        .wg-search input {
          width: 100%; height: 34px; background: #162b3d; color: white;
          border: 1px solid #31556d; border-radius: 6px; padding: 0 38px 0 12px; outline: none;
        }
        .wg-search input:focus { border-color: #22d3ee; box-shadow: 0 0 0 2px rgba(34,211,238,.15); }
        .wg-search svg { display: block; }
        .search-submit { position: absolute; ${isRtl ? "left: 6px;" : "right: 6px;"} top: 5px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: 0; background: transparent; color: #67e8f9; cursor: pointer; border-radius: 6px; padding: 0; }
        .search-submit:hover { background: rgba(103,232,249,.12); color: #a5f3fc; }
        .search-submit:active { transform: scale(.94); }
        .search-suggestions {
          position: absolute;
          top: calc(100% + 5px);
          left: 0;
          right: 0;
          z-index: 3000;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(15,23,42,.22);
          overflow: hidden;
          max-height: 320px;
          overflow-y: auto;
        }
        .search-suggestion {
          width: 100%;
          border: 0;
          border-bottom: 1px solid #e2e8f0;
          background: #fff;
          color: #0f172a;
          padding: 9px 11px;
          display: flex;
          align-items: center;
          gap: 9px;
          text-align: left;
          cursor: pointer;
        }
        .search-suggestion:last-child { border-bottom: 0; }
        .search-suggestion:hover { background: #eff6ff; }
        .search-suggestion-icon { color: #0284c7; flex: 0 0 auto; }
        .search-suggestion-main { min-width: 0; flex: 1; }
        .search-suggestion-name { font-weight: 900; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .search-suggestion-meta { margin-top: 2px; color: #64748b; font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .search-suggestions-loading { padding: 10px; color: #64748b; font-size: 11px; background: #fff; text-align: center; }

        .wg-nav { display: flex; gap: 5px; ${isRtl ? "margin-right: auto;" : "margin-left: auto;"} }
        .wg-nav button {
          border: 0; background: transparent; color: #cbd5e1; padding: 8px 10px;
          border-radius: 5px; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 5px;
        }
        .wg-nav button:hover { background: #1e3a50; color: white; }

        .wg-sun { display: flex; gap: 12px; color: #cbd5e1; white-space: nowrap; font-size: 11px; background: #0b1e2d; padding: 6px 10px; border-radius: 6px; border: 1px solid #1f3b50; }
        
        .mobile-menu-button {
          display: none; ${isRtl ? "margin-right: auto;" : "margin-left: auto;"} background: #12344a; border: 1px solid #2c6078;
          color: white; border-radius: 6px; width: 38px; height: 34px; align-items: center; justify-content: center; cursor: pointer;
        }
        .mobile-menu { display: none; }

        .favorites-bar {
          background: #172033; color: white; min-height: 40px; padding: 5px 14px;
          display: flex; align-items: center; gap: 7px; overflow-x: auto; white-space: nowrap; scrollbar-width: thin;
        }
        .favorite-title { color: #facc15; font-weight: 900; }
        .favorite-chip {
          display: inline-flex; align-items: center; gap: 6px;
          background: #263247; color: #dbeafe; padding: 4px 8px; border-radius: 5px; cursor: pointer; font-size: 12px;
        }
        .favorite-chip:hover { background: #334155; }
        .favorite-chip-active { background: #0891b2 !important; color: white !important; font-weight: 900; }
        .favorite-delete { background: transparent; border: 0; color: #94a3b8; cursor: pointer; padding: 0; display: flex; align-items: center; }
        .favorite-delete:hover { color: #f87171; }

        .location-bar {
          background: white; border-top: 1px solid #d1d5db; border-bottom: 1px solid #cbd5e1;
          padding: 9px 16px; display: flex; justify-content: space-between; align-items: center; gap: 10px; box-shadow: 0 1px 3px rgba(0,0,0,.06);
        }
        .location-name { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 900; min-width: 0; }
        .location-name span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .favorite-star { border: 0; background: transparent; cursor: pointer; padding: 2px; }
        .set-home-link {
          background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; padding: 4px 10px;
          border-radius: 5px; cursor: pointer; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 4px;
        }
        .set-home-link:hover { background: #e2e8f0; }
        .loading { display: flex; align-items: center; gap: 7px; color: #0891b2; font-weight: 800; white-space: nowrap; }
        
        .wg-15day-panel { max-width:1800px; margin:12px auto 0; padding:14px; background:linear-gradient(135deg,#07111f,#102a43 55%,#063b4c); border:1px solid rgba(34,211,238,.28); border-radius:14px; box-shadow:0 10px 28px rgba(15,23,42,.15); color:white; }
        .wg-15day-head { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:11px; }
        .wg-15day-title { font-size:14px; font-weight:900; } .wg-15day-subtitle { color:#bae6fd; font-size:9px; margin-top:3px; }
        .wg-15day-badge { background:#0891b2; color:white; border:1px solid #67e8f9; border-radius:999px; padding:5px 10px; font-size:10px; font-weight:900; }
        .wg-15day-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:6px; }
        .wg-15day-card { border:1px solid rgba(125,211,252,.18); background:rgba(15,23,42,.5); color:white; border-radius:10px; padding:7px 6px; cursor:pointer; text-align:center; min-height:125px; transition:.15s ease; }
        .wg-15day-card:hover { transform:translateY(-2px); background:rgba(14,165,233,.18); border-color:rgba(34,211,238,.55); } .wg-15day-card-active { border-color:#22d3ee; box-shadow:0 0 0 2px rgba(34,211,238,.18); background:rgba(14,165,233,.22); }
        .wg-15day-date { font-size:11px; font-weight:900; color:#e0f2fe; } .wg-15day-icon { font-size:23px; line-height:1; margin:8px 0 4px; }
        .wg-15day-condition { color:#bae6fd; font-size:10px; font-weight:800; min-height:24px; } .wg-15day-temp { margin-top:5px; font-size:12px; color:#e2e8f0; } .wg-15day-temp strong { color:#67e8f9; font-size:16px; }
        .wg-15day-rain,.wg-15day-wind { margin-top:5px; color:#cbd5e1; font-size:9px; font-weight:800; } .wg-15day-loading { grid-column:1/-1; text-align:center; padding:25px; color:#bae6fd; }

        .tabs { background: #e2e8f0; border-bottom: 1px solid #cbd5e1; padding: 6px 14px; display: flex; gap: 5px; overflow-x: auto; white-space: nowrap; }
        .tab { border: 0; background: transparent; color: #334155; padding: 7px 11px; border-radius: 7px; cursor: pointer; font-weight: 600; display:flex; align-items:center; gap:6px; }
        .tab:hover { background: #cbd5e1; }
        .tab-active { background: white; color: #0f172a; box-shadow: 0 1px 3px rgba(0,0,0,.15); font-weight: 900; }
        .earthquake-tab { display:flex; align-items:center; gap:6px; }
        .earthquake-tab-count { min-width:18px; height:18px; padding:0 5px; display:inline-flex; align-items:center; justify-content:center; border-radius:999px; background:#fee2e2; color:#b91c1c; font-size:9px; font-weight:950; }
        .earthquake-tab.tab-active .earthquake-tab-count { background:#ef4444; color:#fff; }
        .wg-earthquake-tab-view { margin-top:0; padding-top:2px; }

        
        .days-bar {
          background: #e2e8f0; padding: 8px 14px; display: flex; gap: 6px; align-items: center; border-bottom: 1px solid #cbd5e1; overflow-x: auto;
        }
        .day-btn {
          background: #ffffff; border: 1px solid #cbd5e1; color: #334155; padding: 5px 12px;
          border-radius: 5px; cursor: pointer; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 5px; white-space: nowrap;
        }
        .day-btn:hover { background: #f8fafc; }
        .day-btn-active { background: #0284c7 !important; color: white !important; border-color: #0284c7 !important; }

        .main { width: 100%; padding: 8px; }
        .forecast-container { width: 100%; background: white; border: 1px solid #cbd5e1; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,.06); overflow: hidden; }
        .table-scroll { width: 100%; overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; scrollbar-width: thin; }
        .weather-table { width: 100%; min-width: 1180px; border-collapse: collapse; text-align: center; font-family: Consolas, monospace; font-size: 11px; }
        .weather-table td { height: 31px; padding: 4px; border-right: 1px solid #dbe1e8; border-bottom: 1px solid #dbe1e8; white-space: nowrap; }
        .weather-table .row-title { width: 185px; min-width: 185px; text-align: ${isRtl ? "right" : "left"}; ${isRtl ? "padding-right: 10px;" : "padding-left: 10px;"} background: #f8fafc; font-weight: 900; position: sticky; ${isRtl ? "right: 0;" : "left: 0;"} z-index: 5; box-shadow: ${isRtl ? "-2px 0 3px rgba(0,0,0,.08)" : "2px 0 3px rgba(0,0,0,.08)"}; }
        .weather-table thead .row-title { background: #dbe4ee; }
        .hour-cell { min-width: 42px; }
        .direction { background: #ddd6fe; color: #5b21b6; font-size: 17px; font-weight: 900; }
        .mobile-hint { display: none; }

        .weather-tools-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px; padding:8px; }
        .wind-compass-panel {
          min-height:118px; padding:8px 10px; border:1px solid #bae6fd; border-radius:10px;
          background:linear-gradient(145deg,#ffffff,#e0f2fe); box-shadow:0 3px 10px rgba(15,23,42,.07);
          display:flex; align-items:center; justify-content:space-between; gap:8px;
        }
        .compass-info { min-width:0; flex:1; }
        .tool-title { font-size:12px; font-weight:950; color:#0f172a; }
        .tool-subtitle { margin-top:3px; color:#64748b; font-size:9px; }
        .wind-compass { width:92px; height:92px; flex:0 0 92px; border-radius:50%; position:relative;
          margin: auto; border: 6px solid #dbeafe; background: radial-gradient(circle,#fff 0%,#f0f9ff 65%,#dbeafe 100%);
          box-shadow: inset 0 0 0 2px #93c5fd, 0 8px 20px rgba(2,132,199,.15); }
        .wind-compass::before, .wind-compass::after { content:""; position:absolute; background:#cbd5e1; }
        .wind-compass::before { width:1px; height:100%; left:50%; top:0; }
        .wind-compass::after { height:1px; width:100%; top:50%; left:0; }
        .compass-label { position:absolute; font-size:10px; font-weight:900; color:#0f172a; z-index:2; }
        .compass-n { top:5px; left:50%; transform:translateX(-50%); color:#dc2626; }
        .compass-e { right:6px; top:50%; transform:translateY(-50%); }
        .compass-s { bottom:5px; left:50%; transform:translateX(-50%); }
        .compass-w { left:6px; top:50%; transform:translateY(-50%); }
        .compass-needle { position:absolute; left:50%; top:50%; width:4px; height:34px; transform-origin:50% 100%;
          margin-left:-2px; margin-top:-34px; border-radius:6px; background:linear-gradient(#ef4444 0 50%,#0f172a 50%);
          box-shadow:0 2px 6px rgba(0,0,0,.25); transition:transform .8s cubic-bezier(.2,.8,.2,1); z-index:3; }
        .compass-center { position:absolute; width:12px; height:12px; left:50%; top:50%; transform:translate(-50%,-50%);
          border-radius:50%; background:#0284c7; border:2px solid white; z-index:4; box-shadow:0 2px 5px rgba(0,0,0,.25); }
        .compass-data { flex:1; min-width:160px; text-align:${isRtl ? "right" : "left"}; }
        .compass-speed { font-size:20px; font-weight:950; color:#0369a1; margin-top:8px; }
        .compass-speed span { font-size:11px; }
        .smart-alerts-panel { min-height:118px; padding:8px; border:1px solid #fed7aa; border-radius:10px; background:linear-gradient(145deg,#fff,#fff7ed); box-shadow:0 3px 10px rgba(15,23,42,.07); }
        .smart-alerts-head { display:flex; justify-content:space-between; align-items:center; font-size:12px; font-weight:950; color:#0f172a; }
        .smart-alerts-head span { min-width:18px; height:18px; border-radius:50%; display:grid; place-items:center; background:#f97316; color:white; font-size:9px; }
        .smart-alerts-list { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:5px; margin-top:6px; }
        .smart-alert { display:flex; align-items:center; gap:5px; padding:5px; border-radius:8px; border:1px solid #e2e8f0; background:white; min-width:0; }
        .smart-alert.high { border-color:#fecaca; background:#fff1f2; }
        .smart-alert.medium { border-color:#fed7aa; background:#fff7ed; }
        .smart-alert-icon { font-size:18px; }
        .smart-alert-text { min-width:0; display:flex; flex-direction:column; }
        .smart-alert-text strong { font-size:9px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .smart-alert-text small { color:#64748b; font-size:8px; margin-top:1px; }
        .no-alerts { margin-top:10px; padding:18px 8px; text-align:center; border-radius:8px; background:#ecfdf5; color:#047857; font-size:11px; font-weight:800; }
        .graph-hover-info { min-height:30px; margin-top:8px; padding:7px 10px; border-radius:7px; background:rgba(15,23,42,.55); color:#e0f2fe; font-size:12px; }
        .wind-graph-column { cursor: crosshair; transition: transform .15s ease; }
        .wind-graph-column:hover { transform: translateY(-4px); }

        .graph-view {
          position: relative;
          overflow: hidden;
          background: #091a2a;
          color: #ffffff;
          padding: 24px; border-radius: 8px; border: 1px solid #1e3a5f; box-shadow: 0 6px 16px rgba(0,0,0,0.25); min-height: 380px;
          isolation: isolate;
        }
        .graph-photo-bg { position: absolute; inset: 0; z-index: -2; overflow: hidden; }
        .graph-photo-bg img { width: 100%; height: 100%; object-fit: cover; opacity: .42; animation: graphPhotoMove 6s ease-in-out infinite alternate; }
        .graph-view::after { content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(2,6,23,.82), rgba(3,105,161,.35), rgba(2,6,23,.78)); z-index: -1; }
        .graph-content { position: relative; z-index: 2; }
        .graph-legend { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 15px; color: #e0f2fe; font-size: 11px; font-weight: 800; }
        .graph-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px; }
        .wind-dot { background: #38bdf8; box-shadow: 0 0 8px rgba(56,189,248,.8); }
        .gust-dot { background: #fbbf24; box-shadow: 0 0 8px rgba(251,191,36,.8); }
        .wind-graph { position: relative; display: grid; grid-template-columns: repeat(24, minmax(18px, 1fr)); gap: 5px; align-items: end; height: 235px; margin-top: 22px; padding: 18px 8px 0; border-bottom: 1px solid rgba(255,255,255,.35); overflow-x: auto; }
        .wind-graph-grid { position: absolute; inset: 18px 8px 27px; background: repeating-linear-gradient(to top, rgba(255,255,255,.10) 0 1px, transparent 1px 25%); pointer-events: none; }
        .wind-graph-column { min-width: 18px; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 4px; position: relative; z-index: 2; }
        .wind-value { font-size: 9px; color: #ffffff; font-weight: 900; text-shadow: 0 1px 3px rgba(0,0,0,.7); min-height: 12px; }
        .wind-bars { width: 100%; height: 175px; display: flex; align-items: flex-end; justify-content: center; gap: 2px; }
        .wind-bar { width: 45%; min-height: 4px; border-radius: 4px 4px 1px 1px; transform-origin: bottom; animation: graphBarPulse 1s ease-in-out infinite alternate; }
        .wind-speed-bar { background: linear-gradient(to top, #0284c7, #38bdf8); box-shadow: 0 0 8px rgba(56,189,248,.4); }
        .gust-bar { background: linear-gradient(to top, #d97706, #fbbf24); box-shadow: 0 0 8px rgba(251,191,36,.35); animation-delay: .25s; }
        .wind-time { font-size: 9px; color: #e2e8f0; font-weight: 800; white-space: nowrap; }
        .graph-bottom-info { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-top: 13px; padding: 8px 10px; border-radius: 7px; background: rgba(2,6,23,.52); color: #dbeafe; font-size: 10px; font-weight: 800; }
        @keyframes graphPhotoMove { from { transform: scale(1.02) translate3d(-1%,0,0); } to { transform: scale(1.09) translate3d(1%,-1%,0); } }
        @keyframes graphBarPulse { from { filter: brightness(.92); } to { filter: brightness(1.15); } }

        .tides-view {
          background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
          padding: 24px; border-radius: 8px; border: 1px solid #bbf7d0; box-shadow: 0 4px 12px rgba(22,101,52,0.08); min-height: 380px;
        }
        .tides-photo-grid {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .tide-photo-card {
          position: relative;
          min-height: 190px;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,.8);
          box-shadow: 0 5px 14px rgba(15,23,42,.16);
          isolation: isolate;
          background: #0f172a;
        }
        .tide-photo-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: tidePhotoMove 5s ease-in-out infinite alternate;
          z-index: -2;
        }
        .tide-photo-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(2,6,23,.10), rgba(2,6,23,.78));
          z-index: -1;
        }
        .tide-photo-content {
          position: absolute;
          inset: auto 14px 13px;
          color: white;
          text-shadow: 0 2px 5px rgba(0,0,0,.45);
        }
        .tide-photo-label {
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 4px;
        }
        .tide-photo-time {
          font-size: 25px;
          font-weight: 950;
          letter-spacing: .5px;
        }
        .tide-photo-sub {
          margin-top: 3px;
          font-size: 10px;
          font-weight: 700;
          opacity: .9;
        }
        @keyframes tidePhotoMove {
          from { transform: scale(1.02) translate3d(-1%, 0, 0); }
          to { transform: scale(1.10) translate3d(1%, -1%, 0); }
        }
        @media (max-width: 800px) {
          .wg-15day-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .spot-grid { grid-template-columns: 1fr; }
          .panel-intro { align-items: flex-start; flex-wrap: wrap; }
          .panel-intro span { width: 100%; margin-left: 0; }
          .map-frame-wrap { height: 300px; }
          .map-actions { flex-direction: column; }
          .archive-top { align-items: flex-start; flex-direction: column; }

          .tides-photo-grid { grid-template-columns: 1fr; }
          .tide-photo-card { min-height: 170px; }
        }

        .modal-list-panel { display: flex; flex-direction: column; gap: 14px; }
        .panel-intro { display: flex; align-items: center; gap: 8px; color: #0f172a; font-size: 15px; }
        .panel-intro span { color: #64748b; font-size: 12px; font-weight: 600; margin-left: auto; }
        .spot-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .spot-card { display: flex; align-items: center; gap: 10px; text-align: left; background: #f8fafc; border: 1px solid #dbe4ee; border-radius: 10px; padding: 12px; cursor: pointer; color: #0f172a; }
        .spot-card:hover, .spot-card-active { border-color: #06b6d4; background: #ecfeff; }
        .spot-icon { font-size: 23px; }
        .spot-info { min-width: 0; display: flex; flex-direction: column; gap: 3px; flex: 1; }
        .spot-info strong, .spot-info small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .spot-info small { color: #64748b; font-size: 10px; }
        .home-badge { font-size: 15px; }
        .empty-panel { padding: 28px 16px; text-align: center; border: 1px dashed #cbd5e1; border-radius: 10px; background: #f8fafc; color: #64748b; font-weight: 700; line-height: 1.7; }
        .map-panel { display: flex; flex-direction: column; gap: 12px; }
        .map-frame-wrap { width: 100%; height: 390px; overflow: hidden; border-radius: 10px; border: 1px solid #cbd5e1; background: #e2e8f0; }
        .map-frame { width: 100%; height: 100%; border: 0; }
        .map-actions { display: flex; gap: 8px; }
        .primary-modal-btn, .secondary-modal-btn, .clear-archive-btn { border: 0; border-radius: 7px; padding: 9px 12px; font-weight: 800; cursor: pointer; text-decoration: none; font-size: 12px; }
        .primary-modal-btn { background: #0284c7; color: white; }
        .secondary-modal-btn { background: #e2e8f0; color: #0f172a; }
        .archive-top { display: flex; align-items: center; gap: 10px; }
        .archive-top .panel-intro { flex: 1; }
        .clear-archive-btn { background: #fee2e2; color: #b91c1c; }
        .archive-list { display: flex; flex-direction: column; gap: 7px; }
        .archive-item { width: 100%; display: flex; align-items: center; gap: 10px; border: 1px solid #e2e8f0; background: white; border-radius: 9px; padding: 11px; text-align: left; cursor: pointer; color: #0f172a; }
        .archive-item:hover { background: #f8fafc; border-color: #67e8f9; }
        .archive-item span:nth-child(2) { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .archive-item small { color: #64748b; font-size: 10px; }
        .archive-item b { color: #0891b2; font-size: 20px; }

        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 15px;
        }
        .modal-content {
          background: white; width: 100%; max-width: 580px; border-radius: 10px;
          overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: fadeIn 0.2s ease-in-out;
        }
        .morocco-weather-modal { max-width: 1100px; width: min(1100px, 96vw); }
        .morocco-weather-modal .modal-body { padding: 12px; background: #f8fafc; max-height: 82vh; }
        .morocco-weather-title { display:flex; align-items:center; gap:8px; min-width:0; }
        .morocco-weather-title small { display:block; color:#bae6fd; font-size:10px; font-weight:700; margin-top:2px; }
        .morocco-15day-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:9px; }
        .morocco-15day-card { border:1px solid #dbeafe; background:white; color:#0f172a; border-radius:11px; padding:10px 8px; min-height:155px; text-align:center; box-shadow:0 2px 8px rgba(15,23,42,.06); }
        .morocco-15day-card:hover { border-color:#38bdf8; transform:translateY(-1px); }
        .morocco-15day-date { font-size:11px; font-weight:900; color:#334155; }
        .morocco-15day-icon { font-size:29px; margin:7px 0 4px; line-height:1; }
        .morocco-15day-condition { min-height:24px; font-size:10px; font-weight:800; color:#0369a1; }
        .morocco-15day-temp { margin-top:5px; font-size:12px; color:#475569; }
        .morocco-15day-temp strong { color:#0284c7; font-size:19px; }
        .morocco-15day-meta { margin-top:6px; font-size:9px; font-weight:800; color:#64748b; line-height:1.5; }
        .morocco-15day-loading { text-align:center; padding:45px 15px; color:#64748b; font-weight:800; }
        @media (max-width: 800px) { .morocco-15day-grid { grid-template-columns:repeat(3,minmax(0,1fr)); } }
        @media (max-width: 520px) { .morocco-15day-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .morocco-weather-modal .modal-header { padding:11px 12px; } }
        .modal-header {
          background: #0f172a; color: white; padding: 14px 18px;
          display: flex; justify-content: space-between; align-items: center; font-weight: 900; font-size: 16px;
        }
        .modal-body { padding: 20px; max-height: 75vh; overflow-y: auto; }
        .settings-panel { display: flex; flex-direction: column; gap: 14px; }
        .settings-card { background: linear-gradient(135deg, #f8fafc, #eef7ff); border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; box-shadow: 0 3px 10px rgba(15,23,42,.06); }
        .settings-card-title { color: #0f172a; font-weight: 900; font-size: 14px; margin-bottom: 10px; }
        .settings-options-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
        .settings-speed-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .settings-option { position: relative; min-height: 58px; display: flex; align-items: center; gap: 9px; text-align: ${isRtl ? "right" : "left"}; border: 1px solid #cbd5e1; background: white; color: #334155; border-radius: 9px; padding: 9px 10px; cursor: pointer; transition: .18s ease; }
        .settings-option:hover { border-color: #38bdf8; transform: translateY(-1px); box-shadow: 0 4px 10px rgba(14,165,233,.12); }
        .settings-option-active { border-color: #0284c7 !important; background: linear-gradient(135deg, #e0f2fe, #f0f9ff) !important; color: #075985 !important; box-shadow: 0 0 0 2px rgba(14,165,233,.12); }
        .settings-option-icon { width: 30px; height: 30px; flex: 0 0 30px; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: #e0f2fe; font-size: 17px; }
        .settings-option strong { display: block; font-size: 12px; line-height: 1.2; }
        .settings-option small { display: block; margin-top: 2px; color: #64748b; font-size: 9px; font-weight: 700; }
        .settings-check { margin-left: auto; width: 21px; height: 21px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #0284c7; color: white; font-weight: 900; font-size: 12px; }
        .settings-saved { text-align: center; color: #047857; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 8px; font-size: 11px; font-weight: 800; }
        @media (max-width: 600px) { .settings-options-grid, .settings-speed-grid { grid-template-columns: 1fr; } }
        
        /* Compact desktop layout: cards stay informative without taking too much vertical space. */
        .live-card-icon { width:18px !important; height:18px !important; }
        .weather-tools-grid { gap:6px; padding:6px; }
        .wind-compass-panel, .smart-alerts-panel { min-height:104px; }
        .smart-alerts-list { gap:4px; margin-top:5px; }
        .smart-alert { padding:4px; gap:4px; }
        .smart-alert-icon { font-size:15px; }
        @media (max-width: 1050px) {
          .live-weather-cards { grid-template-columns: repeat(3, minmax(120px, 1fr)); }
        }
        @media (max-width: 700px) {
          .live-weather-cards { grid-template-columns: repeat(2, minmax(120px, 1fr)); }
          .live-card { min-height:96px; padding:8px; }
        }

        /* Compact live weather cards */
        .live-weather-cards { grid-template-columns: repeat(6, minmax(105px, 1fr)); gap: 5px; padding: 5px; }
        .live-card { min-height: 88px; padding: 7px; border-radius: 7px; }
        .live-card-photo img { inset: -7px; width: calc(100% + 14px); height: calc(100% + 14px); opacity: .65; }
        .live-card-head { gap: 4px; font-size: 9px; }
        .live-card-value { margin-top: 2px; font-size: 18px; letter-spacing: -.4px; }
        .live-card-value span { font-size: 9px !important; }
        .live-card-sub { margin-top: 1px; font-size: 8px; }
        .live-meter { left: 7px; right: 7px; bottom: 6px; height: 4px; }
        .live-orbit { width: 34px; height: 34px; margin-top: 3px; border-width: 2px; }
        @media (max-width: 1050px) {
          .live-weather-cards { grid-template-columns: repeat(3, minmax(105px, 1fr)); }
        }
        @media (max-width: 700px) {
          .live-weather-cards { grid-template-columns: repeat(2, minmax(110px, 1fr)); gap: 4px; padding: 4px; }
          .live-card { min-height: 82px; padding: 6px; }
          .live-card-value { font-size: 17px; }
          .live-card-sub { font-size: 7.5px; }
        }

@keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .live-weather-cards {
          display: grid;
          grid-template-columns: repeat(6, minmax(125px, 1fr));
          gap: 6px;
          padding: 6px;
          background: #f1f5f9;
        }
        .live-card {
          position: relative;
          min-height: 104px;
          overflow: hidden;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 9px;
          background: #0f172a;
          box-shadow: 0 3px 10px rgba(15,23,42,.08);
          isolation: isolate;
          color: white;
        }
        .live-card-photo {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .live-card-photo img {
          position: absolute;
          inset: -10px;
          width: calc(100% + 20px);
          height: calc(100% + 20px);
          object-fit: cover;
          object-position: center;
          display: block;
          opacity: .72;
          filter: saturate(1.08) contrast(1.04);
          animation: livePhotoMove 1s ease-in-out infinite alternate;
          will-change: transform;
        }
        .live-card-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(2,6,23,.78), rgba(2,132,199,.18), rgba(2,6,23,.72));
        }
        .live-card::before {
          content: "";
          position: absolute;
          width: 90px; height: 90px;
          right: -25px; top: -35px;
          border-radius: 50%;
          background: rgba(34,211,238,.18);
          filter: blur(4px);
          animation: liveGlow 2s ease-in-out infinite;
          z-index: -1;
        }
        .live-card-head {
          display: flex; align-items: center; gap: 5px;
          color: #ffffff; font-weight: 800; font-size: 10px;
          position: relative; z-index: 2;
          text-shadow: 0 1px 3px rgba(0,0,0,.55);
        }
        .live-card-value {
          display: flex; align-items: baseline; gap: 3px;
          margin-top: 4px; color: #ffffff;
          font-size: 21px; font-weight: 900;
          letter-spacing: -.5px;
          position: relative; z-index: 2;
          text-shadow: 0 2px 5px rgba(0,0,0,.7);
        }
        .live-card-sub {
          margin-top: 2px; color: #e0f2fe; font-size: 9px; font-weight: 700;
          position: relative; z-index: 2;
          text-shadow: 0 1px 3px rgba(0,0,0,.65);
        }
        .live-meter {
          position: absolute; left: 9px; right: 9px; bottom: 8px;
          height: 5px; border-radius: 99px; background: #dbeafe; overflow: hidden;
        }
        .live-meter span {
          display: block; height: 100%; border-radius: inherit;
          width: 45%; background: linear-gradient(90deg, #22d3ee, #0284c7);
          transform-origin: left center;
          animation: liveMeter 1s ease-in-out infinite alternate;
        }
        .live-orbit {
          width: 44px; height: 44px; margin-top: 5px;
          border: 3px solid #bae6fd; border-top-color: #0284c7;
          border-radius: 50%;
          animation: liveSpin 1.5s linear infinite;
        }
        .live-wave {
          position: absolute; left: -30%; right: -30%; bottom: -4px; height: 28px;
          background: repeating-linear-gradient(
            -45deg, transparent 0 12px, rgba(14,165,233,.22) 12px 20px
          );
          transform: translateX(calc(var(--wave-offset) * 1px));
          animation: liveWave 1.2s linear infinite;
          z-index: -1;
        }
        @keyframes livePhotoMove {
          0% { transform: scale(1.02) translate3d(-2px, 0, 0); }
          50% { transform: scale(1.06) translate3d(2px, -1px, 0); }
          100% { transform: scale(1.03) translate3d(0, 2px, 0); }
        }
        @keyframes liveGlow {
          0%,100% { transform: scale(.85); opacity: .5; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes liveMeter {
          from { transform: scaleX(.72); }
          to { transform: scaleX(1); }
        }
        @keyframes liveSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes liveWave {
          from { transform: translateX(-35px); }
          to { transform: translateX(35px); }
        }
        .wg-morocco-cities {
          margin: 16px auto 22px;
          max-width: 1600px;
          padding: 0 12px;
        }
        .wg-morocco-cities-panel {
          background: linear-gradient(135deg, #07111f, #102a43 55%, #063b4c);
          border: 1px solid rgba(34,211,238,.32);
          border-radius: 14px;
          padding: 13px;
          box-shadow: 0 12px 35px rgba(15,23,42,.18);
          overflow: hidden;
        }
        .wg-morocco-cities-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
          color: white;
        }
        .wg-morocco-cities-title { font-size: 17px; font-weight: 900; }
        .wg-morocco-cities-subtitle { color: #bae6fd; font-size: 10px; margin-top: 3px; }
        .wg-morocco-cities-search {
          width: min(290px, 100%);
          height: 34px;
          border-radius: 9px;
          border: 1px solid #31556d;
          background: #102a43;
          color: white;
          padding: 0 12px;
          outline: none;
        }
        .wg-morocco-cities-search:focus { border-color: #22d3ee; box-shadow: 0 0 0 2px rgba(34,211,238,.14); }
        .wg-morocco-cities-grid {
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          gap: 6px;
          max-height: 285px;
          overflow-y: auto;
          padding-right: 2px;
        }
        .wg-morocco-city-btn {
          border: 1px solid rgba(125,211,252,.18);
          background: rgba(15,23,42,.46);
          color: #f8fafc;
          border-radius: 8px;
          min-height: 58px;
          padding: 5px 6px;
          cursor: pointer;
          text-align: center;
          font-weight: 800;
          transition: transform .15s ease, background .15s ease, border-color .15s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }
        .wg-city-name {
          font-size: 11px;
          font-weight: 900;
          line-height: 1.2;
        }
        .wg-city-weather {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-height: 24px;
          flex-wrap: wrap;
        }
        .wg-city-weather-icon { font-size: 16px; line-height: 1; }
        .wg-city-temp { color: #67e8f9; font-size: 12px; font-weight: 950; }
        .wg-city-condition { width: 100%; color: #bae6fd; font-size: 8px; font-weight: 700; line-height: 1.1; }
        .wg-city-weather-loading { color: #94a3b8; font-size: 10px; min-height: 18px; display: flex; align-items: center; }
        .wg-morocco-city-btn:hover {
          transform: translateY(-2px);
          background: rgba(14,165,233,.22);
          border-color: rgba(34,211,238,.65);
        }
        .wg-morocco-city-btn:active { transform: translateY(0); }
        .wg-morocco-city-search-any {
          grid-column: 1 / -1;
          padding: 16px;
          border: 1px dashed rgba(125,211,252,.42);
          border-radius: 10px;
          background: rgba(14,165,233,.08);
          text-align: center;
          color: #e0f2fe;
        }
        .wg-morocco-city-search-any-title { font-size: 14px; font-weight: 900; }
        .wg-morocco-city-search-any-sub { margin-top: 5px; font-size: 11px; color: #bae6fd; }
        .wg-morocco-city-search-any-btn {
          margin-top: 10px;
          border: 1px solid rgba(34,211,238,.65);
          background: #0369a1;
          color: white;
          border-radius: 8px;
          padding: 8px 13px;
          cursor: pointer;
          font-weight: 900;
          font-size: 11px;
        }
        .wg-morocco-city-search-any-btn:hover { background: #0284c7; }
        .wg-morocco-city-search-any-btn:disabled { opacity: .65; cursor: wait; }

        .wg-morocco-city-empty {
          color: #bae6fd;
          text-align: center;
          padding: 25px 10px;
          grid-column: 1 / -1;
        }
        @media (max-width: 1200px) {
          .wg-15day-grid { grid-template-columns:repeat(4,minmax(0,1fr)); }
          .wg-morocco-cities-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); max-height: 250px; }
        }
        @media (max-width: 1050px) {
          .live-weather-cards { grid-template-columns: repeat(3, minmax(150px, 1fr)); }
        }
        @media (max-width: 800px) {
          .wg-header { padding: 7px 9px; position: relative; }
          .wg-header-main { flex-wrap: wrap; gap: 7px; }
          .mobile-menu-button { display: flex; }
          .wg-nav, .wg-sun { display: none; }
          .wg-search { order: 5; width: 100%; flex-basis: 100%; }
          .wg-search input { height: 38px; font-size: 13px; }
          .mobile-menu { display: flex; flex-direction: column; gap: 4px; width: 100%; margin-top: 5px; padding-top: 6px; border-top: 1px solid #29465b; }
          .mobile-menu button { background: #132d41; color: #dbeafe; border: 0; padding: 9px; border-radius: 5px; text-align: left; }
          .favorites-bar { padding: 6px 8px; }
          .location-bar { padding: 8px; align-items: flex-start; flex-direction: column; }
          .location-name { width: 100%; font-size: 13px; }
          .loading { font-size: 11px; }
          .tabs { padding: 5px; }
          .tab { padding: 7px 9px; }
          .main { padding: 4px; }
          .forecast-container { border-radius: 4px; }
          .mobile-hint { display: block; background: #ecfeff; color: #155e75; padding: 6px 8px; font-size: 10px; text-align: center; font-weight: 800; border-bottom: 1px solid #bae6fd; }
          .weather-table { min-width: 1180px; }
          .weather-table .row-title { width: 155px; min-width: 155px; font-size: 10px; ${isRtl ? "padding-right: 7px;" : "padding-left: 7px;"} }
          .weather-table td { height: 29px; padding: 3px; }
          .hour-cell { min-width: 43px; }
          .live-weather-cards { grid-template-columns: repeat(2, minmax(140px, 1fr)); padding: 5px; gap: 5px; }
          .live-card { min-height: 118px; padding: 10px; }
          .live-card-value { font-size: 22px; }
          .weather-tools-grid { grid-template-columns: 1fr; }
          .wind-compass { width:105px; height:105px; flex-basis:105px; }
          .compass-needle { height:39px; margin-top:-39px; }
          .smart-alerts-list { grid-template-columns:1fr 1fr; }
          .wg-morocco-cities { padding: 0 7px; }
          .wg-morocco-cities-panel { padding: 10px; }
          .wg-morocco-cities-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); max-height: 220px; gap: 5px; }
          .wg-morocco-city-btn { min-height: 54px; }
          .wg-city-name { font-size: 10px; }
          .wg-morocco-cities-head { flex-direction: column; align-items: stretch; }
          .wg-morocco-cities-search { width: 100%; }
        }

        /* ===== Windgure — unified sizing & spacing ===== */
        .main { width:100%; max-width:1600px; margin:0 auto; padding:8px 10px 18px; box-sizing:border-box; }
        .main > section,
        .main > .wg-morocco-cities,
        .main > .wg-atmosphere-map,
        .main > .weather-tools-grid,
        .main > .live-weather-cards,
        .main > .weather-table-wrap,
        .main > .graph-view,
        .main > .tides-view { box-sizing:border-box; width:100%; }

        /* Equal visual rhythm for all main panels */
        .live-weather-cards,
        .weather-tools-grid { align-items:stretch; }
        .live-card,
        .wind-compass-panel,
        .smart-alerts-panel,
        .graph-view,
        .tides-view,
        .map-panel,
        .settings-panel,
        .wg-morocco-cities-panel,
        .wg-atmosphere-map { box-sizing:border-box; }

        .live-card,
        .wind-compass-panel,
        .smart-alerts-panel { height:108px; min-height:108px; }
        .weather-tools-grid { grid-auto-rows:1fr; }
        .weather-tools-grid > * { min-width:0; height:100%; }

        .spot-grid,
        .tides-photo-grid,
        .wg-morocco-cities-grid { align-items:stretch; }
        .spot-card,
        .tide-photo-card,
        .wg-morocco-city-btn { height:100%; box-sizing:border-box; }
        .tide-photo-card { min-height:180px; }

        /* Same outer width and controlled heights for the large sections */
        .graph-view,
        .tides-view,
        .map-panel,
        .settings-panel { width:100%; box-sizing:border-box; }
        .map-frame-wrap { width:100%; height:390px; }
        .wg-atmosphere-frame { width:100%; height:430px; }

        /* City cards: one consistent size, no oversized/undersized cards */
        .wg-morocco-city-btn { min-height:62px; height:62px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; }
        .wg-city-name { line-height:1.15; font-size:12px; font-weight:900; min-height:14px; }
        .wg-city-weather { min-height:20px; display:flex; align-items:center; justify-content:center; gap:4px; width:100%; }
        .wg-city-weather-icon { font-size:16px; line-height:1; }
        .wg-city-temp { font-size:12px; font-weight:900; }
        .wg-city-condition { max-width:72px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:8px; opacity:.82; }
        .wg-city-weather-loading { height:20px; display:flex; align-items:center; justify-content:center; font-size:11px; }

        /* 15-day modal cards are equal too */
        .morocco-15day-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:7px; align-items:stretch; }
        .morocco-15day-card { min-height:150px; height:100%; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; }

        /* Prevent long labels from changing the layout */
        .tool-title,.tool-subtitle,.panel-intro,.wg-atmosphere-title,.wg-atmosphere-subtitle { overflow:hidden; text-overflow:ellipsis; }

        @media (max-width:1200px) {
          .main { max-width:1200px; }
          .live-weather-cards { grid-template-columns:repeat(3,minmax(0,1fr)); }
          .wg-morocco-cities-grid { grid-template-columns:repeat(6,minmax(0,1fr)); }
        }
        @media (max-width:800px) {
          .main { padding:6px 7px 14px; }
          .live-weather-cards { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .live-card,.wind-compass-panel,.smart-alerts-panel { height:100px; min-height:100px; }
          .weather-tools-grid { grid-template-columns:1fr; }
          .wg-morocco-cities-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
          .wg-morocco-city-btn { height:60px; min-height:60px; }
          .morocco-15day-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .map-frame-wrap { height:320px; }
          .wg-atmosphere-frame { height:330px; }
        }
        @media (max-width:480px) {
          .live-weather-cards { grid-template-columns:repeat(2,minmax(0,1fr)); gap:4px; padding:4px; }
          .live-card { height:92px; min-height:92px; padding:6px; }
          .wg-morocco-cities { padding:0 4px; }
          .wg-morocco-cities-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:5px; }
          .wg-morocco-city-btn { height:58px; min-height:58px; }
          .spot-grid,.tides-photo-grid { grid-template-columns:1fr; }
          .tide-photo-card { min-height:160px; }
        }

/* 📍 Windgure earthquake location modal */
.wg-earthquake-location-modal{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(2,6,23,.68);backdrop-filter:blur(7px)}
.wg-earthquake-location-modal.show{display:flex}
.wg-earthquake-location-panel{position:relative;width:min(900px,100%);overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:#07111f;box-shadow:0 30px 90px rgba(0,0,0,.42)}
.wg-eq-detail-brand{display:flex;align-items:center;gap:7px;padding:9px 13px;background:#07111f;color:#e2e8f0;border-bottom:1px solid rgba(255,255,255,.08);font-size:10px}.wg-eq-detail-brand strong{font-size:13px;letter-spacing:.2px}.wg-eq-detail-brand strong span{color:#22d3ee}.wg-eq-detail-brand>span:last-child{margin-left:auto;color:#94a3b8;font-size:8px}.wg-eq-brand-mark{width:26px;height:26px;display:grid;place-items:center;border-radius:7px;background:linear-gradient(135deg,#00d9ff,#0284c7);color:#07111f}
.wg-earthquake-location-close{position:absolute;top:12px;right:12px;z-index:5;width:38px;height:38px;border:1px solid rgba(255,255,255,.15);border-radius:50%;background:rgba(255,255,255,.10);color:#fff;font-size:25px;line-height:1;cursor:pointer}
.wg-eq-detail-header{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:22px 56px 20px 20px;background:linear-gradient(135deg,#0f172a,#1e293b,#450a0a);color:#fff}
.wg-eq-detail-heading{min-width:0}.wg-eq-detail-label{font-size:9px;color:#94a3b8;margin-bottom:5px}.wg-eq-detail-country{font-size:13px;font-weight:950;margin-bottom:4px}.wg-eq-detail-place{font-size:17px;font-weight:900;max-width:650px;word-break:break-word}
.wg-eq-detail-mag{width:78px;height:78px;flex:0 0 78px;display:grid;place-items:center;border-radius:50%;background:#dc2626;color:#fff;font-size:21px;font-weight:950;box-shadow:0 0 0 8px rgba(220,38,38,.14)}
.wg-eq-detail-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.08)}.wg-eq-detail-stats>div{padding:12px 14px;background:#0b1727;min-width:0}.wg-eq-detail-stats small{display:block;color:#64748b;font-size:8px;margin-bottom:4px}.wg-eq-detail-stats strong{display:block;color:#e2e8f0;font-size:10px;word-break:break-word}
.wg-earthquake-detail-map{width:100%;height:430px;background:#e8eef5;border-top:1px solid rgba(15,23,42,.08)}.wg-earthquake-detail-map .leaflet-container{background:#e8eef5}.wg-earthquake-detail-map .leaflet-popup-content-wrapper{border-radius:12px;box-shadow:0 10px 30px rgba(15,23,42,.18)}.wg-earthquake-detail-map .leaflet-popup-content{font-family:Arial,sans-serif;font-size:11px;line-height:1.55;margin:11px 13px}.wg-earthquake-detail-map .leaflet-control-zoom a{background:#fff;color:#334155;border-color:#cbd5e1}.wg-earthquake-detail-map .leaflet-control-attribution{background:rgba(255,255,255,.9);color:#64748b}.wg-earthquake-detail-map .leaflet-control-attribution a{color:#2563eb}.wg-eq-detail-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 13px;color:#64748b;background:#f8fafc;font-size:8px}.wg-eq-detail-footer a{color:#fca5a5;text-decoration:none;font-weight:900}.wg-earthquake-map-error{height:100%;display:grid;place-items:center;color:#94a3b8;font-size:10px}
.wg-earthquake-card{cursor:pointer}.wg-earthquake-card:focus{outline:2px solid rgba(239,68,68,.35);outline-offset:-2px}.wg-earthquake-card:hover{background:rgba(239,68,68,.045)}
@media(max-width:700px){.wg-earthquake-location-modal{padding:9px}.wg-earthquake-location-panel{border-radius:15px}.wg-eq-detail-header{padding:17px 48px 16px 14px}.wg-eq-detail-place{font-size:12px}.wg-eq-detail-country{font-size:11px}.wg-eq-detail-mag{width:62px;height:62px;flex-basis:62px;font-size:17px}.wg-eq-detail-stats{grid-template-columns:repeat(2,1fr)}.wg-earthquake-detail-map{height:350px}.wg-eq-detail-footer{font-size:7px}}

/* 🌍 Windgure earthquake list — simple background, no outer frame */
.wg-earthquake-section{margin:24px 0 28px;background:transparent;border:0;border-radius:0;box-shadow:none;overflow:visible}
.wg-earthquake-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:4px 2px 13px;background:transparent;border:0;color:inherit}
.wg-earthquake-title-row{display:flex;align-items:center;gap:11px;min-width:0}.wg-earthquake-logo{width:38px;height:38px;display:grid;place-items:center;flex:0 0 38px;border-radius:12px;background:rgba(239,68,68,.10);font-size:19px}.wg-earthquake-title{font-size:17px;font-weight:950;color:#0f172a}.wg-earthquake-subtitle{margin-top:3px;font-size:8.5px;color:#64748b}
.wg-earthquake-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap;justify-content:flex-end}.wg-earthquake-status{display:flex;align-items:center;gap:6px;padding:6px 9px;border-radius:999px;background:rgba(15,23,42,.045);font-size:8px;font-weight:900;color:#475569}.wg-earthquake-notify-btn{border:1px solid rgba(239,68,68,.18);border-radius:999px;padding:7px 10px;background:rgba(239,68,68,.07);color:#b91c1c;font-size:8px;font-weight:950;cursor:pointer}.wg-earthquake-notify-btn:hover{background:rgba(239,68,68,.13)}.wg-earthquake-notify-btn:disabled{opacity:.55;cursor:not-allowed}.wg-earthquake-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:wgEqLive 1.3s ease-in-out infinite}
@keyframes wgEqLive{50%{transform:scale(1.5);opacity:.55}}
.wg-earthquake-alert{display:none;align-items:center;gap:10px;margin:0 0 10px;padding:10px 12px;color:#7f1d1d;background:#fff7f7;border-left:3px solid #ef4444;border-radius:10px}.wg-earthquake-alert.show{display:flex}.wg-earthquake-alert strong,.wg-earthquake-alert span{display:block}.wg-earthquake-alert strong{font-size:11px}.wg-earthquake-alert span:not(.wg-eq-alert-icon){margin-top:2px;font-size:8px;color:#991b1b}.wg-eq-alert-icon{font-size:19px}.wg-eq-alert-close{margin-inline-start:auto;width:25px;height:25px;border:0;border-radius:50%;background:rgba(127,29,29,.07);color:#991b1b;font-size:16px;cursor:pointer}
.wg-earthquake-list{display:flex;flex-direction:column;background:transparent;padding:0;gap:0}
.wg-earthquake-card{display:grid;grid-template-columns:68px minmax(0,1fr) auto;align-items:center;gap:14px;min-width:0;padding:13px 4px;border-bottom:1px solid rgba(148,163,184,.16);background:transparent;transition:background .16s ease}.wg-earthquake-card:first-child{border-top:1px solid rgba(148,163,184,.16)}.wg-earthquake-card:hover{background:rgba(148,163,184,.035)}
.wg-eq-left{display:flex;flex-direction:column;align-items:center;gap:5px}.wg-eq-magnitude{width:58px;height:38px;display:grid;place-items:center;border-radius:10px;color:#fff;font-size:14px;font-weight:950}.wg-eq-mag-small{background:#15803d}.wg-eq-mag-low{background:#a16207}.wg-eq-mag-medium{background:#c2410c}.wg-eq-mag-high{background:#dc2626}.wg-eq-mag-critical{background:#991b1b}.wg-eq-time{font-size:7px;color:#94a3b8;text-align:center;white-space:nowrap}
.wg-eq-main{min-width:0}.wg-eq-country{display:flex;align-items:center;gap:8px;min-width:0}.wg-eq-flag{font-size:24px;line-height:1;flex:0 0 auto}.wg-eq-country strong{display:block;font-size:11px;color:#0f172a;font-weight:950;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wg-eq-country span:not(.wg-eq-flag){display:block;margin-top:2px;font-size:8px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wg-eq-place{margin-top:4px;font-size:8px;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wg-eq-meta{display:flex;flex-wrap:wrap;gap:11px;margin-top:6px;color:#94a3b8;font-size:7px}.wg-eq-meta b{color:#475569;font-weight:850}.wg-eq-usgs{font-size:7.5px;font-weight:950;color:#b91c1c;text-decoration:none;white-space:nowrap;padding:5px 7px;border-radius:7px;background:rgba(239,68,68,.06)}.wg-eq-usgs:hover{background:rgba(239,68,68,.12)}
.wg-earthquake-empty{padding:28px 10px;text-align:center;color:#64748b;font-size:9px}.wg-earthquake-note{padding:9px 2px;color:#94a3b8;background:transparent;font-size:7px;line-height:1.5}
@media(max-width:700px){.wg-earthquake-section{margin:14px 0 18px}.wg-earthquake-head{padding-bottom:10px;align-items:flex-start;flex-direction:column}.wg-earthquake-title-row{width:100%}.wg-earthquake-actions{width:100%;justify-content:flex-start}.wg-earthquake-title{font-size:13px}.wg-earthquake-subtitle{font-size:7px}.wg-earthquake-card{grid-template-columns:52px minmax(0,1fr) auto;gap:9px;padding:11px 2px}.wg-eq-magnitude{width:50px;height:34px;font-size:12px}.wg-eq-flag{font-size:20px}.wg-eq-country strong{font-size:9.5px}.wg-eq-country span:not(.wg-eq-flag),.wg-eq-place{font-size:7px}.wg-eq-meta{gap:7px;font-size:6.5px}.wg-eq-usgs{font-size:6.5px;padding:4px 5px}.wg-eq-time{font-size:6.5px}}
      `}</style>

      {/* HEADER */}
      <header className="wg-header">
        <div className="wg-header-main">
          <div className="wg-logo" onClick={goToHomeSpot}>
            <div className="wg-logo-icon">
              <Compass size={22} />
            </div>
            <div className="wg-logo-text">
              wind<span>gure</span>
            </div>
          </div>

          <button className="home-btn" onClick={goToHomeSpot} title={t.home}>
            <Home size={15} />
            <span>{t.home}</span>
          </button>

          <button className="gps-btn" onClick={getGpsLocation} title={t.gps}>
            <Navigation size={15} />
            <span>{t.gps}</span>
          </button>

          <form className="wg-search" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
            />
            <button type="submit" className="search-submit" aria-label="Search" title="Search">
              <Search size={16} />
            </button>

            {(searchSuggestionsLoading || searchSuggestions.length > 0) && searchQuery.trim().length >= 2 && (
              <div className="search-suggestions">
                {searchSuggestionsLoading && searchSuggestions.length === 0 ? (
                  <div className="search-suggestions-loading">جاري البحث عن المدن...</div>
                ) : (
                  searchSuggestions.map((spot, index) => (
                    <button
                      type="button"
                      className="search-suggestion"
                      key={`${spot.id || spot.latitude}-${spot.longitude}-${index}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectSearchSuggestion(spot)}
                    >
                      <MapPin size={15} className="search-suggestion-icon" />
                      <span className="search-suggestion-main">
                        <span className="search-suggestion-name">{spot.name}</span>
                        <span className="search-suggestion-meta">
                          {[spot.type === "village" || spot.type === "hamlet" ? "قرية/دوار" : spot.type, spot.admin1, spot.country].filter(Boolean).join(" • ")}
                        </span>
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </form>

          <nav className="wg-nav">
            <button onClick={() => setActiveModal("spots")}>📍 {t.spots}</button>
            <button onClick={() => setActiveModal("maps")}>🗺️ {t.maps}</button>
            <button onClick={() => setActiveModal("archive")}>📁 {t.archive}</button>
            <button onClick={() => setActiveModal("options")}>⚙️ {t.options}</button>
          </nav>

          <div className="wg-sun">
            <span>☀️ {sunTimes.sunrise} - {sunTimes.sunset}</span>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

          {mobileMenu && (
            <div className="mobile-menu">
              <button onClick={goToHomeSpot}>🏠 {t.home}</button>
              <button onClick={getGpsLocation}>📍 {t.gps}</button>
              <button onClick={() => { setActiveModal("spots"); setMobileMenu(false); }}>📍 {t.spots}</button>
              <button onClick={() => { setActiveModal("maps"); setMobileMenu(false); }}>🗺️ {t.maps}</button>
              <button onClick={() => { setActiveModal("archive"); setMobileMenu(false); }}>📁 {t.archive}</button>
              <button onClick={() => { setActiveModal("options"); setMobileMenu(false); }}>⚙️ {t.options}</button>
            </div>
          )}
        </div>
      </header>

      {/* FAVORITES BAR */}
      <div className="favorites-bar">
        <span className="favorite-title">{t.favorites}</span>
        {favorites.map((fav, index) => {
          const isActive = fav.name === locationName;
          return (
            <div
              key={index}
              className={`favorite-chip ${isActive ? "favorite-chip-active" : ""}`}
              onClick={() => selectFavorite(fav)}
            >
              <MapPin size={12} />
              <span>{fav.name}</span>
              <button
                className="favorite-delete"
                onClick={(e) => removeFavoriteByName(e, fav.name)}
                title="حذف"
              >
                <Trash2 size={12} />
              </button>
            </div>
          );
        })}
      </div>

      {/* AD BANNER TOP */}

      {/* LOCATION & CONTROL BAR */}
      <div className="location-bar">
        <div className="location-name">
          <button className="favorite-star" onClick={toggleFavorite}>
            <Star
              size={20}
              fill={isFavorite ? "#facc15" : "none"}
              color={isFavorite ? "#facc15" : "#64748b"}
            />
          </button>
          <span>{locationName}</span>
          {isHomeSpot ? (
            <span style={{ fontSize: "11px", color: "#0284c7", fontWeight: "bold" }}>
              ({t.currentHome})
            </span>
          ) : (
            <button className="set-home-link" onClick={setAsHomeSpot}>
              <Home size={12} />
              <span>{t.setHome}</span>
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {loading && (
            <div className="loading">
              <Loader2 size={16} className="animate-spin" />
              <span>جاري التحميل...</span>
            </div>
          )}
          <button className="set-home-link" onClick={shareLocation}>
            <Share2 size={13} />
            <span>{t.share}</span>
          </button>
        </div>
      </div>

      {/* LIVE WEATHER CARDS - تتغير الحركة كل ثانية، والبيانات مأخوذة من API */}
      <section className="live-weather-cards">
        <div className="live-card">
          <div className="live-card-photo"><img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85" alt="Weather" /></div>
          <div className="live-card-head">🌡️ درجة الحرارة</div>
          <div className="live-card-value">{liveTemperature !== undefined ? `${Math.round(liveTemperature)}°` : "-"}<span style={{ fontSize: "12px" }}>C</span></div>
          <div className="live-card-sub">Live • حركة كل ثانية</div>
          <div className="live-meter"><span style={{ transform: `scaleX(${Math.max(.15, Math.min(1, ((liveTemperature ?? 20) + 10) / 50))})` }} /></div>
        </div>

        <div className="live-card">
          <div className="live-card-photo"><img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85" alt="Rain and weather" /></div>
          <div className="live-card-head">💧 الرطوبة</div>
          <div className="live-card-value">{liveHumidity !== undefined ? Math.round(liveHumidity) : "-"}<span style={{ fontSize: "12px" }}>%</span></div>
          <div className="live-card-sub">💧 مؤشر متحرك</div>
          <div className="live-meter"><span style={{ transform: `scaleX(${Math.max(.05, (liveHumidity ?? 50) / 100)})` }} /></div>
        </div>

        <div className="live-card">
          <div className="live-card-photo"><img src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=85" alt="Clouds" /></div>
          <div className="live-card-head">🧭 الضغط</div>
          <div className="live-card-value">{livePressure !== undefined ? Math.round(livePressure) : "-"}<span style={{ fontSize: "11px" }}>hPa</span></div>
          <div className="live-orbit" style={{ animationDuration: `${Math.max(.8, 2 - livePulse)}s` }} />
        </div>

        <div className="live-card">
          <div className="live-card-photo"><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85" alt="Sunny ocean" /></div>
          <div className="live-card-head">☀️ UV Index</div>
          <div className="live-card-value">{liveUv !== undefined ? Number(liveUv).toFixed(1) : "-"}</div>
          <div className="live-card-sub">توهج يتغير كل ثانية</div>
          <div className="live-meter"><span style={{ transform: `scaleX(${Math.max(.08, Math.min(1, (liveUv ?? 0) / 12))})` }} /></div>
        </div>

        <div className="live-card">
          <div className="live-card-photo"><img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85" alt="Clear landscape" /></div>
          <div className="live-card-head">👁️ الرؤية</div>
          <div className="live-card-value">{formatVisibility(liveVisibility)}</div>
          <div className="live-card-sub">تأثير بصري حي</div>
          <div className="live-meter"><span style={{ transform: `scaleX(${Math.max(.08, Math.min(1, (liveVisibility ?? 0) / 10000))})` }} /></div>
        </div>

        <div className="live-card">
          <div className="live-card-photo"><img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85" alt="Ocean waves" /></div>
          <div className="live-card-head">🌊 حرارة سطح البحر</div>
          <div className="live-card-value">{liveSeaTemp !== undefined ? Number(liveSeaTemp).toFixed(1) : "-"}<span style={{ fontSize: "12px" }}>°C</span></div>
          <div className="live-card-sub">🌊 أمواج متحركة</div>
          <div className="live-wave" style={{ "--wave-offset": liveWaveOffset }} />
        </div>
      </section>

      <section className="weather-tools-grid">
        <div className="wind-compass-panel">
          <div className="compass-info">
            <div className="tool-title">🧭 {t.windCompass}</div>
            <div className="tool-subtitle">{t.windDir}: <strong>{getDirectionLabel(liveWindDirection)}</strong> · {Math.round(liveWindDirection ?? 0)}°</div>
            <div className="compass-speed">{liveWindSpeed != null ? Number(liveWindSpeed).toFixed(1) : "-"} <span>{speedUnit}</span></div>
            <div className="tool-subtitle">💨 {t.windGusts}: {liveWindGust != null ? Number(liveWindGust).toFixed(1) : "-"} {speedUnit}</div>
          </div>
          <div className="wind-compass" aria-label={t.windCompass}>
            <span className="compass-label compass-n">N</span><span className="compass-label compass-e">E</span>
            <span className="compass-label compass-s">S</span><span className="compass-label compass-w">W</span>
            <div className="compass-needle" style={{ transform: `rotate(${Number(liveWindDirection || 0)}deg)` }} />
            <div className="compass-center" />
          </div>
        </div>

        <div className="smart-alerts-panel">
          <div className="smart-alerts-head">
            <div>🚨 {t.smartAlerts}</div>
            <span>{smartAlerts.length}</span>
          </div>
          {smartAlerts.length === 0 ? (
            <div className="no-alerts">✓ {t.noAlerts}</div>
          ) : (
            <div className="smart-alerts-list">
              {smartAlerts.slice(0, 4).map((alert, index) => (
                <div key={`${alert.text}-${index}`} className={`smart-alert ${alert.level}`}>
                  <span className="smart-alert-icon">{alert.icon}</span>
                  <div className="smart-alert-text"><strong>{alert.text}</strong><small>{alert.value}</small></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TABS */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "forecast" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("forecast")}
        >
          <CloudSun size={15} strokeWidth={2.3} />
          <span>{t.forecast}</span>
        </button>
        <button
          className={`tab ${activeTab === "graph" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("graph")}
        >
          <TrendingUp size={15} strokeWidth={2.3} />
          <span>{t.graph}</span>
        </button>
        <button
          className={`tab ${activeTab === "tides" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("tides")}
        >
          <Waves size={15} strokeWidth={2.3} />
          <span>{t.tides}</span>
        </button>
        <button
          className={`tab earthquake-tab ${activeTab === "earthquakes" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("earthquakes")}
          aria-label={t.earthquakes}
        >
          <Activity size={15} strokeWidth={2.5} />
          <span>{t.earthquakes}</span>
          <span id="wg-earthquake-tab-count" className="earthquake-tab-count">—</span>
        </button>
      </div>

      {/* DAYS SELECTOR BAR — غير لصفحات الطقس */}
      {activeTab !== "earthquakes" && <div className="days-bar">
        <span style={{ fontWeight: 800, fontSize: "11px", color: "#475569" }}>
          <Calendar size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {t.selectDay}
        </span>
        {availableDays.map((d) => (
          <button
            key={d.index}
            className={`day-btn ${selectedDayIndex === d.index ? "day-btn-active" : ""}`}
            onClick={() => setSelectedDayIndex(d.index)}
          >
            {d.label}
          </button>
        ))}
      </div>}


      {/* MAIN CONTENT */}
      <main className="main">
        {activeTab === "forecast" && (
          <div className="forecast-container">
            <div className="mobile-hint">⬅️ اسحب الجدول أفقياً لرؤية باقي الساعات ➡️</div>
            <div className="table-scroll">
              <table className="weather-table">
                <thead>
                  <tr>
                    <td className="row-title">الساعة (UTC)</td>
                    {weatherData?.hourly?.time
                      ?.slice(startIndex, endIndex)
                      .map((tStr, idx) => (
                        <td key={idx} className="hour-cell" style={{ fontWeight: "900", background: "#f1f5f9" }}>
                          {tStr.split("T")[1]?.slice(0, 2)}h
                        </td>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {/* --- سرعة الرياح --- */}
                  <tr>
                    <td className="row-title">🍃 {t.windSpeed} ({speedUnit})</td>
                    {weatherData?.hourly?.wind_speed_10m
                      ?.slice(startIndex, endIndex)
                      .map((val, idx) => (
                        <td key={idx} style={getWindStyle(val)}>
                          {Math.round(val)}
                        </td>
                      ))}
                  </tr>

                  {/* --- هبات الرياح --- */}
                  <tr>
                    <td className="row-title">💨 {t.windGusts} ({speedUnit})</td>
                    {weatherData?.hourly?.wind_gusts_10m
                      ?.slice(startIndex, endIndex)
                      .map((val, idx) => (
                        <td key={idx} style={getWindStyle(val)}>
                          {Math.round(val)}
                        </td>
                      ))}
                  </tr>

                  {/* --- اتجاه الرياح --- */}
                  <tr>
                    <td className="row-title">🧭 {t.windDir}</td>
                    {weatherData?.hourly?.wind_direction_10m
                      ?.slice(startIndex, endIndex)
                      .map((deg, idx) => (
                        <td key={idx} className="direction">
                          {getWindArrow(deg)}
                        </td>
                      ))}
                  </tr>

                  {/* --- 🌊 ارتفاع الموج --- */}
                  <tr>
                    <td className="row-title">🌊 {t.waveHeight}</td>
                    {weatherData?.hourly?.wave_height
                      ?.slice(startIndex, endIndex)
                      .map((wave, idx) => (
                        <td
                          key={idx}
                          style={{
                            backgroundColor: wave > 2.5 ? "#fca5a5" : wave > 1.5 ? "#fde047" : "#e0f2fe",
                            fontWeight: "bold",
                            color: "#0f172a",
                          }}
                        >
                          {wave !== null && wave !== undefined ? wave.toFixed(1) : "-"}
                        </td>
                      ))}
                  </tr>

                  {/* --- ⏱️ فترة / دورة الموج --- */}
                  <tr>
                    <td className="row-title">⏱️ {t.wavePeriod}</td>
                    {weatherData?.hourly?.wave_period
                      ?.slice(startIndex, endIndex)
                      .map((period, idx) => (
                        <td key={idx} style={{ backgroundColor: "#f8fafc", color: "#334155" }}>
                          {period !== null && period !== undefined ? Math.round(period) : "-"}
                        </td>
                      ))}
                  </tr>

                  {/* --- 🧭 اتجاه الموج --- */}
                  <tr>
                    <td className="row-title">🧭 {t.waveDir}</td>
                    {weatherData?.hourly?.wave_direction
                      ?.slice(startIndex, endIndex)
                      .map((dir, idx) => (
                        <td key={idx} className="direction" style={{ background: "#e0e7ff", color: "#3730a3" }}>
                          {getWindArrow(dir)}
                        </td>
                      ))}
                  </tr>

                  {/* --- 🏊‍♂️ سرعة التيار المائي وسط الماء --- */}
                  <tr>
                    <td className="row-title">⚓ {t.oceanCurrent}</td>
                    {weatherData?.hourly?.ocean_current_velocity
                      ?.slice(startIndex, endIndex)
                      .map((curr, idx) => (
                        <td
                          key={idx}
                          style={{
                            backgroundColor: curr > 1.5 ? "#fecaca" : "#f1f5f9",
                            color: "#0f172a",
                            fontWeight: curr > 1.5 ? "900" : "normal",
                          }}
                        >
                          {curr !== null && curr !== undefined ? curr.toFixed(1) : "-"}
                        </td>
                      ))}
                  </tr>

                  {/* --- 🧭 اتجاه التيار المائي --- */}
                  <tr>
                    <td className="row-title">🧭 {t.currentDir}</td>
                    {weatherData?.hourly?.ocean_current_direction
                      ?.slice(startIndex, endIndex)
                      .map((cDir, idx) => (
                        <td key={idx} className="direction" style={{ background: "#ccfbf1", color: "#115e59" }}>
                          {getWindArrow(cDir)}
                        </td>
                      ))}
                  </tr>

                  {/* --- ⭐ مؤشر خطورة البحر (النجوم) --- */}
                  <tr>
                    <td className="row-title">⭐ {t.seaDanger}</td>
                    {weatherData?.hourly?.time
                      ?.slice(startIndex, endIndex)
                      .map((_, idx) => {
                        const globalIndex = startIndex + idx;
                        const wave = weatherData?.hourly?.wave_height?.[globalIndex];
                        const gust = weatherData?.hourly?.wind_gusts_10m?.[globalIndex];
                        const curr = weatherData?.hourly?.ocean_current_velocity?.[globalIndex];
                        const rating = getSeaDangerRating(wave, gust, curr);

                        return (
                          <td key={idx} style={{ background: rating >= 4 ? "#fef2f2" : "#ffffff" }}>
                            {renderDangerStars(rating)}
                          </td>
                        );
                      })}
                  </tr>

                  {/* --- درجة الحرارة --- */}
                  <tr>
                    <td className="row-title">🌡️ {t.temp} (°C)</td>
                    {weatherData?.hourly?.temperature_2m
                      ?.slice(startIndex, endIndex)
                      .map((temp, idx) => (
                        <td key={idx} style={getTemperatureStyle(temp)}>
                          {Math.round(temp)}°
                        </td>
                      ))}
                  </tr>

                  {/* --- الغطاء السحابي --- */}
                  <tr>
                    <td className="row-title">☁️ {t.clouds} (%)</td>
                    {weatherData?.hourly?.cloud_cover
                      ?.slice(startIndex, endIndex)
                      .map((cloud, idx) => (
                        <td key={idx} style={getCloudStyle(cloud)}>
                          {cloud}%
                        </td>
                      ))}
                  </tr>

                  {/* --- الضغط الجوي --- */}
                  <tr>
                    <td className="row-title">🌡️ {t.pressure} (hPa)</td>
                    {weatherData?.hourly?.pressure_msl
                      ?.slice(startIndex, endIndex)
                      .map((press, idx) => (
                        <td key={idx} style={{ background: "#f8fafc", color: "#475569" }}>
                          {Math.round(press)}
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "graph" && (
          <div className="graph-view">
            <div className="graph-photo-bg">
              <img
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85"
                alt="Windy sea"
              />
            </div>
            <div className="graph-content">
              <h3 style={{ marginTop: 0, color: "#ffffff", textShadow: "0 2px 5px rgba(0,0,0,.55)" }}>🌬️ {t.graphTitle} · {t.liveGraph}</h3>
              <p style={{ color: "#e0f2fe", textShadow: "0 1px 3px rgba(0,0,0,.65)" }}>{t.graphDesc}</p>

              <div className="graph-legend">
                <span><i className="graph-dot wind-dot" /> {t.windSpeed}</span>
                <span><i className="graph-dot gust-dot" /> {t.windGusts}</span>
              </div>

              <div className="wind-graph">
                <div className="wind-graph-grid" />
                {weatherData?.hourly?.wind_speed_10m
                  ?.slice(startIndex, endIndex)
                  .map((val, idx) => {
                    const gust = weatherData?.hourly?.wind_gusts_10m?.[startIndex + idx];
                    const maxValue = Math.max(10, ...((weatherData?.hourly?.wind_gusts_10m || []).slice(startIndex, endIndex).filter(v => typeof v === "number")));
                    const windHeight = Math.max(5, Math.min(100, (Number(val) / maxValue) * 100));
                    const gustHeight = typeof gust === "number" ? Math.max(5, Math.min(100, (gust / maxValue) * 100)) : 5;
                    const time = weatherData?.hourly?.time?.[startIndex + idx]?.split("T")[1]?.slice(0, 2);
                    return (
                      <div key={idx} className="wind-graph-column" onMouseEnter={() => setGraphHover({ idx, time, wind: Number(val), gust: typeof gust === "number" ? Number(gust) : null })} onMouseLeave={() => setGraphHover(null)}>
                        <div className="wind-value">{Math.round(val)}</div>
                        <div className="wind-bars">
                          <div className="wind-bar wind-speed-bar" style={{ height: `${windHeight}%` }} />
                          <div className="wind-bar gust-bar" style={{ height: `${gustHeight}%` }} />
                        </div>
                        <div className="wind-time">{time ? `${time}h` : `${idx}h`}</div>
                      </div>
                    );
                  })}
              </div>

              <div className="graph-hover-info">
                {graphHover ? `🕒 ${graphHover.time || "--"}h · 🍃 ${graphHover.wind.toFixed(1)} ${speedUnit} · 💨 ${graphHover.gust != null ? graphHover.gust.toFixed(1) : "-"} ${speedUnit}` : "مرّر الفأرة فوق أي ساعة لعرض التفاصيل"}
              </div>

              <div className="graph-bottom-info">
                <span>🍃 {t.windSpeed}: {speedUnit}</span>
                <span>💨 {t.windGusts}: {speedUnit}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tides" && (
          <div className="tides-view">
            <h3 style={{ marginTop: 0, color: "#0369a1" }}>{t.tidesTitle}</h3>
            <p style={{ color: "#334155" }}>{t.tidesDesc}</p>
            <div className="tides-photo-grid">
              <div className="tide-photo-card">
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85"
                  alt={t.highTide}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="tide-photo-content">
                  <div className="tide-photo-label">🌊 {t.highTide}</div>
                  <div className="tide-photo-time">04:12 & 16:45</div>
                  <div className="tide-photo-sub">حركة البحر والمد المرتفع</div>
                </div>
              </div>

              <div className="tide-photo-card">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
                  alt={t.lowTide}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="tide-photo-content">
                  <div className="tide-photo-label">🏖️ {t.lowTide}</div>
                  <div className="tide-photo-time">10:30 & 22:50</div>
                  <div className="tide-photo-sub">انخفاض مستوى البحر والجزر</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "earthquakes" && (
          <section className="wg-earthquake-section wg-earthquake-tab-view" aria-label="معلومات الزلازل المباشرة حول العالم">
            <div className="wg-earthquake-head">
              <div className="wg-earthquake-title-row">
                <div className="wg-earthquake-logo">🌍</div>
                <div>
                  <div className="wg-earthquake-title">مركز الزلازل العالمي</div>
                  <div className="wg-earthquake-subtitle">زلازل العالم مباشرة · الدولة · المكان · القوة · العمق · الوقت</div>
                </div>
              </div>
              <div className="wg-earthquake-actions">
                <button type="button" id="wg-earthquake-notify-btn" className="wg-earthquake-notify-btn">🔔 تفعيل التنبيهات</button>
                <div className="wg-earthquake-status"><span className="wg-earthquake-dot"></span><span id="wg-earthquake-count">جاري التحديث...</span></div>
              </div>
            </div>
            <div id="wg-earthquake-alert" className="wg-earthquake-alert" role="alert" aria-live="assertive"></div>
            <div id="wg-earthquake-list" className="wg-earthquake-list" aria-live="polite"></div>
            <div className="wg-earthquake-note">● بيانات مباشرة من USGS · التحديث كل دقيقة · اضغط على أي زلزال لرؤية موقعه على الخريطة</div>
          </section>
        )}
      <section className="wg-morocco-cities" aria-label="مدن المغرب">
        <div className="wg-morocco-cities-panel">
          <div className="wg-morocco-cities-head">
            <div>
              <div className="wg-morocco-cities-title">🇲🇦 مدن المغرب</div>
              <div className="wg-morocco-cities-subtitle">اختَر أي مدينة لعرض الطقس ديالها مباشرة في Windgure</div>
            </div>
            <input
              className="wg-morocco-cities-search"
              value={moroccoCityQuery}
              onChange={(e) => setMoroccoCityQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchAnyMoroccoPlace(moroccoCityQuery);
                }
              }}
              placeholder="🔎 مدينة، قرية، دوار أو منطقة..."
              aria-label="البحث في مدن وقرى ومناطق المغرب"
            />
          </div>

          <div className="wg-morocco-cities-grid">
            {MOROCCO_CITIES
              .filter((city) => {
                const q = normalizeCitySearch(moroccoCityQuery);
                if (!q) return true;
                const arName = normalizeCitySearch(city);
                const frName = normalizeCitySearch(MOROCCO_CITY_FRENCH[city]);
                return arName.includes(q) || frName.includes(q);
              })
              .map((city) => (
                <button
                  key={city}
                  type="button"
                  className="wg-morocco-city-btn"
                  onClick={() => selectMoroccoCity(city)}
                  title={`عرض توقعات 15 يوم لـ ${city}`}
                >
                  <div className="wg-city-name">{city}</div>
                  {moroccoWeather[city] ? (
                    (() => {
                      const cityWeather = moroccoWeather[city];
                      const weatherInfo = getMoroccoWeatherInfo(cityWeather.weatherCode);
                      return (
                        <div className="wg-city-weather">
                          <span className="wg-city-weather-icon">{weatherInfo.icon}</span>
                          <span className="wg-city-temp">{Math.round(cityWeather.temperature)}°C</span>
                          <span className="wg-city-condition">{weatherInfo.label}</span>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="wg-city-weather-loading">{moroccoWeatherLoading ? "⏳" : "—"}</div>
                  )}
                </button>
              ))}

            {MOROCCO_CITIES.filter((city) => {
              const q = normalizeCitySearch(moroccoCityQuery);
              const arName = normalizeCitySearch(city);
              const frName = normalizeCitySearch(MOROCCO_CITY_FRENCH[city]);
              return !q || arName.includes(q) || frName.includes(q);
            }).length === 0 && normalizeCitySearch(moroccoCityQuery) && (
              <div className="wg-morocco-city-search-any">
                <div className="wg-morocco-city-search-any-title">🔎 ما لقيّناش «{moroccoCityQuery}» فاللائحة</div>
                <div className="wg-morocco-city-search-any-sub">يمكن البحث حتى على قرية، دوار أو منطقة غير موجودة في جدول المدن.</div>
                <button
                  type="button"
                  className="wg-morocco-city-search-any-btn"
                  onClick={() => searchAnyMoroccoPlace(moroccoCityQuery)}
                  disabled={loading}
                >
                  {loading ? "⏳ جاري البحث..." : `🌤️ بحث عن طقس «${moroccoCityQuery}»`}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 📍 نافذة تحديد مكان الزلزال */}
      <div id="wg-earthquake-location-modal" className="wg-earthquake-location-modal" aria-hidden="true">
        <div className="wg-earthquake-location-panel" role="dialog" aria-modal="true" aria-label="موقع الزلزال">
          <button type="button" id="wg-earthquake-location-close" className="wg-earthquake-location-close" aria-label="إغلاق">×</button>
          <div className="wg-eq-detail-brand"><div className="wg-eq-brand-mark"><Compass size={16} /></div><strong>wind<span>gure</span></strong><span>Earthquake location</span></div>
          <div className="wg-eq-detail-header">
            <div className="wg-eq-detail-heading">
              <div className="wg-eq-detail-label">📍 موقع الزلزال بالضبط</div>
              <div id="wg-eq-detail-country" className="wg-eq-detail-country">🌍 —</div>
              <div id="wg-eq-detail-place" className="wg-eq-detail-place">—</div>
            </div>
            <div id="wg-eq-detail-mag" className="wg-eq-detail-mag">M—</div>
          </div>
          <div className="wg-eq-detail-stats">
            <div><small>العمق</small><strong id="wg-eq-detail-depth">—</strong></div>
            <div><small>الإحداثيات</small><strong id="wg-eq-detail-coords">—</strong></div>
            <div><small>الوقت</small><strong id="wg-eq-detail-time">—</strong></div>
            <div><small>التسونامي</small><strong id="wg-eq-detail-tsunami">—</strong></div>
          </div>
          <div id="wg-earthquake-detail-map" className="wg-earthquake-detail-map"></div>
          <div className="wg-eq-detail-footer"><span>النقطة الحمراء = مركز الزلزال</span><a id="wg-eq-detail-usgs" href="https://earthquake.usgs.gov/earthquakes/map/" target="_blank" rel="noopener noreferrer">تفاصيل USGS ↗</a></div>
        </div>
      </div>

      </main>

      {/* AD BANNER BOTTOM */}

      {/* نافذة توقعات 15 يوم لمدينة المغرب - لا تظهر داخل الصفحة الرئيسية */}
      {selectedMoroccoCity && (
        <div className="modal-overlay" onClick={() => setSelectedMoroccoCity(null)}>
          <div className="modal-content morocco-weather-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="morocco-weather-title">
                <span style={{fontSize:"22px"}}>🇲🇦</span>
                <div>
                  <div>{lang === "fr" ? (MOROCCO_CITY_FRENCH[selectedMoroccoCity] || selectedMoroccoCity) : selectedMoroccoCity}</div>
                  <small>{lang === "fr" ? "Prévisions météo sur 15 jours" : "توقعات الطقس لمدة 15 يوم"}</small>
                </div>
              </div>
              <button
                onClick={() => setSelectedMoroccoCity(null)}
                style={{ background: "transparent", border: 0, color: "white", cursor: "pointer" }}
                aria-label="إغلاق"
              >
                <X size={22} />
              </button>
            </div>
            <div className="modal-body">
              {loading && (!weatherData?.daily?.time || weatherData.daily.time.length === 0) ? (
                <div className="morocco-15day-loading">⏳ جاري تحميل توقعات 15 يوم...</div>
              ) : (
                <div className="morocco-15day-grid">
                  {(weatherData?.daily?.time || []).slice(0, 15).map((date, index) => {
                    const info = getMoroccoWeatherInfo(weatherData.daily.weather_code?.[index]);
                    const max = weatherData.daily.temperature_2m_max?.[index];
                    const min = weatherData.daily.temperature_2m_min?.[index];
                    const rain = weatherData.daily.precipitation_sum?.[index];
                    const rainChance = weatherData.daily.precipitation_probability_max?.[index];
                    const wind = weatherData.daily.wind_speed_10m_max?.[index];
                    return (
                      <div key={date} className="morocco-15day-card">
                        <div className="morocco-15day-date">{index === 0 ? "اليوم" : index === 1 ? "غداً" : date}</div>
                        <div className="morocco-15day-icon">{info.icon}</div>
                        <div className="morocco-15day-condition">{info.label}</div>
                        <div className="morocco-15day-temp"><strong>{max != null ? Math.round(max) : "-"}°</strong> / {min != null ? Math.round(min) : "-"}°C</div>
                        <div className="morocco-15day-meta">🌧️ {rainChance != null ? Math.round(rainChance) : 0}% · {rain != null ? Number(rain).toFixed(1) : "0.0"} mm<br/>💨 {wind != null ? Math.round(wind) : "-"} {speedUnit}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span>
                {activeModal === "spots" && t.spots}
                {activeModal === "maps" && t.maps}
                {activeModal === "archive" && t.archive}
                {activeModal === "options" && t.optionsTitle}
              </span>
              <button
                onClick={() => setActiveModal(null)}
                style={{ background: "transparent", border: 0, color: "white", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {activeModal === "options" && (
                <div className="settings-panel">
                  <div className="settings-card">
                    <div className="settings-card-title">🌐 {t.selectLang}</div>
                    <div className="settings-options-grid">
                      {[
                        { value: "ar", label: "العربية", sub: "Arabic", flag: "🇲🇦" },
                        { value: "en", label: "English", sub: "English", flag: "🇬🇧" },
                        { value: "fr", label: "Français", sub: "Français", flag: "🇫🇷" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`settings-option ${lang === option.value ? "settings-option-active" : ""}`}
                          onClick={() => setLang(option.value)}
                        >
                          <span className="settings-option-icon">{option.flag}</span>
                          <span>
                            <strong>{option.label}</strong>
                            <small>{option.sub}</small>
                          </span>
                          {lang === option.value && <span className="settings-check">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="settings-card-title">💨 {t.selectSpeed}</div>
                    <div className="settings-options-grid settings-speed-grid">
                      {[
                        { value: "kn", label: "Knots", sub: "عقدة", icon: "⛵" },
                        { value: "kmh", label: "km/h", sub: "كم/ساعة", icon: "🚗" },
                        { value: "ms", label: "m/s", sub: "متر/ثانية", icon: "💨" },
                        { value: "mph", label: "mph", sub: "ميل/ساعة", icon: "🏎️" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`settings-option ${speedUnit === option.value ? "settings-option-active" : ""}`}
                          onClick={() => setSpeedUnit(option.value)}
                        >
                          <span className="settings-option-icon">{option.icon}</span>
                          <span>
                            <strong>{option.label}</strong>
                            <small>{option.sub}</small>
                          </span>
                          {speedUnit === option.value && <span className="settings-check">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="settings-saved">✓ {isRtl ? "يتم حفظ اختياراتك تلقائياً" : lang === "fr" ? "Vos choix sont enregistrés automatiquement" : "Your choices are saved automatically"}</div>
                </div>
              )}

              {activeModal === "spots" && (
                <div className="modal-list-panel">
                  <div className="panel-intro">📍 <strong>{t.spots}</strong><span>{isRtl ? "اختَر أي موقع لعرض التوقعات" : lang === "fr" ? "Choisissez un spot pour voir les prévisions" : "Choose a spot to view the forecast"}</span></div>
                  {favorites.length === 0 ? (
                    <div className="empty-panel">⭐ لا توجد مواقع مفضلة بعد. أضف الموقع الحالي بالضغط على النجمة.</div>
                  ) : (
                    <div className="spot-grid">
                      {favorites.map((spot) => (
                        <button key={`${spot.name}-${spot.lat}`} className={`spot-card ${spot.name === locationName ? "spot-card-active" : ""}`} onClick={() => { selectFavorite(spot); setActiveModal(null); }}>
                          <span className="spot-icon">📍</span>
                          <span className="spot-info"><strong>{spot.name}</strong><small>{Number(spot.lat).toFixed(3)}, {Number(spot.lon).toFixed(3)}</small></span>
                          {spot.name === homeSpot.name && <span className="home-badge">🏠</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeModal === "maps" && (
                <div className="map-panel">
                  <div className="panel-intro">🗺️ <strong>{t.maps}</strong><span>{locationName}</span></div>
                  <div className="map-frame-wrap">
                    <iframe
                      title="Windgure Map"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.12}%2C${coords.lat - 0.08}%2C${coords.lon + 0.12}%2C${coords.lat + 0.08}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`}
                      className="map-frame"
                      loading="lazy"
                    />
                  </div>
                  <div className="map-actions">
                    <button className="primary-modal-btn" onClick={() => { setActiveModal(null); setActiveTab("forecast"); }}>📊 {t.forecast}</button>
                    <a className="secondary-modal-btn" href={`https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lon}#map=12/${coords.lat}/${coords.lon}`} target="_blank" rel="noreferrer">↗️ فتح الخريطة</a>
                  </div>
                </div>
              )}

              {activeModal === "archive" && (
                <div className="modal-list-panel">
                  <div className="archive-top">
                    <div className="panel-intro">📁 <strong>{t.archive}</strong><span>{isRtl ? "آخر المواقع التي فتحتها محفوظة هنا" : lang === "fr" ? "Vos derniers spots visités" : "Your recently viewed spots"}</span></div>
                    {archive.length > 0 && <button className="clear-archive-btn" onClick={clearArchive}>🗑️ {isRtl ? "مسح الكل" : lang === "fr" ? "Tout effacer" : "Clear all"}</button>}
                  </div>
                  {archive.length === 0 ? (
                    <div className="empty-panel">📂 الأرشيف فارغ حالياً. ابحث عن مدينة أو اختر موقعاً وسيظهر هنا تلقائياً.</div>
                  ) : (
                    <div className="archive-list">
                      {archive.map((spot) => (
                        <button key={`${spot.name}-${spot.time}`} className="archive-item" onClick={() => { selectFavorite(spot); setActiveModal(null); }}>
                          <span>🕘</span><span><strong>{spot.name}</strong><small>{new Date(spot.time).toLocaleString(lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US")}</small></span><b>›</b>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeModal !== "options" && activeModal !== "spots" && activeModal !== "maps" && activeModal !== "archive" && null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
