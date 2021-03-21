import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import { ICompany } from "../../utils/types";
import DeleteValidationModal from "./DeleteValidationModal";
import { useGet } from "../../hooks/useGet";
import CompanyContacts from "./CompanyContacts";
import CompanyGames from "./CompanyGames";

const CompanyDetails = (props: { id: string }) => {
  const [company, setCompany] = useState<ICompany | null>(null);
  const [data, isLoading, isErrored] = useGet<ICompany>(
    `/api/company/${props.id}`
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [deletionModalState, setDeletionModalState] = useState<boolean>(false);

  const instance = useAxios();

  useEffect(() => {
    if (data) {
      setCompany(data);
      setLoading(false);
    }
  }, [data]);

  const deleteCompany = () => {
    instance
      .delete(`/api/company/${company!.id}`)
      .then(() => setRedirect(true))
      .catch((err) => console.error(err));
  };

  const switchDeletionModalState = (): void => {
    setDeletionModalState(!deletionModalState);
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
            <p>{company!.name}</p>
            <p>{company!.isActive ? "Actif" : "Inactif"}</p>
            <p>{company!.isPublisher ? "Editeur" : "Non Editeur"}</p>
            <p>{company!.isExhibitor ? "Exposant" : "Non Exposant"}</p>
            <button
              className="uk-button uk-button-danger"
              onClick={switchDeletionModalState}
            >
              Supprimer la société
            </button>
            <DeleteValidationModal
              deleteCompany={deleteCompany}
              showModal={deletionModalState}
              setShowModal={switchDeletionModalState}
              company={company!}
            />
            <button className="uk-button uk-button-default">
              Modifier la société
            </button>
            <div>
              <CompanyContacts
                companyContacts={company!.contacts}
                companyId={company!.id!}
              />
              <div>
                {company!.isPublisher && (
                  <CompanyGames
                    companyGames={company!.games}
                    companyId={company!.id!}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default CompanyDetails;
