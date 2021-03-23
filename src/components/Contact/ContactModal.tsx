import React from "react";
import { IContact } from "../../utils/types";
import Modal from "../Modal";
import ContactForm from "./ContactForm";

interface IContactModal {
  onClose: Function;
  handleSuccess: Function;
  contact?: IContact;
  companyId: string;
}

const ContactModal = ({
  onClose,
  handleSuccess,
  contact,
  companyId,
}: IContactModal) => {
  return (
    <Modal onClose={onClose}>
      <h2 className="uk-modal-title uk-margin-bottom uk-margin-left -noselect">
        Contact
      </h2>
      <ContactForm
        handleSuccess={handleSuccess}
        contact={contact}
        companyId={companyId}
      />
    </Modal>
  );
};

export default ContactModal;
