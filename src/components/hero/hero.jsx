import React from "react";
import Header from "../header/header";

import heroImage from "../../assets/images/hero.jpg";
import "./hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <img src={heroImage} className="cover" />
      <Header />
    </section>
  );
};

export default Hero;
