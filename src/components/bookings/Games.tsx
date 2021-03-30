import { IBookingSummarize } from "../../utils/types";
import Heading from "../Heading";

interface IBookingGames {
  booking: IBookingSummarize;
}

const BookingGames = ({ booking }: IBookingGames) => {
  return (
    <div className="uk-flex uk-flex-column -fullheight -noselect">
      <Heading title="Jeux présentés" subtitle="Jeux trouvés : 10">
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
        />
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="info"
          uk-tooltip="Vous pouvez ajouter/modifier ou supprimer des jeux"
        />
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
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
