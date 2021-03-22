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
  const [addModal, setAddModal] = useState<boolean>(false);
  const [contacts, setContacts] = useState<IContact[]>(companyContacts);
  const instance = useAxios();

  const onAddSuccess = (contact: IContact) => {
    setContacts((contacts) => {
      return [...contacts, contact];
    });
    setAddModal(false);
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
      .confirm(
        `Êtes vous sûr de vouloir supprimer le contact ${contact.firstname} ${contact.lastname}?`
      )
      .then(() => deleteContact(contact));
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
      <ContactModalForm
        showModal={addModal}
        setShowModal={setAddModal}
        onSuccess={onAddSuccess}
        companyId={companyId}
      />
      <Heading
        title="Contacts"
        subtitle={contacts.length + " contacts trouvés"}
      >
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
          onClick={() => setAddModal(true)}
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
            onDelete={handleDelete}
            onToggle={switchContactIsPrimary}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyContacts;
