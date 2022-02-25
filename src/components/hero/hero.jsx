import React, { useEffect, useState } from "react";
import Header from "../header/header";
import { RiMouseLine } from "react-icons/ri";

import heroImage from "../../assets/images/hero1.jpg";
import weatherJSON from "../../constants/weather";
import "./hero.css";

const Hero = () => {
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState("celsius");

  useEffect(() => {
    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=41685b31f7104bf597f114815222002&q=Amman&days=10&aqi=no&alerts=no"
    )
      .then((res) => res.json())
      .then((d) => setWeather(d));
  }, []);

  const changeUnit = ({ target }) => {
    setUnit(target.dataset.unit);
  };

  const getIcon = (code, isDay) => {
    const weatherObj = weatherJSON.find((e) => e.code === code);

    let IconName;

    if (isDay) IconName = weatherObj.icon[0];
    else IconName = weatherObj.icon[1];

    return <IconName className="weather-icon" />;
  };

  if (!Object.keys(weather).length) return null;

  const { current } = weather;
  return (
    <section className="hero">
      <img src={heroImage} className="cover" />
      <Header />
      <div className="weather-status">
        {getIcon(current.condition.code, current.isDay)}
        <p>
          <span>{weather.current.condition.text}</span>
          <span>
            {unit === "celsius"
              ? weather.current.temp_c
              : Math.round(weather.current.temp_f)}
            º
          </span>
          <div className="units">
            <button
              data-active={unit == "celsius" && "1"}
              data-unit="celsius"
              onClick={changeUnit}
            >
              C
            </button>
            <button
              data-active={unit == "fahrenheit" && "1"}
              data-unit="fahrenheit"
              onClick={changeUnit}
            >
              F
            </button>
          </div>
        </p>
        <button className="scroll-down">
          Scroll down <RiMouseLine />
        </button>
      </div>
    </section>
  );
};

export default Hero;
