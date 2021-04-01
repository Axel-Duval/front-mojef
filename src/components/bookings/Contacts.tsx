import { useEffect, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IBookingSummarize, ICompany, IContact } from "../../utils/types";
import Heading from "../Heading";
import ContactsTable from "../Tables/Contacts";
import ContactModal from "../Contact/ContactModal";
import { useGet } from "../../hooks/useGet";

interface IBookingContacts {
  booking: IBookingSummarize;
}

const Contacts = ({ booking }: IBookingContacts) => {
  const [company] = useGet<ICompany>(`api/company/${booking.company.id}`);
  const [contacts, setContacts] = useState<IContact[]>(new Array());
  const [showContactModal, setShowContactModal] = useState(false);
  const [editContact, setEditContact] = useState<IContact | null>(null);
  const instance = useAxios();

  useEffect(() => {
    company && setContacts(company.contacts);
  }, [company]);

  const handleDelete = (contact: IContact) => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer ce contact ?")
      .then(() => {
        instance
          .delete(`/api/contact/${contact.id}`)
          .then(() => {
            setContacts(contacts.filter((item) => item !== contact));
          })
          .catch(() => {
            UIkit.notification({
              message: `Impossible de supprimer le contact`,
              status: "danger",
              pos: "top-center",
            });
          });
      })
      .catch(() => {});
  };

  const handleToggle = (contact: IContact) => {
    //Toggle isPrimary
    setContacts(
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
    //Perform action (API)
    instance
      .patch(`/api/contact/${contact.id!}`, { isPrimary: !contact.isPrimary })
      .catch(() => {
        //Error => re-toggle isPrimary
        setContacts(
          contacts.map((c) => {
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
        contacts.map((c) => {
          if (c.id !== contact.id) {
            return c;
          } else {
            return contact;
          }
        })
      );
    } else {
      //Add mode
      setContacts([contact, ...contacts]);
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
          companyId={booking.companyId}
          contact={editContact}
        />
      )}
      <div className="-flex-1">
        <div className="uk-flex uk-flex-column -fullheight">
          <Heading
            title="Contacts"
            subtitle={"Contacts trouvés: " + contacts.length}
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
                contacts={contacts}
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
