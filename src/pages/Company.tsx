import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Infos from "../components/companies/Infos";
import { useAxios } from "../hooks/useAxios";
import { ICompany } from "../utils/types";
import UIkit from "uikit";
import { useGet } from "../hooks/useGet";
import CompanyGames from "../components/companies/CompanyGames";
import CompanyContacts from "../components/companies/CompanyContacts";

const CompanyPage = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [company, setCompany] = useState<ICompany | null>(null);
  const [data, isLoading, isErrored] = useGet<ICompany>(`/api/company/${id}`);
  const [loading, setLoading] = useState<boolean>(true);
  const instance = useAxios();

  useEffect(() => {
    if (data) {
      setCompany(data);
      setLoading(false);
    }
  }, [data]);

  const handleDelete = () => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer cette société ?")
      .then(() => {
        instance
          .delete(`/api/company/${company!.id}`)
          .then(() => history.goBack())
          .catch(() =>
            UIkit.notification({
              message: "Impossible de supprimer cette société",
              status: "danger",
              pos: "top-center",
            })
          );
      });
  };

  return (
    <div>
      {loading ? (
        "loading ..."
      ) : (
        <div className="uk-flex uk-flex-column -fullheight">
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h1 className="uk-heading-bullet">{company && company.name}</h1>
            <div>
              <span
                className="uk-icon-link uk-margin-small-right"
                uk-icon="reply"
                onClick={history.goBack}
              />
              <span
                className="uk-icon-link uk-margin-small-right"
                uk-icon="trash"
                onClick={handleDelete}
              />
            </div>
          </div>
          <hr className="uk-margin-medium-bottom" />
          <div className="uk-flex -fullheight -company-responsive">
            <div className="-flex-1">
              <div className="uk-flex uk-flex-column -fullheight">
                <Infos company={company!} />
                <CompanyContacts
                  companyContacts={company!.contacts}
                  companyId={company!.id!}
                />
              </div>
            </div>
            <hr className="uk-divider-vertical -fullheight uk-margin-medium-left uk-margin-medium-right" />
            <div className="-flex-1">
              <div className="uk-flex uk-flex-column -fullheight">
                <CompanyGames
                  companyGames={company!.games}
                  companyId={company!.id!}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
