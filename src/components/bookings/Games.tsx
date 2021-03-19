import React from "react";
import Heading from "../Heading";

const BookingGames = () => {
  return (
    <div className="uk-flex uk-flex-column -fullheight -noselect">
      <Heading
        title="Jeux présentés"
        subtitle="Dernière mise a jour il y a 10min"
      >
        <span className="uk-icon-link uk-margin-small-right" uk-icon="plus" />
        <span
          className="uk-icon-link"
          uk-icon="info"
          uk-tooltip="Vous pouvez ajouter/modifier ou supprimer des jeux"
        />
      </Heading>
      <div className="-booking-games">
        <ul className="-booking-games-container">
          <li>aaa</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingGames;
