import React, { useState, useEffect } from "react";
import {
  Search,
  Compass,
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
    liveDashboard: "لوحة الطقس الحية",
    smartSummary: "الملخص الذكي",
    nextHours: "الساعات القادمة",
    stableWind: "الرياح مستقرة حالياً",
    risingWind: "الرياح في ارتفاع تدريجي",
    fallingWind: "الرياح في انخفاض تدريجي",
    rainChance: "احتمال المطر",
    maxWind: "أقصى رياح متوقعة",
    minWind: "أدنى رياح متوقعة",
    clearConditions: "الظروف مستقرة ولا توجد مؤشرات مهمة حالياً.",
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
    liveDashboard: "Live Weather Dashboard",
    smartSummary: "Smart Summary",
    nextHours: "Next hours",
    stableWind: "Wind is currently stable",
    risingWind: "Wind is gradually increasing",
    fallingWind: "Wind is gradually decreasing",
    rainChance: "Rain chance",
    maxWind: "Peak expected wind",
    minWind: "Lowest expected wind",
    clearConditions: "Conditions are stable with no important indicators right now.",
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
    liveDashboard: "Tableau météo en direct",
    smartSummary: "Résumé intelligent",
    nextHours: "Prochaines heures",
    stableWind: "Le vent est actuellement stable",
    risingWind: "Le vent augmente progressivement",
    fallingWind: "Le vent diminue progressivement",
    rainChance: "Risque de pluie",
    maxWind: "Vent maximal prévu",
    minWind: "Vent minimal prévu",
    clearConditions: "Les conditions sont stables sans indicateur important actuellement.",
    selectLang: "Choisissez votre langue préférée :",
    selectSpeed: "Choisissez l'unité de vitesse du vent :",
  },
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
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
  const [selectedTimelineOffset, setSelectedTimelineOffset] = useState(0);

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
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_gusts_10m,wind_direction_10m,cloud_cover,uv_index,visibility,precipitation,precipitation_probability,weather_code&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_gusts_10m,wind_direction_10m,cloud_cover,uv_index,visibility,precipitation,precipitation_probability,weather_code&daily=sunrise,sunset&wind_speed_unit=${speedUnit}&timezone=auto`
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

        const [openMeteoResult, nominatimResult] = await Promise.allSettled([
          fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodedQuery}&count=20&language=${language}&format=json`
          ).then((res) => res.json()),
          fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=20&accept-language=${language},ar,en&q=${encodedQuery}`
          ).then((res) => res.json()),
        ]);

        if (cancelled) return;

        const combined = [];

        if (openMeteoResult.status === "fulfilled") {
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
        }

        if (nominatimResult.status === "fulfilled") {
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
              query;

            combined.push({
              id: `nom-${place.osm_type || "place"}-${place.osm_id || index}-${latitude}-${longitude}`,
              latitude,
              longitude,
              name,
              country: address.country || "",
              country_code: address.country_code || "",
              admin1: address.state || address.region || address.province || "",
              type:
                place.type ||
                place.addresstype ||
                address.village && "village" ||
                address.hamlet && "hamlet" ||
                "place",
              source: "nominatim",
            });
          });
        }

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
      try {
        const language = lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en";
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            query
          )}&count=10&language=${language}&format=json`
        );
        const data = await res.json();
        results = Array.isArray(data.results) ? data.results : [];
      } catch (openMeteoErr) {
        console.warn("Open-Meteo search warning:", openMeteoErr);
      }

      // إذا لم يجد Open-Meteo المدينة بالعربية، نستعمل Nominatim كبحث احتياطي.
      // هذا يحسن البحث بالأسماء العربية والمحلية للمدن.
      if (results.length === 0) {
        try {
          const nominatimRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=10&accept-language=ar,en&q=${encodeURIComponent(
              query
            )}`
          );
          const nominatimData = await nominatimRes.json();

          results = (Array.isArray(nominatimData) ? nominatimData : [])
            .map((place) => ({
              latitude: Number(place.lat),
              longitude: Number(place.lon),
              name:
                place.address?.city ||
                place.address?.town ||
                place.address?.municipality ||
                place.address?.village ||
                place.name ||
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

      if (results.length > 0) {
        // نختار النتيجة الأولى، لكن نعرض اسم المدينة بشكل أوضح.
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
      if (daysMap.length >= 7) break;
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
  const livePrecipitation = typeof weatherData?.current?.precipitation === "number"
    ? weatherData.current.precipitation
    : interpolate(weatherData?.hourly?.precipitation, 0);
  const liveRainProbability = typeof weatherData?.current?.precipitation_probability === "number"
    ? weatherData.current.precipitation_probability
    : interpolate(weatherData?.hourly?.precipitation_probability, 0);
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

  const timelineItems = Array.from({ length: 12 }, (_, offset) => {
    const index = Math.min(liveHourIndex + offset, (weatherData?.hourly?.time?.length || 1) - 1);
    const time = weatherData?.hourly?.time?.[index]?.split("T")[1]?.slice(0, 5) || "--:--";
    return {
      index,
      time,
      wind: weatherData?.hourly?.wind_speed_10m?.[index],
      gust: weatherData?.hourly?.wind_gusts_10m?.[index],
      temp: weatherData?.hourly?.temperature_2m?.[index],
      rain: weatherData?.hourly?.precipitation_probability?.[index],
      wave: weatherData?.hourly?.wave_height?.[index],
      dir: weatherData?.hourly?.wind_direction_10m?.[index],
    };
  });

  // الملخص الذكي يعتمد على الساعات القادمة فعلياً، وليس على قراءة ثابتة واحدة.
  // لذلك يتغير تلقائياً عندما ينتقل مؤشر NOW إلى ساعة جديدة أو تتغير التوقعات.
  const selectedTimelineItem = timelineItems[selectedTimelineOffset] || timelineItems[0];
  const summaryWindow = timelineItems.slice(selectedTimelineOffset, Math.min(selectedTimelineOffset + 6, timelineItems.length));
  const firstFuture = summaryWindow.find((item) => typeof item.wind === "number");
  const lastFuture = [...summaryWindow].reverse().find((item) => typeof item.wind === "number");
  const futureWindValues = summaryWindow
    .map((item) => Number(item.wind))
    .filter((value) => Number.isFinite(value));
  const futureTempValues = summaryWindow
    .map((item) => Number(item.temp))
    .filter((value) => Number.isFinite(value));

  const currentWindForSummary = Number(selectedTimelineItem?.wind);
  const futureWindForSummary = Number(firstFuture?.wind);
  const endWindForSummary = Number(lastFuture?.wind);
  const windDelta = Number.isFinite(currentWindForSummary) && Number.isFinite(endWindForSummary)
    ? endWindForSummary - currentWindForSummary
    : 0;

  const windTrendText = windDelta > 2
    ? t.risingWind
    : windDelta < -2
    ? t.fallingWind
    : t.stableWind;

  const strongestFutureWind = futureWindValues.length ? Math.max(...futureWindValues) : null;
  const weakestFutureWind = futureWindValues.length ? Math.min(...futureWindValues) : null;
  const futureTempStart = futureTempValues[0];
  const futureTempEnd = futureTempValues[futureTempValues.length - 1];
  const tempDelta = Number.isFinite(futureTempStart) && Number.isFinite(futureTempEnd)
    ? futureTempEnd - futureTempStart
    : 0;

  const summaryParts = [];
  if (smartAlerts.length > 0) summaryParts.push(`${smartAlerts[0].text} ·`);
  summaryParts.push(windTrendText);

  if (Number.isFinite(futureWindForSummary) && Number.isFinite(endWindForSummary)) {
    summaryParts.push(`${Math.round(currentWindForSummary)} → ${Math.round(endWindForSummary)} ${speedUnit}`);
  }

  if (Number.isFinite(strongestFutureWind) && strongestFutureWind > currentWindForSummary + 2) {
    summaryParts.push(`${t.maxWind}: ${Math.round(strongestFutureWind)} ${speedUnit}`);
  } else if (Number.isFinite(weakestFutureWind) && weakestFutureWind < currentWindForSummary - 2) {
    summaryParts.push(`${t.minWind}: ${Math.round(weakestFutureWind)} ${speedUnit}`);
  }

  if (Number.isFinite(tempDelta) && Math.abs(tempDelta) >= 2) {
    summaryParts.push(`${t.temp}: ${tempDelta > 0 ? "+" : ""}${Math.round(tempDelta)}°C`);
  }

  const selectedRain = Number(selectedTimelineItem?.rain);
  if (Number.isFinite(selectedRain)) summaryParts.push(`${t.rainChance}: ${Math.round(selectedRain)}%`);
  const selectedTemp = Number(selectedTimelineItem?.temp);
  if (Number.isFinite(selectedTemp)) summaryParts.push(`${t.temp}: ${Math.round(selectedTemp)}°C`);

  const summaryText = summaryParts.join(" · ");

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
        
        .tabs { background: #e2e8f0; border-bottom: 1px solid #cbd5e1; padding: 6px 14px; display: flex; gap: 5px; overflow-x: auto; white-space: nowrap; }
        .tab { border: 0; background: transparent; color: #334155; padding: 7px 11px; border-radius: 5px; cursor: pointer; font-weight: 600; }
        .tab:hover { background: #cbd5e1; }
        .tab-active { background: white; color: #0f172a; box-shadow: 0 1px 3px rgba(0,0,0,.15); font-weight: 900; }
        
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

        
        .pro-dashboard { margin: 8px; border: 1px solid #bae6fd; border-radius: 12px; background: linear-gradient(135deg,#ffffff,#f0f9ff); box-shadow: 0 4px 14px rgba(15,23,42,.07); overflow: hidden; }
        .pro-dashboard-head { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border-bottom:1px solid #dbeafe; }
        .pro-dashboard-title { font-size:14px; font-weight:950; color:#0f172a; }
        .pro-live-badge { display:inline-flex; align-items:center; gap:5px; padding:4px 8px; border-radius:999px; background:#ecfdf5; color:#047857; font-size:9px; font-weight:900; }
        .pro-live-dot { width:7px; height:7px; border-radius:50%; background:#10b981; box-shadow:0 0 0 4px rgba(16,185,129,.12); }
        .pro-summary { display:grid; grid-template-columns:minmax(230px,.8fr) minmax(0,2.2fr); gap:10px; padding:10px; }
        .smart-summary { border:1px solid #dbeafe; border-radius:9px; padding:10px; background:#fff; }
        .smart-summary-label { color:#0369a1; font-size:10px; font-weight:900; }
        .smart-summary-text { margin-top:6px; font-size:13px; line-height:1.5; font-weight:900; color:#0f172a; }
        .summary-stats { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }
        .summary-stat { padding:5px 7px; border-radius:7px; background:#f8fafc; border:1px solid #e2e8f0; font-size:9px; font-weight:900; color:#334155; }
        .hourly-timeline { min-width:0; border:1px solid #dbeafe; border-radius:9px; background:#fff; padding:8px; overflow:hidden; }
        .timeline-head { display:flex; align-items:center; justify-content:space-between; font-size:10px; font-weight:900; color:#334155; margin-bottom:7px; }
        .timeline-scroll { display:grid; grid-template-columns:repeat(12,minmax(64px,1fr)); gap:5px; overflow-x:auto; padding-bottom:2px; }
        .timeline-item { min-width:64px; border:1px solid #e2e8f0; border-radius:8px; padding:6px 4px; text-align:center; background:linear-gradient(180deg,#f8fafc,#fff); cursor:pointer; font:inherit; color:inherit; transition:.15s; }
        .timeline-item:hover { transform:translateY(-2px); box-shadow:0 4px 10px rgba(15,23,42,.10); }
        .timeline-item.selected { border-color:#0284c7; background:#eff6ff; box-shadow:0 0 0 2px rgba(2,132,199,.15); }
        .timeline-item.now { border-color:#22d3ee; box-shadow:inset 0 2px 0 #22d3ee; background:#ecfeff; }
        .timeline-time { font-size:9px; font-weight:950; color:#475569; }
        .timeline-wind { margin-top:4px; font-size:13px; font-weight:950; color:#0369a1; }
        .timeline-temp { font-size:9px; font-weight:800; color:#64748b; margin-top:2px; }
        .timeline-meta { display:flex; justify-content:center; gap:4px; flex-wrap:wrap; margin-top:4px; font-size:8px; color:#475569; font-weight:800; }
        .timeline-rain { color:#0284c7; }
.weather-tools-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px; padding:8px; }
        .wind-compass-panel {
          min-height:150px; padding:10px 14px; border:1px solid #bae6fd; border-radius:10px;
          background:linear-gradient(145deg,#ffffff,#e0f2fe); box-shadow:0 3px 10px rgba(15,23,42,.07);
          display:flex; align-items:center; justify-content:space-between; gap:12px;
        }
        .compass-info { min-width:0; flex:1; }
        .tool-title { font-size:14px; font-weight:950; color:#0f172a; }
        .tool-subtitle { margin-top:3px; color:#64748b; font-size:10px; }
        .wind-compass { width:108px; height:108px; flex:0 0 108px; border-radius:50%; position:relative;
          margin: auto; border: 8px solid #dbeafe; background: radial-gradient(circle,#fff 0%,#f0f9ff 65%,#dbeafe 100%);
          box-shadow: inset 0 0 0 2px #93c5fd, 0 8px 20px rgba(2,132,199,.15); }
        .wind-compass::before, .wind-compass::after { content:""; position:absolute; background:#cbd5e1; }
        .wind-compass::before { width:1px; height:100%; left:50%; top:0; }
        .wind-compass::after { height:1px; width:100%; top:50%; left:0; }
        .compass-label { position:absolute; font-size:12px; font-weight:900; color:#0f172a; z-index:2; }
        .compass-n { top:8px; left:50%; transform:translateX(-50%); color:#dc2626; }
        .compass-e { right:10px; top:50%; transform:translateY(-50%); }
        .compass-s { bottom:8px; left:50%; transform:translateX(-50%); }
        .compass-w { left:10px; top:50%; transform:translateY(-50%); }
        .compass-needle { position:absolute; left:50%; top:50%; width:5px; height:40px; transform-origin:50% 100%;
          margin-left:-2.5px; margin-top:-40px; border-radius:6px; background:linear-gradient(#ef4444 0 50%,#0f172a 50%);
          box-shadow:0 2px 6px rgba(0,0,0,.25); transition:transform .8s cubic-bezier(.2,.8,.2,1); z-index:3; }
        .compass-center { position:absolute; width:16px; height:16px; left:50%; top:50%; transform:translate(-50%,-50%);
          border-radius:50%; background:#0284c7; border:3px solid white; z-index:4; box-shadow:0 2px 5px rgba(0,0,0,.25); }
        .compass-data { flex:1; min-width:220px; text-align:${isRtl ? "right" : "left"}; }
        .compass-speed { font-size:25px; font-weight:950; color:#0369a1; margin-top:8px; }
        .compass-speed span { font-size:11px; }
        .smart-alerts-panel { min-height:150px; padding:10px; border:1px solid #fed7aa; border-radius:10px; background:linear-gradient(145deg,#fff,#fff7ed); box-shadow:0 3px 10px rgba(15,23,42,.07); }
        .smart-alerts-head { display:flex; justify-content:space-between; align-items:center; font-size:14px; font-weight:950; color:#0f172a; }
        .smart-alerts-head span { min-width:22px; height:22px; border-radius:50%; display:grid; place-items:center; background:#f97316; color:white; font-size:10px; }
        .smart-alerts-list { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:6px; margin-top:8px; }
        .smart-alert { display:flex; align-items:center; gap:7px; padding:7px; border-radius:8px; border:1px solid #e2e8f0; background:white; min-width:0; }
        .smart-alert.high { border-color:#fecaca; background:#fff1f2; }
        .smart-alert.medium { border-color:#fed7aa; background:#fff7ed; }
        .smart-alert-icon { font-size:18px; }
        .smart-alert-text { min-width:0; display:flex; flex-direction:column; }
        .smart-alert-text strong { font-size:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .smart-alert-text small { color:#64748b; font-size:9px; margin-top:2px; }
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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .live-weather-cards {
          display: grid;
          grid-template-columns: repeat(6, minmax(150px, 1fr));
          gap: 8px;
          padding: 8px;
          background: #f1f5f9;
        }
        .live-card {
          position: relative;
          min-height: 128px;
          overflow: hidden;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 12px;
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
          display: flex; align-items: center; gap: 7px;
          color: #ffffff; font-weight: 800; font-size: 11px;
          position: relative; z-index: 2;
          text-shadow: 0 1px 3px rgba(0,0,0,.55);
        }
        .live-card-value {
          display: flex; align-items: baseline; gap: 3px;
          margin-top: 6px; color: #ffffff;
          font-size: 25px; font-weight: 900;
          letter-spacing: -.5px;
          position: relative; z-index: 2;
          text-shadow: 0 2px 5px rgba(0,0,0,.7);
        }
        .live-card-sub {
          margin-top: 3px; color: #e0f2fe; font-size: 10px; font-weight: 700;
          position: relative; z-index: 2;
          text-shadow: 0 1px 3px rgba(0,0,0,.65);
        }
        .live-meter {
          position: absolute; left: 12px; right: 12px; bottom: 11px;
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
          .pro-summary { grid-template-columns: 1fr; }
          .pro-dashboard { margin: 5px; }
          .wind-compass { width:96px; height:96px; flex-basis:96px; }
          .compass-needle { height:35px; margin-top:-35px; }
          .smart-alerts-list { grid-template-columns:1fr 1fr; }
        }
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
                          {[spot.admin1, spot.country].filter(Boolean).join(" • ")}
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

      <section className="pro-dashboard">
        <div className="pro-dashboard-head">
          <div className="pro-dashboard-title">⚡ {t.liveDashboard}</div>
          <div className="pro-live-badge"><span className="pro-live-dot" /> LIVE · {locationName}</div>
        </div>
        <div className="pro-summary">
          <div className="smart-summary">
            <div className="smart-summary-label">🧠 {t.smartSummary}</div>
            <div className="smart-summary-text">{summaryText}</div>
            <div className="summary-stats">
              <span className="summary-stat">🌬️ {liveWindSpeed != null ? Number(liveWindSpeed).toFixed(1) : "-"} {speedUnit}</span>
              <span className="summary-stat">💨 {liveWindGust != null ? Number(liveWindGust).toFixed(1) : "-"} {speedUnit}</span>
              <span className="summary-stat">🌡️ {liveTemperature != null ? Math.round(liveTemperature) : "-"}°C</span>
              <span className="summary-stat">🌧️ {liveRainProbability != null ? Math.round(liveRainProbability) : 0}%</span>
            </div>
          </div>
          <div className="hourly-timeline">
            <div className="timeline-head"><span>🕒 {t.nextHours}</span><span>{t.windSpeed} · {speedUnit}</span></div>
            <div className="timeline-scroll">
              {timelineItems.map((item, offset) => (
                <button type="button" key={`${item.index}-${offset}`} className={`timeline-item ${offset === 0 ? "now" : ""} ${selectedTimelineOffset === offset ? "selected" : ""}`} onClick={() => setSelectedTimelineOffset(offset)} aria-pressed={selectedTimelineOffset === offset}>
                  <div className="timeline-time">{offset === 0 ? "NOW" : item.time}</div>
                  <div className="timeline-wind">{typeof item.wind === "number" ? Math.round(item.wind) : "-"}</div>
                  <div className="timeline-temp">{typeof item.temp === "number" ? `${Math.round(item.temp)}°C` : "-"}</div>
                  <div className="timeline-meta">
                    <span>💨 {typeof item.gust === "number" ? Math.round(item.gust) : "-"}</span>
                    <span>{getDirectionLabel(item.dir)}</span>
                    {typeof item.rain === "number" && item.rain > 0 && <span className="timeline-rain">🌧️ {Math.round(item.rain)}%</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
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
          {t.forecast}
        </button>
        <button
          className={`tab ${activeTab === "graph" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("graph")}
        >
          {t.graph}
        </button>
        <button
          className={`tab ${activeTab === "tides" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("tides")}
        >
          {t.tides}
        </button>
      </div>

      {/* DAYS SELECTOR BAR */}
      <div className="days-bar">
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
      </div>

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
      </main>

      {/* AD BANNER BOTTOM */}

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
