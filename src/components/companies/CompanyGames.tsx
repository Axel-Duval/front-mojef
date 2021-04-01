import { FC, useEffect, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IGame } from "../../utils/types";
import GameForm from "../games/GameForm";
import Heading from "../Heading";
import GamesTable from "../Tables/Games";
import Modal from "../Modal";

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

  const onModalSuccess = (game: IGame, editMode: boolean) => {
    if (editMode) {
      setGames((games) =>
        games.map((g) => {
          if (g.id === game.id) {
            return game;
          }
          return g;
        })
      );
    } else {
      setGames((games) => {
        return [...games, game];
      });
    }
    setModalState(false);
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
      .confirm("Êtes vous sûr de vouloir supprimer ce jeu ?")
      .then(() => deleteGame(game))
      .catch(() => {});
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
      .catch(() => {
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
      {modalState && (
        <Modal
          onClose={() => setModalState(false)}
          title={gameToEdit ? `Modifier ${gameToEdit.name}` : "Ajouter un jeu"}
        >
          <GameForm
            onSuccess={onModalSuccess}
            companyId={companyId}
            game={gameToEdit}
          />
        </Modal>
      )}
      <Heading title="Jeux" subtitle={games.length + " jeux trouvés"}>
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
          onClick={() => setModalState(true)}
        />
        <span
          className="uk-icon-link -pointer uk-margin-small-right"
          uk-icon="info"
          uk-tooltip="Vous pouvez ajouter, modifier ou supprimer des jeux"
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
        showCompanies={false}
      />
    </>
  );
};

export default CompanyGames;
