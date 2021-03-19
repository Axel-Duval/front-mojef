import React, { useState } from "react";
import UIkit from "uikit";
import { IContact } from "../../utils/types";
import Heading from "../Heading";
import ContactsTable from "../Tables/Contacts";

const Contacts = () => {
  //Fakes contacts !
  const [contacts, setContacts] = useState<IContact[]>([
    {
      id: "fakeid",
      firstname: "Axel",
      lastname: "Duval",
      email: "axel.duval@gmail.com",
      phone: "05.65.45.67.89",
      companyId: "companyId",
      isPrimary: true,
    },
    {
      id: "fakeid",
      firstname: "Lilian",
      lastname: "Misser",
      email: "axel.duval@gmail.com",
      phone: "07.67.11.40.53",
      companyId: "companyId",
      isPrimary: false,
    },
  ]);

  const handleAdd = () => {
    console.log("Let's add a contact");
  };
  const handleDelete = (contact: IContact) => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer ce contact ?")
      .then(() => {
        setContacts(contacts.filter((item) => item !== contact));
      });
  };
  const handleEdit = (contact: IContact) => {
    console.log("edit: " + contact);
  };
  const handleToggle = (contact: IContact) => {
    console.log("toggled: " + contact);
  };

  return (
    <div className="-flex-1">
      <div className="uk-flex uk-flex-column -fullheight">
        <Heading
          title="Contacts"
          subtitle="Dernière mis à jour il y a 10 jours"
        >
          <span
            className="uk-icon-link uk-margin-small-right"
            uk-icon="plus"
            onClick={handleAdd}
          />
          <span
            className="uk-icon-link"
            uk-icon="info"
            uk-tooltip="Vous pouvez ajouter, modifier ou supprimer des contacts"
          />
        </Heading>
        <div className="-booking-contacts">
          <div className="-booking-contact-container">
            <ContactsTable
              contacts={contacts}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
