import React, { useEffect, useState } from "react";
import CompanyModalForm from "../components/companies/CompanyModalForm";
import CompaniesTable from "../components/Tables/Companies";
import { useAxios } from "../hooks/useAxios";
import { useGet } from "../hooks/useGet";
import { IPartialCompany } from "../utils/types";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<IPartialCompany[]>([]);
  const [data, isLoading, isErrored] = useGet<IPartialCompany[]>(
    "/api/company"
  );
  const [addModal, setAddModal] = useState<boolean>(false);
  const instance = useAxios();

  useEffect(() => {
    if (data) {
      setCompanies(data);
    }
  }, [data]);

  const switchModalState = () => {
    setAddModal(!addModal);
  };

  const addCompany = (company: IPartialCompany) => {
    instance
      .post("/api/company", company)
      .then((res) => {
        setCompanies([...companies, res.data]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">Sociétés</h1>
        <div>
          <span
            className="uk-icon-link uk-margin-small-right -pointer"
            uk-icon="plus"
            onClick={switchModalState}
            uk-tooltip="ajouter une nouvelle société"
          />
          <span
            className="uk-icon-link uk-margin-small-right -pointer"
            uk-icon="database"
            uk-tooltip="filter les sociétés"
            uk-toggle="target: #toggle-filter-companies"
          />
          <span
            className="uk-icon-link -pointer"
            uk-icon="cloud-upload"
            uk-tooltip="auto-sync"
          />
        </div>
      </div>
      <hr />
      <div id="toggle-filter-companies" hidden={true}>
        <div className="uk-flex uk-flex-center uk-flex-middle">
          <input
            type="text"
            placeholder="Aa"
            className="uk-input uk-width-medium "
          />
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input className="uk-checkbox" type="checkbox" /> Editeur
          </label>
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input className="uk-checkbox" type="checkbox" /> Exposant
          </label>
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input className="uk-checkbox" type="checkbox" /> Actif
          </label>
        </div>
        <hr />
      </div>
      <CompanyModalForm
        showModal={addModal}
        setShowModal={switchModalState}
        addCompany={addCompany}
        companies={companies}
      />
      <CompaniesTable companies={companies} />
    </div>
  );
};

export default CompaniesPage;
