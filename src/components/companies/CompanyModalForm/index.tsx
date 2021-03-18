import { useState } from "react";
import {
  Alert,
  Button,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Company } from "../companies.types";

const CompanyModalForm = (props: {
  showModal: boolean;
  setShowModal: () => void;
  addCompany: (company: Company) => void;
  companies: Company[];
}) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [publisher, setPublisher] = useState<boolean>(false);
  const [exhibitor, setExhibitor] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const submitForm = () => {
    if (name.length < 2) {
      setError("Le nom d'une société doit posséder au moins deux caractères.");
      setVisible(true);
    } else if (address.length < 2) {
      setError(
        "L'addresse d'une société doit posséder au moins deux caractères"
      );
      setVisible(true);
    } else if (nameAlreadyExists(name)) {
      setError("Ce nom existe déjà, veuillez en choisir un autre.");
      setVisible(true);
    } else {
      props.addCompany({
        name,
        address,
        isPublisher: publisher,
        isExhibitor: exhibitor,
      });
      props.setShowModal();
    }
  };

  const nameAlreadyExists = (name: string): boolean => {
    for (let i = 0; i < props.companies.length; i++) {
      if (props.companies[i].name === name) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <Modal isOpen={props.showModal} toggle={props.setShowModal}>
        <ModalHeader toggle={props.setShowModal}>
          Ajouter une société
        </ModalHeader>
        <ModalBody>
          <Alert
            color="danger"
            isOpen={visible}
            toggle={() => setVisible(!visible)}
            fade={false}
          >
            {error}
          </Alert>
          <Form>
            <FormGroup>
              <Label for="companyName">Nom de la société</Label>
              <Input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="entrer le nom"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="companyAddress">Adresse</Label>
              <Input
                type="text"
                name="companyAddress"
                id="companyAddress"
                placeholder="entrer l'adresse"
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                type="switch"
                id="isPublisher"
                name="isPublisher"
                label="Est-elle éditrice?"
                onChange={() => setExhibitor(!exhibitor)}
              />
              <CustomInput
                type="switch"
                id="isExhibitor"
                name="isExhibitor"
                label="Est-ce un exposant?"
                onChange={() => setPublisher(!publisher)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitForm}>
            Créer
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default CompanyModalForm;
