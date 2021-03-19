import React from "react";
import { IContact, ITableContacts } from "../../types";
const Tablecontacts: React.FC<ITableContacts> = ({
  contacts,
  onEdit,
  onDelete,
  onToggle,
}) => {
  return (
    <table className="uk-table uk-table-justify uk-table-divider uk-table-small -noselect">
      <thead>
        <tr>
          <th className="uk-table-shrink">Primaire</th>
          <th className="uk-text-nowrap">Nom</th>
          <th className="uk-table-expand">Contact</th>
          <th className="uk-ta">Actions</th>
        </tr>
      </thead>
      <tbody className="-table-contacts-body">
        {contacts.map((contact: IContact, index: number) => {
          return (
            <tr key={index}>
              <td className="uk-text-center">
                <input
                  className="uk-checkbox"
                  type="checkbox"
                  checked={contact.isPrimary}
                  onChange={() => onToggle(contact)}
                />
              </td>
              <td>{contact.firstname + " " + contact.lastname}</td>
              <td>{contact.phone}</td>
              <td>
                <span
                  className="uk-icon-link uk-margin-small-right uk-margin-small-left"
                  uk-icon="file-edit"
                  onClick={() => onEdit(contact)}
                />
                <span
                  className="uk-icon-link"
                  uk-icon="trash"
                  onClick={() => onDelete(contact)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Tablecontacts;
