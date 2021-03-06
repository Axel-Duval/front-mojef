import React from "react";
import { IContact, ITableContacts } from "../../utils/types";
const ContactsTable: React.FC<ITableContacts> = ({
  contacts,
  onEdit,
  onDelete,
  onToggle,
}) => {
  return (
    <table className="uk-table uk-table-divider uk-table-small -noselect">
      <thead>
        <tr>
          {onToggle && <th className="uk-table-shrink">Primaire</th>}
          <th className="uk-text-nowrap">Nom</th>
          <th className="uk-table-expand">Tel</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact: IContact, index: number) => {
          return (
            <tr key={index}>
              {onToggle && (
                <td className="uk-text-center">
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    checked={contact.isPrimary}
                    onChange={() => onToggle(contact)}
                  />
                </td>
              )}
              <td>{contact.firstname + " " + contact.lastname}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>
                {onEdit && (
                  <span
                    className="uk-icon-link uk-margin-small-left -pointer"
                    uk-icon="file-edit"
                    onClick={() => onEdit(contact)}
                  />
                )}
                {onDelete && (
                  <span
                    className="uk-icon-link uk-margin-small-left -pointer"
                    uk-icon="trash"
                    onClick={() => onDelete(contact)}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ContactsTable;
