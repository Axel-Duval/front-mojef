import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ICompany } from "../../utils/types";

const DeleteValidationModal = (props: {
  deleteCompany: (company: ICompany) => void;
  showModal: boolean;
  setShowModal: () => void;
  company: ICompany;
}) => {
  const onSubmit = (): void => {
    props.deleteCompany(props.company);
    props.setShowModal();
  };

  return (
    <Modal isOpen={props.showModal} toggle={props.setShowModal}>
      <ModalHeader toggle={props.setShowModal}>Delete company</ModalHeader>
      <ModalBody>
        <p>Etes vous sur de vouloir supprimer {props.company.name} ?</p>
      </ModalBody>
      <ModalFooter>
        <button className="uk-button uk-button-primary" onClick={onSubmit}>
          Valider
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteValidationModal;
