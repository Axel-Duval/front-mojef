import React, { useState } from "react";
import UIkit from "uikit";
import { IContact } from "../../types";
import Heading from "../Heading";
import Tablecontacts from "../Tables/Contacts";

const Contacts = () => {
  //Fakes contacts !
  const [contacts, setContacts] = useState([
    {
      firstname: "Axel",
      lastname: "Duval",
      phone: "05.65.45.67.89",
      company: "Zendesk",
      isPrimary: true,
    },
    {
      firstname: "Lilian",
      lastname: "Misser",
      phone: "07.67.11.40.53",
      company: "Polytech",
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
            <Tablecontacts
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
