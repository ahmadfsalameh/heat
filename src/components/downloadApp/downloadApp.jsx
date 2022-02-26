import React from "react";

import appScreenshot from "../../assets/images/app.png";
import googlePlay from "../../assets/images/google-play.svg";
import appStore from "../../assets/images/app-store.svg";

import "./downloadApp.css";

const DownloadApp = () => {
  return (
    <section className="download-app">
      <div className="app">
        <div className="app-info">
          <h1>Get weather updates directly on your phone</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
            aliquid porro commodi eum est, beatae pariatur consequuntur repellat
            minus at expedita rerum, laborum dolores nostrum.
          </p>
          <div className="download">
            <img src={googlePlay} />
            <img src={appStore} />
          </div>
        </div>
        <div className="app-shots">
          <img src={appScreenshot} />
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
