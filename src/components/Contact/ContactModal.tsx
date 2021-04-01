import { IContact } from "../../utils/types";
import Modal from "../Modal";
import ContactForm from "./ContactForm";

interface IContactModal {
  onClose: Function;
  handleSuccess: (contact: IContact, editMode: boolean) => void;
  contact: IContact | null;
  companyId: string;
}

const ContactModal = ({
  onClose,
  handleSuccess,
  contact,
  companyId,
}: IContactModal) => {
  return (
    <Modal
      onClose={onClose}
      title={contact ? "Modifier contact" : "Créer contact"}
    >
      <ContactForm
        onSuccess={handleSuccess}
        contact={contact}
        companyId={companyId}
      />
    </Modal>
  );
};

export default ContactModal;
