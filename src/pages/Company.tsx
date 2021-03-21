import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Infos from "../components/companies/Infos";
import Contacts from "../components/companies/Contacts";
import { useAxios } from "../hooks/useAxios";
import { ICompany } from "../utils/types";
import Games from "../components/companies/Games";
import UIkit from "uikit";
import CompanyDetails from "../components/companies/CompanyDetails";

const CompanyPage = () => {
  const [company, setCompany] = useState<ICompany>({
    id: "",
    name: "",
    address: "",
    isPublisher: true,
    isExhibitor: true,
    isActive: true,
    contacts: [],
    games: [],
  });

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const instance = useAxios();

  useEffect(() => {
    instance
      .get(`/api/company/${id}`)
      .then((res) => {
        console.log(res);
        setCompany(res.data);
      })
      .catch(() => history.goBack());
  }, [instance, id, history]);

  const handleDelete = () => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer cette société ?")
      .then(() => {
        instance
          .delete(`/api/company/${company.id}`)
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
            uk-icon="file-edit"
            onClick={() => console.log("edit company")}
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
            <Infos company={company} />
            <Contacts contacts={company.contacts} />
          </div>
        </div>
        <hr className="uk-divider-vertical -fullheight uk-margin-medium-left uk-margin-medium-right" />
        <div className="-flex-1">
          <div className="uk-flex uk-flex-column -fullheight">
            <Games games={company.games} />
          </div>
        </div>
      </div>
      {/* <CompanyDetails id={id} /> */}
    </div>
  );
};

export default CompanyPage;
