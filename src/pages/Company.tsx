import React from "react";
import { useParams } from "react-router";
import CompanyDetails from "../components/companies/CompanyDetails";

const CompanyPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <CompanyDetails id={id} />
    </div>
  );
};

export default CompanyPage;
