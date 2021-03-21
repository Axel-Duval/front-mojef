import React from "react";
import FestivalForm from "./FestivalForm";
import Modal from "../Modal";
import { IFestival } from "../../utils/types";

interface INewFestivalModal {
  show: boolean;
  onClose: Function;
  onSuccess?: (festival: IFestival) => void;
}

const NewFestivalModal = ({ show, onClose, onSuccess }: INewFestivalModal) => {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="uk-modal-title uk-margin-bottom -noselect">
        Nouveau festival
      </h2>
      <FestivalForm onSuccess={onSuccess} />
    </Modal>
  );
};

export default NewFestivalModal;
