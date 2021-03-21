import { FC, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IGame } from "../../utils/types";
import GameModalForm from "../games/GameModalForm";
import GamesTable from "../Tables/Games";

const CompanyGames: FC<{ companyGames: IGame[]; companyId: string }> = ({
  companyGames,
  companyId,
}) => {
  const [games, setGames] = useState<IGame[]>(companyGames);
  const [addModalState, setAddModalState] = useState<boolean>(false);
  const instance = useAxios();
  const switchAddModalState = (): void => {
    setAddModalState(!addModalState);
  };

  const addGame = (game: IGame): void => {
    setGames((games) => {
      return [...games, game];
    });
    instance.post("/api/game", game).catch((err) => {
      setGames((games) => {
        return games.filter((g) => g.id !== game.id);
      });
      UIkit.notification({
        message: `Impossible d'ajouter ce jeu`,
        status: "danger",
        pos: "top-center",
      });
    });
  };

  const editGame = (game: IGame) => {
    console.log(`${game.name} wants to be edited.`);
  };

  const deleteGame = (game: IGame) => {
    setGames((games) => {
      return games.filter((g) => g.id !== game.id);
    });
    instance.delete(`/api/game/${game.id}`).catch((err) => {
      setGames((games) => {
        return [...games, game];
      });
      UIkit.notification({
        message: `Impossible de supprimer le jeu ${game.name}`,
        status: "danger",
        pos: "top-center",
      });
    });
  };

  const switchGameIsPrototype = (game: IGame) => {
    setGames((games) => {
      return games.map((g) => {
        if (g.id === game.id) {
          g.isPrototype = !g.isPrototype;
        }
        return g;
      });
    });
    instance
      .patch(`/api/game/${game.id}`, { isPrototype: !game.isPrototype })
      .catch((err) => {
        setGames((games) => {
          return games.map((g) => {
            if (g.id === game.id) {
              g.isPrototype = !g.isPrototype;
            }
            return g;
          });
        });
      });
  };

  return (
    <div>
      <h3>Jeux</h3>
      <button
        className="uk-button uk-button-primary"
        onClick={switchAddModalState}
      >
        <GameModalForm
          setShowModal={switchAddModalState}
          showModal={addModalState}
          addGame={addGame}
          companyId={companyId}
        />
        Ajout jeu
      </button>
      {games.length !== 0 ? (
        <GamesTable
          games={games}
          onEdit={editGame}
          onDelete={deleteGame}
          onToggle={switchGameIsPrototype}
        />
      ) : (
        <p>pas encore de jeux</p>
      )}
    </div>
  );
};

export default CompanyGames;
