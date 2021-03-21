import { FC, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IContact } from "../../utils/types";
import Heading from "../Heading";
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
    instance
      .post("/api/contact", contact)
      .then((res) =>
        setContacts((contacts) => {
          return [...contacts, res.data];
        })
      )
      .catch((err) => {
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

  return (
    <>
      <Heading
        title="Contacts"
        subtitle={contacts.length + " contacts trouvés"}
      >
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
          onClick={switchAddModalState}
        />
        <ContactModalForm
          showModal={addModalState}
          setShowModal={switchAddModalState}
          addContact={addContact}
          companyId={companyId}
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
            onEdit={editContact}
            onDelete={deleteContact}
            onToggle={switchContactIsPrimary}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyContacts;