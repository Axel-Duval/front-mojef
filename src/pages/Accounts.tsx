import React, { useEffect, useState } from "react";
import UIkit from "uikit";
import Loading from "../components/Loading";
import Users from "../components/Tables/Users";
import AddUserModal from "../components/users/AddUserModal";
import { useAxios } from "../hooks/useAxios";
import { useGet } from "../hooks/useGet";
import { IUser } from "../utils/types";

const Accounts = () => {
  const instance = useAxios();
  const [users, setUsers] = useState<IUser[]>(new Array());
  const [editUser, setEditUser] = useState<IUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const [_users, loading] = useGet<IUser[]>(`/api/user`);

  useEffect(() => {
    _users && setUsers(_users);
  }, [_users]);

  const handleEdit = (user: IUser) => {
    setEditUser(user);
    setShowUserModal(true);
  };
  const handleDelete = (user: IUser) => {
    setUsers(users.filter((u) => u.id !== user.id));
    instance.delete(`/api/user/${user.id}`).catch(() => {
      setUsers([...users, user]);
      UIkit.notification({
        message: `Impossible de supprimer l'utilisateur`,
        status: "danger",
        pos: "top-center",
      });
    });
  };
  const handleSuccess = (user: IUser, editMode: boolean) => {
    setEditUser(null);
    setUsers([...users, user]);
    if (editMode) {
      setUsers(() =>
        users.map((u) => {
          if (u.id === user.id) {
            return user;
          }
          return u;
        })
      );
    } else {
      setUsers([...users, user]);
    }
    setShowUserModal(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="uk-flex uk-flex-column -fullheight -noselect">
          {showUserModal && (
            <AddUserModal
              onClose={() => {
                setShowUserModal(false);
                setEditUser(null);
              }}
              onSuccess={handleSuccess}
              user={editUser}
            />
          )}
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h1 className="uk-heading-bullet">Tous les comptes</h1>
            <div>
              <span
                className="uk-icon-link uk-margin-small-right -pointer"
                uk-icon="plus"
                onClick={() => setShowUserModal(true)}
              />
              <span
                className="uk-icon-link -pointer"
                uk-icon="cloud-upload"
                uk-tooltip="auto-sync"
              />
            </div>
          </div>
          <hr />
          <Users users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </>
  );
};

export default Accounts;
