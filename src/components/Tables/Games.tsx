import { Link } from "react-router-dom";
import { ITableGames, IGame } from "../../utils/types";

const GamesTable: React.FC<ITableGames> = ({
  games,
  onEdit,
  onDelete,
  onToggle,
  showCompanies,
}) => {
  const formatNumberOfPlayers = (game: IGame) => {
    if (game.minPlayers === game.maxPlayers) {
      return `${game.minPlayers} requis`;
    } else {
      return `${game.minPlayers}-${game.maxPlayers} joueurs`;
    }
  };

  return (
    <table className="uk-table uk-table-divider uk-table-small -noselect">
      <thead>
        <tr>
          <th className="uk-table-expand">Jeu</th>
          <th>Durée</th>
          <th>Joueurs</th>
          <th>Age</th>
          <th>Genre</th>
          <th>Prototype</th>
          {showCompanies && <th>Éditeur</th>}
          {(onEdit || onDelete) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {games.map((game: IGame, index: number) => {
          return (
            <tr key={index}>
              <td className="uk-text-bold">{game.name}</td>
              <td>{game.duration}</td>
              <td>{formatNumberOfPlayers(game)}</td>
              <td>{`${game.minAge}-${game.maxAge} ans`}</td>
              <td>{game.type}</td>
              <td>
                <input
                  className="uk-checkbox"
                  type="checkbox"
                  checked={game.isPrototype}
                  onChange={() => onToggle && onToggle(game)}
                  disabled={true}
                />
              </td>
              {showCompanies && game.publisher && (
                <td>
                  <Link to={"/app/societes/" + game.publisherId}>
                    {game.publisher.name}
                  </Link>
                </td>
              )}
              <td>
                {(onEdit || onDelete) && game.guideLink && (
                  <a href={game.guideLink!} target="_blank" rel="noreferrer">
                    <span
                      className="uk-icon-link -pointer uk-margin-small-right"
                      uk-icon="icon: link"
                    />
                  </a>
                )}
                {onEdit && (
                  <span
                    className="uk-icon-link uk-margin-small-right -pointer"
                    uk-icon="file-edit"
                    onClick={() => onEdit(game)}
                  />
                )}
                {onDelete && (
                  <span
                    className="uk-icon-link -pointer"
                    uk-icon="trash"
                    onClick={() => onDelete(game)}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GamesTable;
