import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { IPartialCompany } from "../../utils/types";
import CompaniesTable from "../Tables/Companies";
import CompanyModalForm from "./CompanyModalForm";

const CompaniesList = () => {
  const [companies, setCompanies] = useState<IPartialCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addModal, setAddModal] = useState<boolean>(false);
  const addCompanyModalId = "add-company-modal";

  const instance = useAxios();

  useEffect(() => {
    instance
      .get("/api/company")
      .then((res) => {
        setCompanies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [instance]);

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
    <div>
      <button className="uk-button" onClick={switchModalState}>
        Créer
      </button>
      <CompanyModalForm
        showModal={addModal}
        setShowModal={switchModalState}
        addCompany={addCompany}
        companies={companies}
      ></CompanyModalForm>
      <CompaniesTable companies={companies} />
    </div>
  );
};

export default CompaniesList;
