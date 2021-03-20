import React from "react";
import { Link } from "react-router-dom";
import { IPartialCompany, ITableCompanies } from "../../utils/types";

const CompaniesTable: React.FC<ITableCompanies> = ({ companies }) => {
  const getCompanyStatus = (company: IPartialCompany): string => {
    if (company.isExhibitor && company.isPublisher) {
      return "Éditeur-Exposant";
    } else if (company.isExhibitor) {
      return "Exposant";
    } else if (company.isPublisher) {
      return "Éditeur";
    } else {
      return "Aucun statut";
    }
  };

  return (
    <table className="uk-table uk-table-justify uk-table-divider uk-table-small -noselect">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Statut</th>
          <th>Actif</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company: IPartialCompany, index: number) => {
          return (
            <tr key={index}>
              <Link to={`/app/societes/${company.id}`}>
                <td>{company.name}</td>
              </Link>
              <td>{company.isActive ? "Actif" : "Inactif"}</td>
              <td>{getCompanyStatus(company)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default CompaniesTable;
