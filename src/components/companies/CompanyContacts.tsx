import { FC, useEffect, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IContact } from "../../utils/types";
import ContactForm from "../Contact/ContactForm";
import Heading from "../Heading";
import Modal from "../Modal";
import ContactsTable from "../Tables/Contacts";

const CompanyContacts: FC<{
  companyContacts: IContact[];
  companyId: string;
}> = ({ companyContacts, companyId }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [contacts, setContacts] = useState<IContact[]>(companyContacts);
  const [contactToEdit, setContactToEdit] = useState<IContact | null>(null);
  const instance = useAxios();

  useEffect(() => {
    if (!modalState) {
      setContactToEdit(null);
    }
  }, [modalState]);

  const onAddSuccess = (contact: IContact) => {
    setContacts((contacts) => {
      return [...contacts, contact];
    });
    setModalState(false);
  };

  const deleteContact = (contact: IContact) => {
    setContacts((contacts) => {
      return contacts.filter((c) => c.id !== contact.id);
    });
    instance.delete(`/api/contact/${contact.id}`).catch((err) => {
      setContacts((contacts) => {
        return [...contacts, contact];
      });
      UIkit.notification({
        message: `Impossible de supprimer le contact ${contact.firstname} ${contact.lastname}`,
        status: "danger",
        pos: "top-center",
      });
    });
  };

  const handleDelete = (contact: IContact) => {
    UIkit.modal
      .confirm("Êtes vous sûr de vouloir supprimer ce contact")
      .then(() => deleteContact(contact))
      .catch(() => {});
  };

  const onEditSuccess = (contact: IContact) => {
    setContacts((contacts) =>
      contacts.map((c) => {
        if (c.id === contact.id) {
          return contact;
        }
        return c;
      })
    );
    setModalState(false);
  };

  const switchContactIsPrimary = (contact: IContact) => {
    setContacts((contacts) =>
      contacts.map((c) => {
        if (c.id === contact.id) {
          return {
            ...c,
            isPrimary: !contact.isPrimary,
          };
        }
        return c;
      })
    );
    instance
      .patch(`/api/contact/${contact.id!}`, { isPrimary: !contact.isPrimary })
      .catch(() => {
        setContacts((contacts) =>
          contacts.map((c) => {
            if (c.id === contact.id) {
              return contact;
            }
            return c;
          })
        );
        UIkit.notification({
          message: `Impossible de changer le statut du contact ${contact.firstname} ${contact.lastname}`,
          status: "danger",
          pos: "top-center",
        });
      });
  };

  const onModalSuccess = (contact: IContact, editMode: boolean): void => {
    if (editMode) {
      onEditSuccess(contact);
    } else {
      onAddSuccess(contact);
    }
  };

  const handleEdit = (contact: IContact) => {
    setContactToEdit(contact);
    setModalState(true);
  };

  return (
    <>
      {modalState && (
        <Modal
          onClose={() => setModalState(false)}
          title={
            contactToEdit
              ? `Modifier ${contactToEdit.firstname} ${contactToEdit.lastname}`
              : "Ajouter un contact"
          }
        >
          <ContactForm
            onSuccess={onModalSuccess}
            companyId={companyId}
            contact={contactToEdit}
          />
        </Modal>
      )}
      <Heading
        title="Contacts"
        subtitle={contacts.length + " contacts trouvés"}
      >
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
      <div>
        <div>
          <ContactsTable
            contacts={contacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={switchContactIsPrimary}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyContacts;
