import React from "react";
import Heading from "../Heading";
import Timeline from "../Timeline";
import "./stylesheet.css";

function Suivi() {
  return (
    <div className="uk-margin-medium-right uk-flex uk-flex-column -fullheight">
      <Heading
        title="Suivi des échanges"
        subtitle="Dernière mise a jour il y a 2h"
        icon="info"
      />
      <Timeline exchanges={"16/03/2021<$>ttttt<#>16/03/2021<$>efaefefzef"} />
    </div>
  );
}

export default Suivi;
