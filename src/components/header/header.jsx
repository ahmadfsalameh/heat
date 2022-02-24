import React, { useRef, useState } from "react";
import { GiFireflake } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import Flags from "country-flag-icons/react/3x2";

import "./header.css";

const Header = () => {
  const [country, setCountry] = useState("JO");
  const [address, setAddress] = useState("Amman, Jordan");

  const location = useRef();

  const Flag = Flags[country];

  const focus = () => {
    location.current.focus();
  };
  return (
    <header>
      <div className="logo">
        <p>
          <span>
            <GiFireflake />
          </span>
          HEAT
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
      <div className="search">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-overlay" onClick={focus}></div>
          <span className="flag">
            <Flag />
          </span>
          <input type="text" value={address} ref={location} />
          <span className="location">
            <GrLocation />
          </span>
          <div className="form-background"></div>
        </form>
      </div>
    </header>
  );
};

export default Header;
