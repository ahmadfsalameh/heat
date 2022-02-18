import React from "react";
import { TiWeatherWindy } from "react-icons/ti";

import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <p>
          <span>
            <TiWeatherWindy />
          </span>
          Weather
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Download App</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
      <div className="search"></div>
    </header>
  );
};

export default Header;
