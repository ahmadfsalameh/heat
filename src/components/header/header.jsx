import React, { useRef, useContext, useState, useEffect } from "react";
import { GiFireflake } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import Flags from "country-flag-icons/react/3x2";
import { CountryContext } from "../../contexts/countryContext";
import _ from "lodash";
import countryList from "country-list";

import "./header.css";

const Header = () => {
  const [country, address, setCountry] = useContext(CountryContext);
  const [addressValue, setAddressValue] = useState(address);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  let prevAddress = useRef(addressValue);
  const location = useRef();
  const results = useRef();

  const Flag = Flags[country];

  const focus = () => {
    location.current.focus();
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

    if (!code) code = "JO";
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
    </header>
  );
};

export default Header;
