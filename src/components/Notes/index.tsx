import React from "react";
import Heading from "../Heading";

function Notes() {
  return (
    <div className="uk-margin-medium-left">
      <Heading
        title="Notes"
        subtitle="Synchronisation automatique"
        icon="info"
        tooltip="Vos notes sont sauvegardées automatiquement"
      />
    </div>
  );
}

export default Notes;
