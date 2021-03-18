import React, { useState } from "react";
import Heading from "../Heading";
import "./style.css";

const Notes = () => {
  const [notes, setNotes] = useState("");

  const save = () => {
    console.log("saved");
  };

  return (
    <div className="uk-margin-medium-left uk-margin-medium-top">
      <Heading title="Notes" subtitle="Synchronisation automatique">
        <span
          className="uk-icon-link"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
        />
      </Heading>
      <textarea
        className="uk-textarea -notes-texarea"
        placeholder="Aa"
        rows={6}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={save}
      />
    </div>
  );
};

export default Notes;
