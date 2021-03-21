import React from "react";
import { useHistory } from "react-router-dom";
import { IPartialCompany, ITableCompanies } from "../../utils/types";

const CompaniesTable: React.FC<ITableCompanies> = ({ companies }) => {
  const history = useHistory();

  return (
    <table className="uk-table uk-table-divider uk-table-small -noselect">
      <thead>
        <tr>
          <th className="uk-table-shrink"></th>
          <th>Nom</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company: IPartialCompany, index: number) => {
          return (
            <tr
              key={index}
              onClick={() => history.push("/app/societes/" + company.id)}
            >
              <td>
                {company.isActive && <label className="uk-label">Actif</label>}
              </td>
              <td>{company.name}</td>

              <td>
                {company.isPublisher && (
                  <label className="uk-label uk-margin-right uk-margin-remove-bottom">
                    Editeur
                  </label>
                )}
                {company.isExhibitor && (
                  <label className="uk-label uk-margin-remove-bottom">
                    Exposant
                  </label>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default CompaniesTable;
