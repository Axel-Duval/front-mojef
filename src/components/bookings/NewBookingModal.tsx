import React from "react";
import Modal from "../Modal";

interface INewBookingModal {
  show: boolean;
  onClose: Function;
}

const NewBookingModal = ({ show, onClose }: INewBookingModal) => {
  return (
    <Modal show={show} onClose={onClose}>
      <p>add booking</p>
    </Modal>
  );
};

export default NewBookingModal;
