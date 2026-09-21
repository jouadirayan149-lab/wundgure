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

  // Home Spot (الموقع الشخصي الرئيسي)
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
    e.stopPropagation(); // منع الضغط على الزر الرئيسي للموقع
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

  const getWindArrow = (deg) => {
    const arrows = ["↓", "↙", "←", "↖", "↑", "↗", "→", "↘"];
    const index = Math.round(deg / 45) % 8;
    return arrows[index];
  };

  const getWindStyle = (knots) => {
    if (knots <= 3) return { backgroundColor: "#dff9ff", color: "#0f172a" };
    if (knots <= 6) return { backgroundColor: "#8be9f5", color: "#0f172a" };
    if (knots <= 8)
      return {
        backgroundColor: "#22d3ee",
        color: "#082f49",
        fontWeight: "700",
      };
    if (knots <= 11)
      return {
        backgroundColor: "#00cfff",
        color: "#001018",
        fontWeight: "800",
      };
    if (knots <= 14)
      return {
        backgroundColor: "#00e676",
        color: "#001b0b",
        fontWeight: "900",
      };
    if (knots <= 19)
      return {
        backgroundColor: "#76ff03",
        color: "#101800",
        fontWeight: "900",
      };
    if (knots <= 25)
      return {
        backgroundColor: "#ffe600",
        color: "#171200",
        fontWeight: "900",
      };
    if (knots <= 30)
      return {
        backgroundColor: "#ff9800",
        color: "#1a0b00",
        fontWeight: "900",
      };
    return { backgroundColor: "#ff1744", color: "#ffffff", fontWeight: "900" };
  };

  const getTemperatureStyle = (temp) => {
    if (temp < 10)
      return {
        backgroundColor: "#60a5fa",
        color: "#ffffff",
        fontWeight: "800",
      };
    if (temp < 18)
      return {
        backgroundColor: "#7dd3fc",
        color: "#082f49",
        fontWeight: "800",
      };
    if (temp <= 23)
      return {
        backgroundColor: "#fde047",
        color: "#422006",
        fontWeight: "900",
      };
    if (temp <= 28)
      return {
        backgroundColor: "#fb923c",
        color: "#ffffff",
        fontWeight: "900",
      };
    if (temp <= 33)
      return {
        backgroundColor: "#fb7185",
        color: "#ffffff",
        fontWeight: "900",
      };
    return { backgroundColor: "#ef233c", color: "#ffffff", fontWeight: "900" };
  };

  const getCloudStyle = (cloud) => {
    if (cloud <= 20) return { backgroundColor: "#bae6fd", color: "#082f49" };
    if (cloud <= 40) return { backgroundColor: "#7dd3fc", color: "#082f49" };
    if (cloud <= 60) return { backgroundColor: "#cbd5e1", color: "#1e293b" };
    if (cloud <= 80) return { backgroundColor: "#64748b", color: "#ffffff" };
    return { backgroundColor: "#1e293b", color: "#ffffff" };
  };

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_gusts_10m,wind_direction_10m,cloud_cover&wind_speed_unit=kn&timezone=auto`
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error("Weather error:", err);
    } finally {
      setLoading(false);
    }
  };

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
        alert("تم نسخ معلومات الموقع");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchWeather(homeSpot.lat, homeSpot.lon);
  }, []);

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
            ? "اليوم"
            : daysMap.length === 1
            ? "غداً"
            : dayDate,
      });
      if (daysMap.length >= 7) break;
    }
    return daysMap;
  };

  const availableDays = getAvailableDays();
  const startIndex = selectedDayIndex * 24;
  const endIndex = startIndex + 24;

  return (
    <div className="wg-app">
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
        .wg-logo { display: flex; align-items: center; gap: 7px; font-size: 20px; font-weight: 900; white-space: nowrap; cursor: pointer; }
        .wg-logo span { color: #22d3ee; }
        .home-btn {
          background: #0ea5e9; border: 0; color: white; padding: 7px 11px; border-radius: 6px;
          cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: 800; font-size: 12px;
        }
        .home-btn:hover { background: #0284c7; }
        .wg-search { position: relative; width: 280px; }
        .wg-search input {
          width: 100%; height: 34px; background: #162b3d; color: white;
          border: 1px solid #31556d; border-radius: 6px; padding: 0 38px 0 12px; outline: none;
        }
        .wg-search input:focus { border-color: #22d3ee; box-shadow: 0 0 0 2px rgba(34,211,238,.15); }
        .wg-search svg { position: absolute; right: 10px; top: 9px; color: #67e8f9; }
        .wg-nav { display: flex; gap: 5px; margin-left: auto; }
        .wg-nav button { border: 0; background: transparent; color: #cbd5e1; padding: 8px 9px; border-radius: 5px; cursor: pointer; }
        .wg-nav button:hover { background: #1e3a50; color: white; }
        .wg-sun { display: flex; gap: 12px; color: #cbd5e1; white-space: nowrap; font-size: 11px; }
        .mobile-menu-button {
          display: none; margin-left: auto; background: #12344a; border: 1px solid #2c6078;
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
        .weather-table .row-title { width: 185px; min-width: 185px; text-align: left; padding-left: 10px; background: #f8fafc; font-weight: 900; position: sticky; left: 0; z-index: 5; box-shadow: 2px 0 3px rgba(0,0,0,.08); }
        .weather-table thead .row-title { background: #dbe4ee; }
        .hour-cell { min-width: 42px; }
        .direction { background: #ddd6fe; color: #5b21b6; font-size: 17px; font-weight: 900; }
        .mobile-hint { display: none; }
        .graph-view, .tides-view { background: white; padding: 20px; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,.06); min-height: 350px; }
        .tide-card { display: flex; gap: 15px; align-items: center; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 6px; margin-bottom: 10px; }

        @media (max-width: 800px) {
          .wg-header { padding: 7px 9px; position: relative; }
          .wg-header-main { flex-wrap: wrap; gap: 7px; }
          .wg-logo { font-size: 18px; }
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
          .weather-table .row-title { width: 155px; min-width: 155px; font-size: 10px; padding-left: 7px; }
          .weather-table td { height: 29px; padding: 3px; }
          .hour-cell { min-width: 43px; }
        }
      `}</style>

      {/* HEADER */}
      <header className="wg-header">
        <div className="wg-header-main">
          <div className="wg-logo" onClick={goToHomeSpot}>
            <Compass size={23} />
            <span>windgure</span>
          </div>

          <button className="home-btn" onClick={goToHomeSpot} title="الانتقال للموقع الشخصي">
            <Home size={15} />
            <span>موقعي</span>
          </button>

          <form className="wg-search" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spot..."
            />
            <Search size={16} />
          </form>

          <nav className="wg-nav">
            <button>📍 Spots</button>
            <button>🗺️ Maps</button>
            <button>📁 Archive</button>
            <button>⚙️ Options</button>
          </nav>

          <div className="wg-sun">
            <span>☀️ 07:20 - 19:26</span>
            <span>🌙 16:42 - 01:56</span>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

          {mobileMenu && (
            <div className="mobile-menu">
              <button onClick={goToHomeSpot}>🏠 موقعي الشخصي</button>
              <button>📍 Spots</button>
              <button>🗺️ Maps</button>
              <button>📁 Archive</button>
              <button>⚙️ Options</button>
            </div>
          )}
        </div>
      </header>

      {/* FAVORITES (مع ميزة الحذف المتقدمة) */}
      <div className="favorites-bar">
        <span className="favorite-title">★ Favorites:</span>
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
              title="حذف من المفضلات"
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
          <button className="favorite-star" onClick={toggleFavorite} title="إضافة/إزالة من المفضلات">
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
              تعيين كموقع شخصي
            </button>
          ) : (
            <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "800" }}>
              🏠 موقعك الشخصي الحالي
            </span>
          )}

          {loading && (
            <div className="loading">
              <Loader2 size={16} className="animate-spin" />
              Updating...
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
          <Activity
            size={14}
            style={{ verticalAlign: "middle", marginRight: 4 }}
          />
          Forecast
        </button>
        <button
          className={`tab ${activeTab === "graph" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("graph")}
        >
          <TrendingUp
            size={14}
            style={{ verticalAlign: "middle", marginRight: 4 }}
          />
          Graph
        </button>
        <button
          className={`tab ${activeTab === "tides" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("tides")}
        >
          <Waves
            size={14}
            style={{ verticalAlign: "middle", marginRight: 4 }}
          />
          Tides & Waves
        </button>
        <button className="tab" onClick={shareLocation}>
          <Share2
            size={14}
            style={{ verticalAlign: "middle", marginRight: 4 }}
          />
          Share
        </button>
      </div>

      {/* DAYS SELECTOR BAR */}
      {activeTab === "forecast" && availableDays.length > 0 && (
        <div className="days-bar">
          <Calendar size={15} color="#475569" />
          <span style={{ fontWeight: "800", color: "#475569", fontSize: "12px" }}>اختر اليوم:</span>
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
                        style={{
                          background: "#f1f5f9",
                          fontWeight: 900,
                        }}
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
                        style={{
                          background: "#ffffff",
                          fontWeight: 900,
                        }}
                      >
                        {t.split("T")[1]}
                      </td>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="row-title">💨 Wind speed (knots)</td>
                    {weatherData.hourly.wind_speed_10m
                      .slice(startIndex, endIndex)
                      .map((speed, idx) => {
                        const knots = Math.round(speed);
                        return (
                          <td
                            key={idx}
                            className="hour-cell"
                            style={getWindStyle(knots)}
                          >
                            {knots}
                          </td>
                        );
                      })}
                  </tr>

                  <tr>
                    <td className="row-title">🌬️ Wind gusts (knots)</td>
                    {weatherData.hourly.wind_gusts_10m
                      .slice(startIndex, endIndex)
                      .map((gust, idx) => {
                        const knots = Math.round(gust);
                        return (
                          <td
                            key={idx}
                            className="hour-cell"
                            style={getWindStyle(knots)}
                          >
                            {knots}
                          </td>
                        );
                      })}
                  </tr>

                  <tr>
                    <td className="row-title">🧭 Wind direction</td>
                    {weatherData.hourly.wind_direction_10m
                      .slice(startIndex, endIndex)
                      .map((dir, idx) => (
                        <td key={idx} className="hour-cell direction">
                          {getWindArrow(dir)}
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <td className="row-title">🌀 Pressure (hPa)</td>
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
                    <td className="row-title">🌡️ Temperature (°C)</td>
                    {weatherData.hourly.temperature_2m
                      .slice(startIndex, endIndex)
                      .map((temp, idx) => {
                        const t = Math.round(temp);
                        return (
                          <td
                            key={idx}
                            className="hour-cell"
                            style={getTemperatureStyle(t)}
                          >
                            {t}
                          </td>
                        );
                      })}
                  </tr>

                  <tr>
                    <td className="row-title">💧 Humidity (%)</td>
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
                      <td className="row-title">☁️ Cloud cover (%)</td>
                      {weatherData.hourly.cloud_cover
                        .slice(startIndex, endIndex)
                        .map((cloud, idx) => (
                          <td
                            key={idx}
                            className="hour-cell"
                            style={getCloudStyle(cloud)}
                          >
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
            <h3 style={{ marginTop: 0, color: "#0f172a" }}>
              📈 رسم بياني لسرعة الرياح والهبات (Wind & Gusts Graph)
            </h3>
            <p style={{ color: "#64748b" }}>
              نظرة سريعة على تطور سرعات الرياح خلال اليوم المحدد:
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                height: "200px",
                borderBottom: "2px solid #cbd5e1",
                paddingBottom: "10px",
                overflowX: "auto",
                marginTop: "20px",
              }}
            >
              {weatherData?.hourly?.wind_speed_10m
                .slice(startIndex, endIndex)
                .map((speed, i) => {
                  const hgt = Math.min(Math.max(speed * 4, 10), 180);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: "30px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "9px",
                          color: "#475569",
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
                          borderRadius: "3px 3px 0 0",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "9px",
                          color: "#64748b",
                          marginTop: "5px",
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
            <h3 style={{ marginTop: 0, color: "#0f172a" }}>
              🌊 أوقات المد والجزر وحالة الأمواج (Tides & Waves)
            </h3>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>
              البيانات التقريبية لحالة المد والجزر بناءً على الموقع الحالي:
            </p>

            <div className="tide-card">
              <div style={{ fontSize: "24px" }}>⬆️</div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", color: "#166534" }}>
                  مد مرتفع (High Tide)
                </h4>
                <span style={{ fontSize: "12px", color: "#15803d" }}>
                  التوقيت المتوقع: 04:42 صباحاً و 05:10 مساءً - الارتفاع المقدر:
                  2.8 متر
                </span>
              </div>
            </div>

            <div
              className="tide-card"
              style={{
                background: "#fffbeb",
                borderColor: "#fde68a",
              }}
            >
              <div style={{ fontSize: "24px" }}>⬇️</div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", color: "#92400e" }}>
                  جزر منخفض (Low Tide)
                </h4>
                <span style={{ fontSize: "12px", color: "#b45309" }}>
                  التوقيت المتوقع: 10:50 صباحاً و 11:15 مساءً - الانخفاض المقدر:
                  0.4 متر
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}