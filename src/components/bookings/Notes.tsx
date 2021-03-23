import React, { useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import Heading from "../Heading";

interface INotes {
  notes: string;
  bookingId: string;
}

const Notes = ({ notes, bookingId }: INotes) => {
  const [_notes, setNotes] = useState(notes);

  const instance = useAxios();

  const saveNotes = () => {
    instance
      .patch(`/api/booking/${bookingId}`, { notes: _notes })
      .then((res) => console.log("ok work"))
      .catch((err) => {
        console.log(err);
        UIkit.notification({
          message: `Impossible de sauvegarder la note`,
          status: "danger",
          pos: "top-center",
        });
      });
  };

  return (
    <div className="uk-margin-medium-top">
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
        rows={4}
        value={_notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={saveNotes}
      />
    </div>
  );
};

export default Notes;
