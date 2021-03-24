import { FC } from "react";
import { IGame } from "../../utils/types";
import Modal from "../Modal";
import GameForm from "./GameForm";

const GameModal: FC<{
  setShowModal: (state: boolean) => void;
  onSubmit: (game: IGame, editMode: boolean) => void;
  game: IGame | null;
  companyId: string;
}> = ({ setShowModal, onSubmit, game, companyId }) => {
  return (
    <Modal onClose={() => setShowModal(false)}>
      <h2 className="uk-modal-title uk-margin-bottom uk-margin-left -noselect">
        {game ? `Modifier ${game!.name}` : "Ajouter un jeu"}
      </h2>
      <GameForm onSubmit={onSubmit} game={game} companyId={companyId} />
    </Modal>
  );
};

export default GameModal;
