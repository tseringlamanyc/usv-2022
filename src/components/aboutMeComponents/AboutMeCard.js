import React from "react";
import { Button, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./AboutMeCard.scss";

function AboutMeCard() {
  return (
    <div className="aboutMeCard">
      <div className="aboutMeCard_pic">
        <img src="./my-avatar.png" />
      </div>

      <div className="aboutMeCard_Info">
        <div className="aboutMeCard_Info_name">Tsering Lama </div>

        <div className="aboutMeCard_Info_blurb">
          I'm Tsering Lama, a full-stack web developer based in New York City, NY
        </div>

        <div className="aboutMeCard_Info_socials">
          <ul>
            <li>
              <a>
                <IconButton target="_blank" href="https://github.com/tseringlamanyc">
                  <GitHubIcon fontSize="large" style={{ color: "black" }} />
                </IconButton>
              </a>
            </li>

            <li>
              {" "}
              <a>
                <IconButton target="_blank" href="https://www.linkedin.com/in/tsering-lama-nyc/">
                  <LinkedInIcon fontSize="large" style={{ color: "black" }} />
                </IconButton>
              </a>
            </li>

            <li>
              <a>
                <IconButton target="_blank" href="https://twitter.com/tsenykk">
                  <TwitterIcon fontSize="large" style={{ color: "black" }} />
                </IconButton>
              </a>
            </li>
          </ul>
        </div>

        <div className="aboutMeCard_Info_cv">
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1vL1dwtd0mRzjVsp2OA62-gsYbvOPwzd_/view?usp=sharing">
            <Button variant="outlined">Download CV</Button>
          </a>
        </div>
      </div>

      <div className="aboutMeCard_skills">
        <h3>Skills</h3>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Swift</li>
          <li>Python</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutMeCard;
