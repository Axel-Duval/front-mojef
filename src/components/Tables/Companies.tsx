import React from "react";
import { useHistory } from "react-router-dom";
import { IPartialCompany } from "../../utils/types";

interface ITableCompanies {
  companies: IPartialCompany[];
  bookingsCompaniesId?: string[];
  onCreateBooking?: Function;
}

const CompaniesTable: React.FC<ITableCompanies> = ({
  companies,
  onCreateBooking,
  bookingsCompaniesId,
}: ITableCompanies) => {
  const history = useHistory();

  return (
    <>
      <p className="uk-text-meta">Total : {companies.length}</p>
      <table className="uk-table uk-table-divider uk-table-small -noselect">
        <thead>
          <tr>
            <th className="uk-table-shrink"></th>
            <th>Nom</th>
            <th className="uk-table-expand">Statut</th>
            {onCreateBooking && <th className="uk-width-small"></th>}
          </tr>
        </thead>
        <tbody>
          {companies.map((company: IPartialCompany, index: number) => {
            return (
              <tr key={index}>
                <td onClick={() => history.push("/app/societes/" + company.id)}>
                  {company.isActive && (
                    <label className="uk-label uk-label-success">Actif</label>
                  )}
                </td>
                <td onClick={() => history.push("/app/societes/" + company.id)}>
                  {company.name}
                </td>

                <td onClick={() => history.push("/app/societes/" + company.id)}>
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
                {onCreateBooking &&
                bookingsCompaniesId &&
                !bookingsCompaniesId.includes(company.id!) ? (
                  <td>
                    <label
                      className="uk-label uk-label-success -pointer"
                      onClick={() => onCreateBooking(company)}
                    >
                      Débuter le suivi
                    </label>
                  </td>
                ) : (
                  <td>
                    <label className="uk-label uk-label-warning">
                      Suivi en cours
                    </label>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default CompaniesTable;
