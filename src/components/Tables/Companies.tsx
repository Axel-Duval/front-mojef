import React from "react";
import { Link } from "react-router-dom";
import { IPartialCompany, ITableCompanies } from "../../utils/types";

const CompaniesTable: React.FC<ITableCompanies> = ({ companies }) => {
  return (
    <table className="uk-table uk-table-justify uk-table-divider uk-table-small -noselect">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Actif</th>
          <th>Editeur</th>
          <th>Exposant</th>
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
              <td>{company.isPublisher ? "Editeur" : "Non Editeur"}</td>
              <td>{company.isExhibitor ? "Exposant" : "Non Exposant"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default CompaniesTable;
