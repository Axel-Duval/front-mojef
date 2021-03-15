import React from "react";
import Contacts from "../Contacts";
import Notes from "../Notes";
import Suivi from "../Suivi";
import Timeline from "../Timeline";
import "./stylesheet.css";

function SuiviContactsNotes() {
  return (
    <div className="uk-flex -scn-container">
      <div className="uk-width-1-2">
        <Suivi />
      </div>
      <hr className="uk-divider-vertical"></hr>
      <div className="uk-width-expand">
        <Contacts />
        <div className="uk-margin-medium-top">
          <Notes />
        </div>
      </div>
    </div>
  );
}

export default SuiviContactsNotes;
