import React from "react";
import Heading from "../Heading";
import Timeline from "../Timeline";
import "./stylesheet.css";

function Suivi() {
  return (
    <div className="uk-margin-medium-right -suivi-container">
      <Heading
        title="Suivi des échanges"
        subtitle="Dernière mise a jour il y a 2h"
        icon="info"
      />
      <Timeline />
    </div>
  );
}

export default Suivi;
