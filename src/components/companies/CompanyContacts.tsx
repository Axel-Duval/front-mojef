import { FC, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { ICompany, IContact } from "../../utils/types";
import ContactsTable from "../Tables/Contacts";
import ContactModalForm from "./ContactModalForm";

const CompanyContacts: FC<{
  companyContacts: IContact[];
  companyId: string;
}> = ({ companyContacts, companyId }) => {
  const [addModalState, setAddModalState] = useState<boolean>(false);
  const [contacts, setContacts] = useState<IContact[]>(companyContacts);
  const instance = useAxios();
  const switchAddModalState = (): void => {
    setAddModalState(!addModalState);
  };

  const addContact = (contact: IContact) => {
    setContacts((contacts) => {
      return [...contacts, contact];
    });
    instance.post("/api/contact", contact).catch((err) => {
      setContacts((contacts) => {
        return contacts.filter((c) => c.id !== contact.id);
      });
      UIkit.notification({
        message: `Impossible d'ajouter ce contact : ${err}`,
        status: "danger",
        pos: "top-center",
      });
    });
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

  const editContact = (contact: IContact) => {
    console.log("edit: " + contact);
  };

  const switchContactIsPrimary = (contact: IContact) => {
    setContacts((contacts) => {
      return contacts.map((c) => {
        if (c.id === contact.id) {
          c.isPrimary = !c.isPrimary;
        }
        return c;
      });
    });
    instance
      .patch(`/api/contact/${contact.id!}`, { isPrimary: !contact.isPrimary })
      .catch((err) => {
        setContacts((contacts) => {
          return contacts.map((c) => {
            if (c.id === contact.id) {
              c.isPrimary = !c.isPrimary;
            }
            return c;
          });
        });
        UIkit.notification({
          message: `Impossible de changer le statut du contact ${contact.firstname} ${contact.lastname}`,
          status: "danger",
          pos: "top-center",
        });
      });
  };

  return (
    <div>
      <h3>Contacts</h3>
      <button
        className="uk-button uk-button-primary"
        onClick={switchAddModalState}
      >
        Ajout de contact
      </button>
      <ContactModalForm
        showModal={addModalState}
        setShowModal={switchAddModalState}
        addContact={addContact}
        companyId={companyId}
      />
      {contacts.length !== 0 ? (
        <ContactsTable
          contacts={contacts}
          onEdit={editContact}
          onDelete={deleteContact}
          onToggle={switchContactIsPrimary}
        />
      ) : (
        <p>pas encore de contacts</p>
      )}
    </div>
  );
};

export default CompanyContacts;
