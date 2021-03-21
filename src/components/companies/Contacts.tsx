import React, { useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IContact } from "../../utils/types";
import Heading from "../Heading";
import TableContacts from "../Tables/Contacts";

interface ICompanyContacts {
  contacts: IContact[];
}

const Contacts = ({ contacts }: ICompanyContacts) => {
  const [cts, setContacts] = useState(contacts);
  const instance = useAxios();

  const toggleContactPrimary = (contact: IContact) => {
    instance
      .patch(`/api/contact/${contact.id!}`, { isPrimary: !contact.isPrimary })
      .then(() => {
        setContacts(
          cts.map((c) => {
            return c !== contact
              ? c
              : { ...contact, isPrimary: !contact.isPrimary };
          })
        );
      })
      .catch(() => {
        UIkit.notification({
          message: "Impossible de changer l'état de ce contact",
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
          onClick={() => console.log("add contact")}
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
      <div className="-company-contacts">
        <div className="-company-contact-container">
          <TableContacts
            contacts={cts}
            onEdit={() => console.log("delete")}
            onDelete={() => console.log("delete")}
            onToggle={toggleContactPrimary}
          />
        </div>
      </div>
    </>
  );
};

export default Contacts;
