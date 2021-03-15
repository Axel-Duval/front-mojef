import React from "react";
import Heading from "../Heading";
import "./style.css";

function Notes() {
  return (
    <div className="uk-margin-medium-left uk-margin-medium-top">
      <Heading
        title="Notes"
        subtitle="Synchronisation automatique"
        icon="info"
        tooltip="Vos notes sont sauvegardées automatiquement"
      />
      <textarea
        className="uk-textarea -notes-texarea"
        placeholder="Textarea"
        rows={6}
      ></textarea>
    </div>
  );
}

export default Notes;
