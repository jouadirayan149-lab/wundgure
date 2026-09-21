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
} from "lucide-react";

const AdBanner = ({ slotId = "auto" }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense Error:", e);
    }
  }, []);

  return (
    <div className="ad-banner">
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minHeight: "90px",
        }}
        data-ad-client="ca-pub-7007566302258366"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
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
    tides: "المد والجزر",
    share: "مشاركة",
    selectDay: "اختر اليوم:",
    today: "اليوم",
    tomorrow: "غداً",
    windSpeed: "سرعة الرياح",
    windGusts: "هبات الرياح",
    windDir: "اتجاه الرياح",
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
    selectLang: "Choisissez votre langue préférée :",
    selectSpeed: "Choisissez l'unité de vitesse du vent :",
  },
  es: {
    home: "Inicio",
    gps: "GPS",
    searchPlaceholder: "Buscar spot...",
    spots: "Spots",
    maps: "Mapas",
    archive: "Archivo",
    options: "Opciones",
    favorites: "Favoritos:",
    setHome: "Establecer como principal",
    currentHome: "Tu spot principal actual",
    forecast: "Pronóstico",
    graph: "Gráfico",
    tides: "Mareas y Olas",
    share: "Compartir",
    selectDay: "Seleccionar día:",
    today: "Hoy",
    tomorrow: "Mañana",
    windSpeed: "Velocidad del viento",
    windGusts: "Ráfagas",
    windDir: "Dirección del viento",
    pressure: "Presión",
    temp: "Temperatura",
    humidity: "Humedad",
    clouds: "Nubosidad",
    graphTitle: "Gráfico de Viento y Ráfagas",
    graphDesc: "Evolución de la velocidad del viento durante el día:",
    tidesTitle: "Pronóstico de Mareas y Olas",
    tidesDesc: "Datos aproximados de mareas para la ubicación actual:",
    highTide: "Marea Alta",
    lowTide: "Marea Baja",
    optionsTitle: "Opciones de Idioma y Unidades",
    selectLang: "Elige tu idioma preferido:",
    selectSpeed: "Elige la unidad de velocidad del viento:",
  },
  de: {
    home: "Startseite",
    gps: "GPS",
    searchPlaceholder: "Spot suchen...",
    spots: "Spots",
    maps: "Karten",
    archive: "Archiv",
    options: "Optionen",
    favorites: "Favoriten:",
    setHome: "Als Hauptspot festlegen",
    currentHome: "Aktueller Hauptspot",
    forecast: "Vorhersage",
    graph: "Diagramm",
    tides: "Gezeiten & Wellen",
    share: "Teilen",
    selectDay: "Tag wählen:",
    today: "Heute",
    tomorrow: "Morgen",
    windSpeed: "Windstärke",
    windGusts: "Böen",
    windDir: "Windrichtung",
    pressure: "Luftdruck",
    temp: "Temperatur",
    humidity: "Feuchtigkeit",
    clouds: "Bewölkung",
    graphTitle: "Wind- und Böendiagramm",
    graphDesc: "Entwicklung der Windgeschwindigkeit am gewählten Tag:",
    tidesTitle: "Gezeiten- und Wellenvorhersage",
    tidesDesc: "Ungefähre Gezeitendaten für den aktuellen Standort:",
    highTide: "Flut (High Tide)",
    lowTide: "Ebbe (Low Tide)",
    optionsTitle: "Sprach- und Einheitenoptionen",
    selectLang: "Wählen Sie Ihre bevorzugte Sprache:",
    selectSpeed: "Wählen Sie die Windgeschwindigkeitseinheit:",
  },
  it: {
    home: "Home",
    gps: "GPS",
    searchPlaceholder: "Cerca spot...",
    spots: "Spot",
    maps: "Mappe",
    archive: "Archivio",
    options: "Opzioni",
    favorites: "Preferiti:",
    setHome: "Imposta come principale",
    currentHome: "Spot principale attuale",
    forecast: "Previsioni",
    graph: "Grafico",
    tides: "Maree e Onde",
    share: "Condividi",
    selectDay: "Seleziona giorno:",
    today: "Oggi",
    tomorrow: "Domani",
    windSpeed: "Velocità vento",
    windGusts: "Raffiche",
    windDir: "Direzione vento",
    pressure: "Pressione",
    temp: "Temperatura",
    humidity: "Umidità",
    clouds: "Copertura nuvolosa",
    graphTitle: "Grafico Vento e Raffiche",
    graphDesc: "Evoluzione della velocità del vento durante la giornata:",
    tidesTitle: "Previsioni Maree e Onde",
    tidesDesc: "Dati approssimativi delle maree per la posizione corrente:",
    highTide: "Alta Marea",
    lowTide: "Bassa Marea",
    optionsTitle: "Opzioni Lingua e Unità",
    selectLang: "Scegli la tua lingua preferita:",
    selectSpeed: "Scegli l'unità di velocità del vento:",
  },
  ru: {
    home: "Главная",
    gps: "GPS",
    searchPlaceholder: "Поиск спота...",
    spots: "Споты",
    maps: "Карты",
    archive: "Архив",
    options: "Опции",
    favorites: "Избранное:",
    setHome: "Сделать главным",
    currentHome: "Текущий главный спот",
    forecast: "Прогноз",
    graph: "График",
    tides: "Приливы и волны",
    share: "Поделиться",
    selectDay: "Выберите день:",
    today: "Сегодня",
    tomorrow: "Завтра",
    windSpeed: "Скорость ветра",
    windGusts: "Порывы",
    windDir: "Направление",
    pressure: "Давление",
    temp: "Температура",
    humidity: "Влажность",
    clouds: "Облачность",
    graphTitle: "График ветра и порывов",
    graphDesc: "Изменение скорости ветра в выбранный день:",
    tidesTitle: "Прогноз приливов и волн",
    tidesDesc: "Приблизительные данные о приливах для текущего места:",
    highTide: "Прилив",
    lowTide: "Отлив",
    optionsTitle: "Язык и единицы измерения",
    selectLang: "Выберите предпочитаемый язык:",
    selectSpeed: "Выберите единицу скорости ветра:",
  },
  zh: {
    home: "首页",
    gps: "GPS",
    searchPlaceholder: "搜索地点...",
    spots: "地点",
    maps: "地图",
    archive: "存档",
    options: "选项",
    favorites: "收藏:",
    setHome: "设为主地点",
    currentHome: "当前主地点",
    forecast: "预报",
    graph: "图表",
    tides: "潮汐与海浪",
    share: "分享",
    selectDay: "选择日期:",
    today: "今天",
    tomorrow: "明天",
    windSpeed: "风速",
    windGusts: "阵风",
    windDir: "风向",
    pressure: "气压",
    temp: "温度",
    humidity: "湿度",
    clouds: "云量",
    graphTitle: "风速与阵风图表",
    graphDesc: "所选日期的风速变化趋势：",
    tidesTitle: "潮汐与海浪预报",
    tidesDesc: "当前位置的近似潮汐与海浪数据：",
    highTide: "高潮",
    lowTide: "低潮",
    optionsTitle: "语言与单位选项",
    selectLang: "选择您的首选语言：",
    selectSpeed: "选择风速单位：",
  },
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
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

  const [speedUnit, setSpeedUnit] = useState("kn");
  const [lang, setLang] = useState("ar");

  const t = translations[lang] || translations.ar;
  const isRtl = lang === "ar";

  const [activeModal, setActiveModal] = useState(null);

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
        await fetchWeather(lat, lon);
      },
      (error) => {
        setLoading(false);
        alert("Unable to retrieve your GPS location.");
      },
      { enableHighAccuracy: true }
    );
  };

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_gusts_10m,wind_direction_10m,cloud_cover&daily=sunrise,sunset&wind_speed_unit=${speedUnit}&timezone=auto`
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error("Weather error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(homeSpot.lat, homeSpot.lon);
  }, [speedUnit]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery
        )}&count=1&language=en&format=json`
      );
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const spot = data.results[0];
        const newCoords = {
          lat: spot.latitude,
          lon: spot.longitude,
        };
        setCoords(newCoords);
        const name = `${spot.country || ""} - ${spot.name}`;
        setLocationName(name);
        setSelectedDayIndex(0);
        await fetchWeather(spot.latitude, spot.longitude);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectFavorite = (spot) => {
    setCoords({ lat: spot.lat, lon: spot.lon });
    setLocationName(spot.name);
    setSelectedDayIndex(0);
    fetchWeather(spot.lat, spot.lon);
  };

  const shareLocation = async () => {
    const text = `Wind forecast - ${locationName}`;
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
    const arrows = ["↓", "↙", "←", "↖", "↑", "↗", "→", "↘"];
    const index = Math.round(deg / 45) % 8;
    return arrows[index];
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
        .wg-search svg { position: absolute; ${isRtl ? "left: 10px;" : "right: 10px;"} top: 9px; color: #67e8f9; }

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

        .ad-wrapper { display: flex; justify-content: center; padding: 5px 10px; }
        .ad-banner { width: 100%; max-width: 1000px; min-height: 90px; background: white; border: 1px solid #d1d5db; border-radius: 5px; overflow: hidden; }
        
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

        /* خلفية متميزة للرسم البياني (غير بيضاء - داكنة احترافية) */
        .graph-view {
          background: linear-gradient(135deg, #091a2a 0%, #102a43 50%, #0d2137 100%);
          color: #ffffff;
          padding: 24px; border-radius: 8px; border: 1px solid #1e3a5f; box-shadow: 0 6px 16px rgba(0,0,0,0.25); min-height: 380px;
        }
        .tides-view {
          background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
          padding: 24px; border-radius: 8px; border: 1px solid #bbf7d0; box-shadow: 0 4px 12px rgba(22,101,52,0.08); min-height: 380px;
        }
        .tide-card {
          display: flex; gap: 15px; align-items: center; background: rgba(255,255,255,0.85); backdrop-filter: blur(5px);
          border: 1px solid #bbf7d0; padding: 16px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);
        }

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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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
          .ad-wrapper { padding: 4px; }
          .ad-banner { min-height: 70px; }
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
            <Search size={16} />
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

      {/* FAVORITES */}
      <div className="favorites-bar">
        <span className="favorite-title">{t.favorites}</span>
        {favorites.map((fav, idx) => (
          <div
            key={idx}
            className={`favorite-chip ${
              fav.name === locationName ? "favorite-chip-active" : ""
            }`}
            onClick={() => selectFavorite(fav)}
          >
            <span>{fav.name.split("-")[1] || fav.name}</span>
            <button
              className="favorite-delete"
              onClick={(e) => removeFavoriteByName(e, fav.name)}
              title="Delete"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* TOP AD */}
      <div className="ad-wrapper">
        <AdBanner />
      </div>

      {/* LOCATION */}
      <div className="location-bar">
        <div className="location-name">
          <span>📍 {locationName}</span>
          <button className="favorite-star" onClick={toggleFavorite} title="Favorite">
            <Star
              size={19}
              fill={isFavorite ? "#facc15" : "none"}
              color={isFavorite ? "#f59e0b" : "#94a3b8"}
            />
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!isHomeSpot ? (
            <button className="set-home-link" onClick={setAsHomeSpot}>
              <MapPin size={13} color="#0284c7" />
              {t.setHome}
            </button>
          ) : (
            <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "800" }}>
              🏠 {t.currentHome}
            </span>
          )}

          {loading && (
            <div className="loading">
              <Loader2 size={16} className="animate-spin" />
              Loading...
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "forecast" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("forecast")}
        >
          <Activity size={14} style={{ verticalAlign: "middle", margin: "0 4px" }} />
          {t.forecast}
        </button>
        <button
          className={`tab ${activeTab === "graph" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("graph")}
        >
          <TrendingUp size={14} style={{ verticalAlign: "middle", margin: "0 4px" }} />
          {t.graph}
        </button>
        <button
          className={`tab ${activeTab === "tides" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("tides")}
        >
          <Waves size={14} style={{ verticalAlign: "middle", margin: "0 4px" }} />
          {t.tides}
        </button>
        <button className="tab" onClick={shareLocation}>
          <Share2 size={14} style={{ verticalAlign: "middle", margin: "0 4px" }} />
          {t.share}
        </button>
      </div>

      {/* DAYS SELECTOR BAR */}
      {activeTab === "forecast" && availableDays.length > 0 && (
        <div className="days-bar">
          <Calendar size={15} color="#475569" />
          <span style={{ fontWeight: "800", color: "#475569", fontSize: "12px" }}>{t.selectDay}</span>
          {availableDays.map((day) => (
            <button
              key={day.index}
              className={`day-btn ${selectedDayIndex === day.index ? "day-btn-active" : ""}`}
              onClick={() => setSelectedDayIndex(day.index)}
            >
              {day.label} ({day.date})
            </button>
          ))}
        </div>
      )}

      {/* MAIN */}
      <main className="main">
        {weatherData?.hourly && activeTab === "forecast" && (
          <div className="forecast-container">
            <div className="mobile-hint">
              📱 اسحب الجدول يمينًا ويسارًا لرؤية جميع الساعات
            </div>

            <div className="table-scroll">
              <table className="weather-table">
                <thead>
                  <tr>
                    <td className="row-title">
                      Date: {availableDays[selectedDayIndex]?.date || ""}
                    </td>
                    {weatherData.hourly.time.slice(startIndex, endIndex).map((t, idx) => (
                      <td
                        key={idx}
                        className="hour-cell"
                        style={{ background: "#f1f5f9", fontWeight: 900 }}
                      >
                        {t.split("T")[0].slice(5)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="row-title">Hour</td>
                    {weatherData.hourly.time.slice(startIndex, endIndex).map((t, idx) => (
                      <td
                        key={idx}
                        className="hour-cell"
                        style={{ background: "#ffffff", fontWeight: 900 }}
                      >
                        {t.split("T")[1]}
                      </td>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="row-title">💨 {t.windSpeed} ({speedUnit})</td>
                    {weatherData.hourly.wind_speed_10m
                      .slice(startIndex, endIndex)
                      .map((speed, idx) => {
                        const val = Math.round(speed);
                        return (
                          <td key={idx} className="hour-cell" style={getWindStyle(val)}>
                            {val}
                          </td>
                        );
                      })}
                  </tr>

                  <tr>
                    <td className="row-title">🌬️ {t.windGusts} ({speedUnit})</td>
                    {weatherData.hourly.wind_gusts_10m
                      .slice(startIndex, endIndex)
                      .map((gust, idx) => {
                        const val = Math.round(gust);
                        return (
                          <td key={idx} className="hour-cell" style={getWindStyle(val)}>
                            {val}
                          </td>
                        );
                      })}
                  </tr>

                  <tr>
                    <td className="row-title">🧭 {t.windDir}</td>
                    {weatherData.hourly.wind_direction_10m
                      .slice(startIndex, endIndex)
                      .map((dir, idx) => (
                        <td key={idx} className="hour-cell direction">
                          {getWindArrow(dir)}
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <td className="row-title">🌀 {t.pressure} (hPa)</td>
                    {weatherData.hourly.pressure_msl
                      ?.slice(startIndex, endIndex)
                      .map((pres, idx) => (
                        <td
                          key={idx}
                          className="hour-cell"
                          style={{ background: "#f8fafc", fontWeight: "700" }}
                        >
                          {Math.round(pres)}
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <td className="row-title">🌡️ {t.temp} (°C)</td>
                    {weatherData.hourly.temperature_2m
                      .slice(startIndex, endIndex)
                      .map((temp, idx) => {
                        const tempVal = Math.round(temp);
                        return (
                          <td key={idx} className="hour-cell" style={getTemperatureStyle(tempVal)}>
                            {tempVal}
                          </td>
                        );
                      })}
                  </tr>

                  <tr>
                    <td className="row-title">💧 {t.humidity} (%)</td>
                    {weatherData.hourly.relative_humidity_2m
                      ?.slice(startIndex, endIndex)
                      .map((hum, idx) => (
                        <td
                          key={idx}
                          className="hour-cell"
                          style={{ background: "#e0f2fe", color: "#0369a1" }}
                        >
                          {hum}
                        </td>
                      ))}
                  </tr>

                  {weatherData.hourly.cloud_cover && (
                    <tr>
                      <td className="row-title">☁️ {t.clouds} (%)</td>
                      {weatherData.hourly.cloud_cover
                        .slice(startIndex, endIndex)
                        .map((cloud, idx) => (
                          <td key={idx} className="hour-cell" style={getCloudStyle(cloud)}>
                            {cloud}
                          </td>
                        ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "graph" && (
          <div className="graph-view">
            <h3 style={{ marginTop: 0, color: "#38bdf8", display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={20} color="#38bdf8" />
              📈 {t.graphTitle}
            </h3>
            <p style={{ color: "#94a3b8", marginBottom: "15px" }}>
              {t.graphDesc}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                height: "220px",
                borderBottom: "2px solid #38bdf8",
                background: "rgba(15, 23, 42, 0.6)",
                borderRadius: "6px",
                padding: "10px",
                overflowX: "auto",
              }}
            >
              {weatherData?.hourly?.wind_speed_10m
                .slice(startIndex, endIndex)
                .map((speed, i) => {
                  const hgt = Math.min(Math.max(speed * 4, 10), 170);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: "32px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "9px",
                          color: "#38bdf8",
                          fontWeight: "800",
                          marginBottom: "4px",
                        }}
                      >
                        {Math.round(speed)}
                      </span>
                      <div
                        style={{
                          width: "16px",
                          height: `${hgt}px`,
                          background: "linear-gradient(to top, #0284c7, #38bdf8)",
                          borderRadius: "4px 4px 0 0",
                          boxShadow: "0 0 8px rgba(56,189,248,0.5)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "9px",
                          color: "#94a3b8",
                          marginTop: "6px",
                          fontWeight: "700",
                        }}
                      >
                        {i}h
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {activeTab === "tides" && (
          <div className="tides-view">
            <h3 style={{ marginTop: 0, color: "#065f46", display: "flex", alignItems: "center", gap: "8px" }}>
              <Waves size={20} color="#059669" />
              🌊 {t.tidesTitle}
            </h3>
            <p style={{ color: "#047857", marginBottom: "20px" }}>
              {t.tidesDesc}
            </p>

            <div className="tide-card">
              <div style={{ fontSize: "28px" }}>⬆️</div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", color: "#065f46", fontSize: "15px" }}>
                  {t.highTide}
                </h4>
                <span style={{ fontSize: "13px", color: "#047857" }}>
                  05:40 AM & 06:05 PM
                </span>
              </div>
            </div>

            <div className="tide-card" style={{ background: "rgba(254,242,242,0.85)", borderColor: "#fecaca" }}>
              <div style={{ fontSize: "28px" }}>⬇️</div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", color: "#991b1b", fontSize: "15px" }}>
                  {t.lowTide}
                </h4>
                <span style={{ fontSize: "13px", color: "#b91c1c" }}>
                  11:50 AM & 12:15 AM
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span>
                {activeModal === "spots" && `📍 ${t.spots}`}
                {activeModal === "maps" && `🗺️ ${t.maps}`}
                {activeModal === "archive" && `📁 ${t.archive}`}
                {activeModal === "options" && `⚙️ ${t.options}`}
              </span>
              <button
                onClick={() => setActiveModal(null)}
                style={{ background: "transparent", border: 0, color: "white", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {activeModal === "spots" && (
                <div>
                  <h4 style={{ marginTop: 0 }}>Favorite Spots</h4>
                  {favorites.map((fav, i) => (
                    <div
                      key={i}
                      onClick={() => { selectFavorite(fav); setActiveModal(null); }}
                      style={{
                        padding: "10px 12px", background: "#f8fafc", border: "1px solid #e2e8f0",
                        borderRadius: "6px", marginBottom: "8px", cursor: "pointer", fontWeight: "bold"
                      }}
                    >
                      📍 {fav.name}
                    </div>
                  ))}
                </div>
              )}

              {activeModal === "maps" && (
                <div>
                  <h4 style={{ marginTop: 0 }}>Location Coordinates</h4>
                  <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "6px", fontFamily: "monospace" }}>
                    Latitude: {coords.lat}<br />
                    Longitude: {coords.lon}
                  </div>
                </div>
              )}

              {activeModal === "archive" && (
                <div>
                  <h4 style={{ marginTop: 0 }}>Archive & History</h4>
                  <ul style={{ paddingLeft: "20px", color: "#334155" }}>
                    <li>Current Spot: <b>{locationName}</b></li>
                    <li>Home Spot: <b>{homeSpot.name}</b></li>
                  </ul>
                </div>
              )}

              {activeModal === "options" && (
                <div>
                  {/* اختيار اللغة */}
                  <h4 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                    <Globe size={18} color="#0284c7" />
                    {t.selectLang}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "20px" }}>
                    {[
                      { code: "ar", label: "العربية 🇲🇦" },
                      { code: "en", label: "English 🇬🇧" },
                      { code: "fr", label: "Français 🇫🇷" },
                      { code: "es", label: "Español 🇪🇸" },
                      { code: "de", label: "Deutsch 🇩🇪" },
                      { code: "it", label: "Italiano 🇮🇹" },
                      { code: "ru", label: "Русский 🇷🇺" },
                      { code: "zh", label: "中文 🇨🇳" },
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => setLang(item.code)}
                        style={{
                          padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px",
                          background: lang === item.code ? "#0284c7" : "#e2e8f0",
                          color: lang === item.code ? "white" : "#334155", border: 0, fontWeight: "bold"
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* اختيار وحدات قياس الرياح */}
                  <h4 style={{ marginTop: 0 }}>{t.selectSpeed}</h4>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {[
                      { unit: "kn", label: "Knots" },
                      { unit: "kmh", label: "km/h" },
                      { unit: "mph", label: "mph" },
                    ].map((item) => (
                      <button
                        key={item.unit}
                        onClick={() => setSpeedUnit(item.unit)}
                        style={{
                          padding: "8px 14px", borderRadius: "6px", cursor: "pointer",
                          background: speedUnit === item.unit ? "#0284c7" : "#e2e8f0",
                          color: speedUnit === item.unit ? "white" : "#334155", border: 0, fontWeight: "bold"
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}