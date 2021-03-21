import React from "react";
import FestivalForm from "./FestivalForm";
import Modal from "../Modal";

interface INewFestivalModal {
  show: boolean;
  onClose: Function;
}

const NewFestivalModal = ({ show, onClose }: INewFestivalModal) => {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="uk-modal-title uk-margin-bottom -noselect">
        Nouveau festival
      </h2>
      <FestivalForm />
    </Modal>
  );
};

export default NewFestivalModal;
