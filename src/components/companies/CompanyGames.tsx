import { FC, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IGame } from "../../utils/types";
import GameModalForm from "../games/GameModalForm";
import Heading from "../Heading";
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
    instance
      .post("/api/game", game)
      .then((res) =>
        setGames((games) => {
          return [...games, res.data];
        })
      )
      .catch((err) => {
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
          return {
            ...g,
            isPrototype: !g.isPrototype,
          };
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
              return game;
            }
            return g;
          });
        });
      });
  };

  return (
    <>
      <Heading title="Jeux" subtitle={games.length + " jeux trouvés"}>
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
          onClick={switchAddModalState}
        />
        <GameModalForm
          setShowModal={switchAddModalState}
          showModal={addModalState}
          addGame={addGame}
          companyId={companyId}
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
      <GamesTable
        games={games}
        onEdit={editGame}
        onDelete={deleteGame}
        onToggle={switchGameIsPrototype}
      />
    </>
  );
};

export default CompanyGames;
