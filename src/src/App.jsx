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
    selectLang: "Choisissez votre langue préférée :",
    selectSpeed: "Choisissez l'unité de vitesse du vent :",
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

  // دالة جلب الطقس والأمواج والتيارات المائية بالتزامن
  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      // 1. جلب بيانات الطقس والرياح
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_gusts_10m,wind_direction_10m,cloud_cover&daily=sunrise,sunset&wind_speed_unit=${speedUnit}&timezone=auto`
      );
      const data = await weatherRes.json();

      // 2. جلب بيانات البحر، الأمواج، والتيارات المائية وسط الماء
      try {
        const marineRes = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_period,wave_direction,ocean_current_velocity,ocean_current_direction&timezone=auto`
        );
        const marineData = await marineRes.json();

        if (marineData && marineData.hourly) {
          data.hourly.wave_height = marineData.hourly.wave_height;
          data.hourly.wave_period = marineData.hourly.wave_period;
          data.hourly.wave_direction = marineData.hourly.wave_direction;
          data.hourly.ocean_current_velocity = marineData.hourly.ocean_current_velocity;
          data.hourly.ocean_current_direction = marineData.hourly.ocean_current_direction;
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

  useEffect(() => {
    fetchWeather(coords.lat, coords.lon);
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

        .graph-view {
          background: linear-gradient(135deg, #091a2a 0%, #102a43 50%, #0d2137 100%);
          color: #ffffff;
          padding: 24px; border-radius: 8px; border: 1px solid #1e3a5f; box-shadow: 0 6px 16px rgba(0,0,0,0.25); min-height: 380px;
        }
        .tides-view {
          background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
          padding: 24px; border-radius: 8px; border: 1px solid #bbf7d0; box-shadow: 0 4px 12px rgba(22,101,52,0.08); min-height: 380px;
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
      <div className="ad-wrapper">
        <AdBanner slotId="top-banner" />
      </div>

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
            <h3 style={{ marginTop: 0, color: "#38bdf8" }}>{t.graphTitle}</h3>
            <p style={{ color: "#94a3b8" }}>{t.graphDesc}</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "220px", marginTop: "30px", paddingBottom: "10px", borderBottom: "1px solid #334155" }}>
              {weatherData?.hourly?.wind_speed_10m
                ?.slice(startIndex, endIndex)
                .map((val, idx) => {
                  const h = Math.min(val * 5, 180);
                  return (
                    <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                      <span style={{ fontSize: "10px", color: "#38bdf8", fontWeight: "bold" }}>{Math.round(val)}</span>
                      <div style={{ width: "100%", height: `${h}px`, background: "linear-gradient(to top, #0284c7, #38bdf8)", borderRadius: "3px 3px 0 0" }} />
                      <span style={{ fontSize: "9px", color: "#64748b" }}>{idx % 3 === 0 ? `${idx}h` : ""}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {activeTab === "tides" && (
          <div className="tides-view">
            <h3 style={{ marginTop: 0, color: "#0369a1" }}>{t.tidesTitle}</h3>
            <p style={{ color: "#334155" }}>{t.tidesDesc}</p>
            <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
              <div style={{ background: "white", padding: "12px", borderRadius: "8px", borderLeft: "4px solid #0284c7" }}>
                <strong>🌊 {t.highTide}:</strong> 04:12 & 16:45
              </div>
              <div style={{ background: "white", padding: "12px", borderRadius: "8px", borderLeft: "4px solid #f59e0b" }}>
                <strong>🏖️ {t.lowTide}:</strong> 10:30 & 22:50
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AD BANNER BOTTOM */}
      <div className="ad-wrapper" style={{ marginTop: "15px" }}>
        <AdBanner slotId="bottom-banner" />
      </div>

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
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div>
                    <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                      🌐 {t.selectLang}
                    </label>
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value)}
                      style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                    >
                      <option value="ar">العربية (Arabic)</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                      💨 {t.selectSpeed}
                    </label>
                    <select
                      value={speedUnit}
                      onChange={(e) => setSpeedUnit(e.target.value)}
                      style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                    >
                      <option value="kn">Knots (عقدة)</option>
                      <option value="kmh">km/h (كم/ساعة)</option>
                      <option value="ms">m/s (متر/ثانية)</option>
                      <option value="mph">mph (ميل/ساعة)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeModal !== "options" && (
                <p style={{ textAlign: "center", color: "#64748b" }}>
                  الخدمة قيد التطوير وستكون متاحة قريباً.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}