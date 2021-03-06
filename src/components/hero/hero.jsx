import React, { useContext, useState } from "react";
import { WeatherContext } from "../../contexts/weatherContext";
import { RiMouseLine } from "react-icons/ri";

import heroImage from "../../assets/images/hero.webp";
import weatherJSON from "../../constants/weather";
import "./hero.css";

const Hero = ({ scrollToSection }) => {
  const weather = useContext(WeatherContext);
  const [unit, setUnit] = useState("celsius");

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

  const { current } = weather;
  const isWeather = Object.keys(weather).length;
  return (
    <section className="hero">
      <img src={heroImage} className="cover" />
      <div
        className={isWeather ? "hero-loader hero-loader-hide" : "hero-loader"}
      ></div>
      {!isWeather || (
        <div className="weather-status">
          {getIcon(current.condition.code, current.is_day)}
          <div className="weather-info">
            <span>{weather.current.condition.text}</span>
            <span>
              {unit === "celsius"
                ? Math.round(weather.current.temp_c)
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
          </div>
          <button
            className="scroll-down"
            onClick={scrollToSection}
            data-location="download"
          >
            Scroll down <RiMouseLine />
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;
