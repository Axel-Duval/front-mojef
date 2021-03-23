import { FC, useEffect, useState } from "react";
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
  const [modalState, setModalState] = useState<boolean>(false);
  const [gameToEdit, setGameToEdit] = useState<IGame | null>(null);
  const instance = useAxios();

  useEffect(() => {
    if (!modalState) {
      setGameToEdit(null);
    }
  }, [modalState]);

  const addGame = (game: IGame): void => {
    instance
      .post("/api/game", game)
      .then((res) =>
        setGames((games) => {
          return [...games, res.data];
        })
      )
      .catch(() => {
        UIkit.notification({
          message: `Impossible d'ajouter ce jeu`,
          status: "danger",
          pos: "top-center",
        });
      });
    setModalState(false);
  };

  const editGame = (game: IGame) => {
    instance
      .patch(`api/game/${game.id}`, game)
      .then(() =>
        setGames((games) =>
          games.map((g: IGame) => {
            if (g.id === game.id) {
              return game;
            }
            return g;
          })
        )
      )
      .catch(() => {
        UIkit.notification({
          message: `Impossible d'éditeur le jeu ${game.name}`,
          status: "danger",
          pos: "top-center",
        });
      });
    setModalState(false);
  };

  const onModalSubmit = (game: IGame, editMode: boolean) => {
    if (editMode) {
      editGame(game);
    } else {
      addGame(game);
    }
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

  const handleEdit = (game: IGame) => {
    setGameToEdit(game);
    setModalState(true);
  };

  const handleDelete = (game: IGame) => {
    UIkit.modal
      .confirm(`Êtes vous sûr de vouloir supprimer le jeu ${game.name}?`)
      .then(() => deleteGame(game));
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
      <GameModalForm
        setShowModal={setModalState}
        showModal={modalState}
        onSubmit={onModalSubmit}
        companyId={companyId}
        game={gameToEdit}
      />
      <Heading title="Jeux" subtitle={games.length + " jeux trouvés"}>
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
          onClick={() => setModalState(true)}
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
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={switchGameIsPrototype}
      />
    </>
  );
};

export default CompanyGames;
