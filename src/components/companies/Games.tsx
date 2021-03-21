import { IGame } from "../../utils/types";
import Heading from "../Heading";
import GamesTable from "../Tables/Games";

interface ICompanyGames {
  games: IGame[];
}

const Games = ({ games }: ICompanyGames) => {
  return (
    <>
      <Heading title="Jeux" subtitle={games.length + " jeux trouvés"}>
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
          onClick={() => console.log("add contact")}
        />
        <span
          className="uk-icon-link -pointer uk-margin-small-right"
          uk-icon="info"
          uk-tooltip="Vous pouvez ajouter, modifier ou supprimer des contacts"
        />
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
        />
      </Heading>
      <div className="-company-contacts">
        <div className="-company-contact-container">
          <GamesTable
            games={games}
            onEdit={() => console.log("delete")}
            onDelete={() => console.log("delete")}
            onToggle={() => console.log("toggle")}
          />
        </div>
      </div>
    </>
  );
};

export default Games;
