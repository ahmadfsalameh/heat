import { useState, useEffect, useRef } from "react";
import { WeatherContext } from "./contexts/weatherContext";
import { CountryContext } from "./contexts/countryContext";
import Hero from "./components/hero/hero";
import Header from "./components/header/header";
import DownloadApp from "./components/downloadApp/downloadApp";
import Footer from "./components/footer/footer";
import scroll from "./utils/scroll";

import "./assets/styles/core.css";

const App = () => {
  const [weather, setWeather] = useState({});
  const [country, setCountry] = useState({
    country: "",
    address: "",
  });

  const article = useRef();

  useEffect(() => {
    fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IP_API}`
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
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${country.address}&days=10&aqi=no&alerts=no`
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

  const scrollToSection = (e) => {
    let location = "home";
    let val = 0;

    if (e) {
      e.preventDefault();
      location = e.target.dataset.location;
    }

    if (location === "download") val = 1;
    else if (location === "about") val = 2;

    scroll(article.current, val);
  };

  return (
    <article ref={article}>
      <WeatherContext.Provider value={weather}>
        <Hero scrollToSection={scrollToSection} />
        <CountryContext.Provider
          value={[country.country, country.address, setCountry]}
        >
          <Header article={article} scrollToSection={scrollToSection} />
        </CountryContext.Provider>
      </WeatherContext.Provider>
      <DownloadApp />
      <Footer />
    </article>
  );
};

export default App;
