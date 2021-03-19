import React from "react";
import { ICompany, ITableCompanies } from "../../utils/types";

const Companies: React.FC<ITableCompanies> = ({
  companies,
  onEdit,
  onDelete,
  onSelect,
}) => {
  return (
    <table className="uk-table uk-table-justify uk-table-divider uk-table-small -noselect">
      <thead>
        <tr>
          <th className="uk-table-shrink">Nom</th>
          <th>Actif</th>
          <th>Editeur</th>
          <th>Exposant</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company: ICompany, index: number) => {
          return (
            <tr key={index}>
              <td onClick={() => onSelect(company)}>{company.name}</td>
              <td>{company.isActive}</td>
              <td>{company.isPublisher ? "Editeur" : "Non Editeur"}</td>
              <td>{company.isExhibitor ? "Exposant" : "Non Exposant"}</td>
              <td>
                <span
                  className="uk-icon-link uk-margin-small-right uk-margin-small-left"
                  uk-icon="file-edit"
                  onClick={() => onEdit(company)}
                />
                <span
                  className="uk-icon-link"
                  uk-icon="trash"
                  onClick={() => onDelete(company)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Companies;
