import { useState, useEffect } from "react";
import Hero from "./components/hero/hero";
import Header from "./components/header/header";
import { WeatherContext } from "./contexts/weatherContext";
import { CountryContext } from "./contexts/countryContext";

import "./assets/styles/core.css";

const App = () => {
  const [weather, setWeather] = useState({});
  const [country, setCountry] = useState({
    country: "JO",
    address: "Amman, Jordan",
  });

  useEffect(() => {
    setWeather({});
    const startingTime = new Date().getTime() / 1000;
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=41685b31f7104bf597f114815222002&q=${country.address}&days=10&aqi=no&alerts=no`
    )
      .then((res) => res.json())
      .then((d) => {
        const endTime = new Date().getTime() / 1000;
        if (endTime - startingTime < 3)
          setTimeout(() => {
            setWeather(d);
          }, 2000);
        else setWeather(d);
      });
  }, [country]);

  return (
    <WeatherContext.Provider value={weather}>
      <Hero />
      <CountryContext.Provider
        value={[country.country, country.address, setCountry]}
      >
        <Header />
      </CountryContext.Provider>
    </WeatherContext.Provider>
  );
};

export default App;
