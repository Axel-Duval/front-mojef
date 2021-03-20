import React from "react";
import svg from "../assets/images/collaboration.svg";
import FestivalForm from "../components/festivals/FestivalForm";

export default function NoFestival() {
  return (
    <div className="uk-flex" id="login-layout">
      <div className="uk-width-5-6 uk-width-2-3@s uk-width-1-3@m uk-width-1-4@l uk-padding">
        <h1 className="uk-text-center uk-text-bold uk-padding-small@m">
          Premier festival
        </h1>
        <FestivalForm />
      </div>
      <div className="uk-width-1-3@l uk-visible@l">
        <img
          src={svg}
          alt="Collaboration Illustration"
          className="uk-padding-large"
        />
      </div>
    </div>
  );
}
