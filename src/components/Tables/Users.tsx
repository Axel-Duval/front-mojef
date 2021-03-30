import React from "react";
import { IUser } from "../../utils/types";

interface ITableUsers {
  users: IUser[];
  onEdit?: Function;
  onDelete?: Function;
}
const Users = ({ users, onEdit, onDelete }: ITableUsers) => {
  return (
    <>
      <p className="uk-text-meta">Total : {users.length}</p>
      <table className="uk-table uk-table-divider uk-table-small -noselect">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser, index: number) => {
            return (
              <tr key={index}>
                <td>{user.username}</td>
                {user.isAdmin ? (
                  <td>
                    <label className="uk-label uk-margin-remove-bottom">
                      admin
                    </label>
                  </td>
                ) : (
                  <td>
                    <label className="uk-label uk-label-warning uk-margin-remove-bottom">
                      organisateur
                    </label>
                  </td>
                )}

                <td>
                  {onEdit && (
                    <span
                      className="uk-icon-link uk-margin-small-left -pointer"
                      uk-icon="file-edit"
                      onClick={() => onEdit(user)}
                    />
                  )}
                  {onDelete && (
                    <span
                      className="uk-icon-link uk-margin-small-left -pointer"
                      uk-icon="trash"
                      onClick={() => onDelete(user)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
