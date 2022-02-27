import React from "react";
import { GiFireflake } from "react-icons/gi";
import { TiInfoLarge } from "react-icons/ti";
import { BiLink } from "react-icons/bi";

import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-cell">
          <h4>
            <span>
              <TiInfoLarge />
            </span>
            About
          </h4>
          <p>
            This application uses a combination of APIs to get the weather in
            your area and anywhere in the world. These APIs are (weatherapi.com)
            that's used to get the weather and search places and
            (ipgeolocation.io) that's used to get the location of users once the
            application loads to automatically get the weather.
          </p>
          <p>
            Made by <a>Ahmad Salameh</a>.
          </p>
        </div>
        <div className="footer-cell">
          <h4>
            <span>
              <BiLink />
            </span>
            Links
          </h4>
          <ul>
            <li>
              <a>weatherapi.com</a>
            </li>
            <li>
              <a>ipgeolocation.io</a>
            </li>
            <li>
              <a>Source Code</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
