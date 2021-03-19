import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import { ICompany, IContact } from "../../utils/types";
import ContactsTable from "../Tables/Contacts";
import ContactModalForm from "../ContactModalForm";
import { usePost } from "../../hooks/usePost";

const CompanyDetails = (props: { id: string }) => {
  const [company, setCompany] = useState<ICompany>({
    name: "",
    address: "",
    isPublisher: true,
    isExhibitor: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);

  const instance = useAxios();

  useEffect(() => {
    instance
      .get(`/api/company/${props.id}`)
      .then((res) => {
        setCompany(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setRedirect(true);
      });
  }, [instance, props.id]);

  const addContact = (contact: IContact) => {
    setLoading(true);
    instance
      .post("/api/contact", contact)
      .then((res) => {
        let newCompany = company;
        newCompany.contacts = [...newCompany.contacts!, res.data];
        setCompany(newCompany);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const switchModalState = () => {
    setAddModal(!addModal);
  };

  const deleteContact = (contact: IContact) => {
    setLoading(true);
    instance
      .delete(`/api/contact/${contact.id}`)
      .then((res) => {
        let newCompany: ICompany = company;
        let removeIndex = newCompany.contacts!.indexOf(contact);
        newCompany.contacts!.splice(removeIndex, 1);
        setCompany(newCompany);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const editContact = (contact: IContact) => {
    console.log("edit: " + contact);
  };

  const toggleContact = (contact: IContact) => {
    setLoading(true);
    instance
      .patch(`/api/contact/${contact.id!}`, { isPrimary: !contact.isPrimary })
      .then((res) => {
        let newCompany = company;
        newCompany.contacts!.forEach((element) => {
          if (element.id! === contact.id) {
            element.isPrimary = !element.isPrimary;
          }
        });
        setCompany(newCompany);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  if (redirect) {
    return <Redirect to="/companies" />;
  } else {
    return (
      <div>
        {loading ? (
          "loading ..."
        ) : (
          <div>
            <h1>Company details</h1>
            <div>
              <h3>Contacts</h3>
              <button
                className="uk-button uk-button-primary"
                onClick={switchModalState}
              >
                Ajout de contact
              </button>
              <ContactModalForm
                showModal={addModal}
                setShowModal={switchModalState}
                addContact={addContact}
                companyId={company.id!}
              />
              <ContactsTable
                contacts={company.contacts!}
                onEdit={editContact}
                onDelete={deleteContact}
                onToggle={toggleContact}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default CompanyDetails;
