import { useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IContact } from "../../utils/types";
import Heading from "../Heading";
import ContactsTable from "../Tables/Contacts";
import ContactModal from "../Contact/ContactModal";

interface IBookingContacts {
  contacts: IContact[];
  companyId: string;
}

const Contacts = ({ contacts, companyId }: IBookingContacts) => {
  const [reactiveContact, setContacts] = useState(contacts);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editContact, setEditContact] = useState<IContact | null>(null);
  const instance = useAxios();

  const handleDelete = (contact: IContact) => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer ce contact ?")
      .then(() => {
        instance
          .delete(`/api/contact/${contact.id}`)
          .then(() => {
            setContacts(reactiveContact.filter((item) => item !== contact));
          })
          .catch(() => {
            UIkit.notification({
              message: `Impossible de supprimer le contact`,
              status: "danger",
              pos: "top-center",
            });
          });
      });
  };

  const handleToggle = (contact: IContact) => {
    //Toggle isPrimary
    setContacts(
      reactiveContact.map((c) => {
        if (c.id === contact.id) {
          return {
            ...c,
            isPrimary: !contact.isPrimary,
          };
        }
        return c;
      })
    );
    //Perform action (API)
    instance
      .patch(`/api/contact/${contact.id!}`, { isPrimary: !contact.isPrimary })
      .catch(() => {
        //Error => re-toggle isPrimary
        setContacts(
          reactiveContact.map((c) => {
            if (c.id === contact.id) {
              return contact;
            }
            return c;
          })
        );
        UIkit.notification({
          message: `Impossible de changer le statut du contact`,
          status: "danger",
          pos: "top-center",
        });
      });
  };

  const handleSuccess = (contact: IContact, isEdit: boolean) => {
    setShowContactModal(false);
    if (isEdit) {
      //Edit mode
      setEditContact(null);
      setContacts(
        reactiveContact.map((c) => {
          if (c.id !== contact.id) {
            return c;
          } else {
            return contact;
          }
        })
      );
    } else {
      //Add mode
      setContacts([contact, ...reactiveContact]);
    }
  };

  const handleEdit = (contact: IContact) => {
    setEditContact(contact);
    setShowContactModal(true);
  };

  return (
    <>
      {showContactModal && (
        <ContactModal
          onClose={() => {
            setShowContactModal(false);
            !!editContact && setEditContact(null);
          }}
          handleSuccess={handleSuccess}
          companyId={companyId}
          contact={editContact || undefined}
        />
      )}
      <div className="-flex-1">
        <div className="uk-flex uk-flex-column -fullheight">
          <Heading
            title="Contacts"
            subtitle={"Contacts trouvés: " + reactiveContact.length}
          >
            <span
              className="uk-icon-link uk-margin-small-right -pointer"
              uk-icon="plus"
              onClick={() => setShowContactModal(true)}
            />
            <span
              className="uk-icon-link uk-margin-small-right -pointer"
              uk-icon="info"
              uk-tooltip="Vous pouvez ajouter, modifier ou supprimer des contacts"
            />
            <span
              className="uk-icon-link -pointer"
              uk-icon="cloud-upload"
              uk-tooltip="auto-sync"
            />
          </Heading>
          <div className="-booking-contacts">
            <div className="-booking-contact-container">
              <ContactsTable
                contacts={reactiveContact}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onToggle={handleToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
