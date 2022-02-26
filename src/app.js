import { useState, useEffect } from "react";
import { WeatherContext } from "./contexts/weatherContext";
import { CountryContext } from "./contexts/countryContext";
import Hero from "./components/hero/hero";
import Header from "./components/header/header";
import DownloadApp from "./components/downloadApp/downloadApp";

import "./assets/styles/core.css";

const App = () => {
  const [weather, setWeather] = useState({});
  const [country, setCountry] = useState({
    country: "",
    address: "",
  });
  const [agent, setAgent] = useState({});

  useEffect(() => {
    fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=55e0b8f0cb3246a88c99d165e8b1be77`
    )
      .then((res) => res.json())
      .then((d) => {
        setCountry({
          country: d.country_code2,
          address: `${d.city}, ${d.country_name}`,
        });
      });
  }, []);

  useEffect(() => {
    if (!country.address) return;
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
    <article>
      <WeatherContext.Provider value={weather}>
        <Hero />
        <CountryContext.Provider
          value={[country.country, country.address, setCountry]}
        >
          <Header />
        </CountryContext.Provider>
      </WeatherContext.Provider>
      <DownloadApp />
    </article>
  );
};

export default App;
