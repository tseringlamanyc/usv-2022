import React from "react";
import AboutMeCard from "../../components/aboutMeComponents/AboutMeCard";
import Navbar from "../../components/navBar/NavBar";

import "./AboutMe.scss";

function AboutMe() {
  return (
    <div className="aboutMe">
      <Navbar />
      <AboutMeCard />
    </div>
  );
}

export default AboutMe;
