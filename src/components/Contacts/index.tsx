import React, { useState } from "react";
import Heading from "../Heading";
import "./style.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([
    { name: "Axel Duval", body: "05.65.45.67.89", active: true },
  ]);

  return (
    <div className="uk-margin-medium-left -flex-1">
      <div className="uk-flex uk-flex-column -fullheight">
        <Heading
          title="Contacts"
          subtitle="Dernière mis à jour il y a 10 jours"
        >
          <span className="uk-icon-link uk-margin-small-right" uk-icon="plus" />
          <span
            className="uk-icon-link"
            uk-icon="info"
            uk-tooltip="Vous pouvez activer, modifier ou supprimer des contacts"
          />
        </Heading>
        <div className="-contacts">
          <div className="-contact-container">
            <table className="uk-table uk-table-justify uk-table-divider uk-table-small uk-table-hover">
              <thead>
                <tr>
                  <th className="uk-table-shrink">Actif</th>
                  <th className="uk-text-nowrap">Nom</th>
                  <th className="uk-table-expand">Contact</th>
                  <th className="uk-table-expand">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="uk-text-center">
                        <input
                          className="uk-checkbox"
                          type="checkbox"
                          checked={contact.active}
                        />
                      </td>
                      <td>{contact.name}</td>
                      <td>{contact.body}</td>
                      <td>
                        <span
                          className="uk-icon-link uk-margin-small-right uk-margin-small-left"
                          uk-icon="file-edit"
                        />
                        <span className="uk-icon-link" uk-icon="trash" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
