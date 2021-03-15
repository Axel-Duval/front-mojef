import React from "react";
import Contacts from "../Contacts";
import Notes from "../Notes";
import Suivi from "../Suivi";
import "./stylesheet.css";

function SuiviContactsNotes() {
  return (
    <div className="uk-flex -fullheight">
      <div className="-flex-1">
        <Suivi />
      </div>
      <div className="-flex-1">
        <div className="uk-flex uk-flex-column -fullheight">
          <Contacts />
          <Notes />
        </div>
      </div>
    </div>
  );
}

export default SuiviContactsNotes;
