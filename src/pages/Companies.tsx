import React from "react";
import CompaniesList from "../components/companies/CompaniesList";

const CompaniesPage = () => {
  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">Sociétés</h1>
        <div className="uk-flex uk-flex-middle">
          <span className="uk-icon-link" uk-icon="refresh" />
          <span className="uk-margin-small-left uk-text-meta">2min</span>
        </div>
      </div>
      <CompaniesList />
    </div>
  );
};

export default CompaniesPage;
