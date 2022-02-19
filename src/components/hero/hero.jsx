import React, { useState } from "react";
import Header from "../header/header";
import { FaCloudMoon } from "react-icons/fa";
import { BsArrowDownCircle } from "react-icons/bs";

import heroImage from "../../assets/images/hero.jpg";
import "./hero.css";

const Hero = () => {
  const [weather, setWeather] = useState({
    now: {
      description: "cloudy",
      celsius: 18,
      fahrenheit: 50,
    },
  });
  const [unit, setUnit] = useState("celsius");

  const changeUnit = ({ target }) => {
    setUnit(target.dataset.unit);
  };
  return (
    <section className="hero">
      <img src={heroImage} className="cover" />
      <Header />
      <div className="weather-status">
        <FaCloudMoon className="weather-icon" />
        <p>
          <span>{weather.now.description}</span>
          <span>{weather.now[unit]}º</span>
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
      </div>
    </section>
  );
};

export default Hero;
