import React, { useRef, useContext, useState, useEffect } from "react";
import { GiFireflake } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import { TiTimes } from "react-icons/ti";
import { HiMenuAlt3 } from "react-icons/hi";
import Flags from "country-flag-icons/react/3x2";
import { CountryContext } from "../../contexts/countryContext";
import _ from "lodash";
import countryList from "country-list";
import NoFlag from "./noFlag/noFlag";

import "./header.css";

const Header = ({ article, scrollToSection }) => {
  const [country, address, setCountry] = useContext(CountryContext);
  const [addressValue, setAddressValue] = useState(address);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nav, setNav] = useState(false);

  let prevAddress = useRef();
  const location = useRef();
  const results = useRef();
  const header = useRef();

  useEffect(() => {
    prevAddress.current = address;
    setAddressValue(address);

    article.current.addEventListener("scroll", handleScroll);

    return () => {
      article.current.removeEventListener("scroll", handleScroll);
    };
  }, [address]);

  const handleScroll = () => {
    if (article.current.scrollTop <= 100)
      header.current.classList.remove("header-scrolled");
    else header.current.classList.add("header-scrolled");
  };

  const focus = () => {
    location.current.focus();
    scrollToSection();
  };

  const blur = () => {
    setTimeout(() => {
      showResults(0);
    }, 250);
    if (addressValue.length !== prevAddress.current)
      setAddressValue(prevAddress.current);
  };

  const handleAddressChange = ([name, c]) => {
    if (c.toLowerCase() === "united kingdom")
      c = "United Kingdom of Great Britain and Northern Ireland";
    let code = countryList.getCode(c);

    if (!code) code = "";
    if (code === "UK") code = "GB";

    setCountry({
      country: code,
      address: `${name}, ${c}`,
    });

    prevAddress.current = `${name}, ${c}`;
    setAddressValue(`${name}, ${c}`);
  };
  const searchAddress = (value) => {
    setLoading(true);
    fetch(
      `http://api.weatherapi.com/v1/search.json?key=41685b31f7104bf597f114815222002&q=${value}`
    )
      .then((res) => res.json())
      .then((d) => {
        setSearchResults(
          _.take(
            d.sort((a, b) => {
              return (
                b.name.toLowerCase().indexOf(value.toLowerCase()) -
                a.name.toLowerCase().indexOf(value.toLowerCase())
              );
            }),
            3
          )
        );
        setLoading(false);
      });
  };

  const debounceSearch = useRef(
    _.debounce(searchAddress, 500, { maxWait: 2000 })
  );

  const showResults = (status = 1) => {
    location.current.dataset.results = `${status}`;
    results.current.dataset.results = `${status}`;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    setAddressValue(value);

    if (value.length) {
      debounceSearch.current(value);
      showResults();
    }
  };

  const Flag = country.length ? Flags[country] : NoFlag;

  return (
    <header ref={header}>
      <div className="header-container">
        <div className="logo">
          <a href="#home" onClick={scrollToSection}>
            <p>
              <span>
                <GiFireflake />
              </span>
              <span>HEAT</span>
            </p>
          </a>
        </div>
        <nav data-nav={nav}>
          <ul>
            <li>
              <a
                href="#download"
                onClick={scrollToSection}
                data-location="download"
              >
                Download App
              </a>
            </li>
            <li>
              <a href="#about" onClick={scrollToSection} data-location="about">
                About
              </a>
            </li>
            <li>
              <button onClick={() => setNav(false)}>
                <TiTimes />
              </button>
            </li>
          </ul>
        </nav>
        <div className="search">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-overlay" onClick={focus}></div>
            <span className="flag">
              <Flag />
            </span>
            <input
              type="text"
              value={addressValue}
              ref={location}
              onChange={handleInputChange}
              onBlur={blur}
            />
            <span className="location">
              <GrLocation />
            </span>
            <div className="form-background"></div>
          </form>
          <div className="results" ref={results}>
            <div className="loading"></div>
            {searchResults.length && !loading ? (
              <ul>
                {searchResults.map((r) => {
                  const { id, name, country: c } = r;
                  return (
                    <li key={id}>
                      <button onClick={() => handleAddressChange([name, c])}>
                        <span>
                          {name}, {c}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              !loading && <p>No results...</p>
            )}
          </div>
        </div>
        <button className="nav-toggler" onClick={() => setNav(true)}>
          <HiMenuAlt3 />
        </button>
      </div>
    </header>
  );
};

export default Header;
