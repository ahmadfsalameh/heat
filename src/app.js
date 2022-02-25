import { useState, useEffect } from "react";
import Hero from "./components/hero/hero";
import { WeatherContext } from "./contexts/weatherContext";

import "./assets/styles/core.css";

const App = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=41685b31f7104bf597f114815222002&q=Amman&days=10&aqi=no&alerts=no"
    )
      .then((res) => res.json())
      .then((d) => setWeather(d));
  }, []);

  return (
    <WeatherContext.Provider value={weather}>
      <Hero />
    </WeatherContext.Provider>
  );
};

export default App;
