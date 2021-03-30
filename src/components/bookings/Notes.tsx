import { useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IBookingSummarize } from "../../utils/types";
import Heading from "../Heading";

interface INotes {
  booking: IBookingSummarize;
}

const Notes = ({ booking }: INotes) => {
  const [notes, setNotes] = useState(booking.notes);

  const instance = useAxios();

  const saveNotes = () => {
    instance.patch(`/api/booking/${booking.id}`, { notes: notes }).catch(() => {
      UIkit.notification({
        message: `Impossible de sauvegarder la note`,
        status: "danger",
        pos: "top-center",
      });
    });
  };

  return (
    <div className="uk-margin-medium-top">
      <Heading title="Notes" subtitle={notes.split(" ").length + " mots"}>
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
        />
      </Heading>
      <textarea
        className="uk-textarea -notes-texarea"
        placeholder="Aa"
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={saveNotes}
      />
    </div>
  );
};

export default Notes;
