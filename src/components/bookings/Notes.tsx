import { useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import Heading from "../Heading";

interface INotes {
  notes: string;
  bookingId: string;
}

const Notes = ({ notes, bookingId }: INotes) => {
  const [reactiveNotes, setNotes] = useState(notes);

  const instance = useAxios();

  const saveNotes = () => {
    instance
      .patch(`/api/booking/${bookingId}`, { notes: reactiveNotes })
      .catch(() => {
        UIkit.notification({
          message: `Impossible de sauvegarder la note`,
          status: "danger",
          pos: "top-center",
        });
      });
  };

  return (
    <div className="uk-margin-medium-top">
      <Heading
        title="Notes"
        subtitle={reactiveNotes.split(" ").length + " mots"}
      >
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
        value={reactiveNotes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={saveNotes}
      />
    </div>
  );
};

export default Notes;
