import { FC, useEffect } from "react";
import { useGet } from "../../hooks/useGet";
import { ICompany } from "../../utils/types";

const CompanyInputForm: FC<{
  defaultValue: string;
  setCompanyId: (id: string) => void;
}> = ({ defaultValue, setCompanyId }) => {
  const [companies, isLoading] = useGet<ICompany[]>(
    "api/company?publisher=true&active=true"
  );

  return (
    <div className="uk-margin">
      {isLoading ? (
        "... loading"
      ) : (
        <>
          <label className="uk-form-label">Société d'édition</label>
          <div className="uk-form-controls">
            <select
              className="uk-select"
              id="form-horizontal-select"
              onChange={(e) => setCompanyId(e.currentTarget.value)}
              defaultValue={defaultValue != "" ? defaultValue : undefined}
            >
              {companies!.map((company: ICompany, index: number) => {
                return (
                  <option value={company.id} key={index}>
                    {company.name} {";id" + company.id}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyInputForm;
