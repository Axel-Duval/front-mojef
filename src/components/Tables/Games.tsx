import { ITableGames, IGame } from "../../utils/types";

const GamesTable: React.FC<ITableGames> = ({
  games,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const formatNumberOfPlayers = (game: IGame) => {
    if (game.minPlayers === game.maxPlayers) {
      return `${game.minPlayers} requis`;
    } else {
      return `De ${game.minPlayers} à ${game.maxPlayers} joueurs.`;
    }
  };

  return (
    <table className="uk-table uk-table-justify uk-table-divider uk-table-small -noselect">
      <thead>
        <tr>
          <th>Jeu</th>
          <th>Durée</th>
          <th>Nombre de joueurs</th>
          <th>Age</th>
          <th>Genre</th>
          <th>Prototype?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game: IGame, index: number) => {
          return (
            <tr key={index}>
              <td>{game.name}</td>
              <td>{game.duration}</td>
              <td>{formatNumberOfPlayers(game)}</td>
              <td>{`De ${game.minAge} à ${game.maxAge} ans`}</td>
              <td>{game.gameType!.label}</td>
              <td className="uk-text-center">
                <input
                  className="uk-checkbox"
                  type="checkbox"
                  checked={game.isPrototype}
                  onChange={() => onToggle(game)}
                />
              </td>
              <td>
                {game.manualLink && (
                  <a onClick={() => window.open(game.manualLink!)}>
                    <span
                      className="uk-margin-small-right"
                      uk-icon="icon: location"
                    />
                  </a>
                )}
                <span
                  className="uk-icon-link uk-margin-small-right uk-margin-small-left"
                  uk-icon="file-edit"
                  onClick={() => onEdit(game)}
                />
                <span
                  className="uk-icon-link"
                  uk-icon="trash"
                  onClick={() => onDelete(game)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GamesTable;
