import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useAxios } from "../../hooks/useAxios";
import { ICompany } from "../../utils/types";
import Companies from "../Tables/Companies";
import CompanyModalForm from "./CompanyModalForm";

const CompaniesList = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addModal, setAddModal] = useState<boolean>(false);

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

  const addCompany = (company: ICompany) => {
    instance
      .post("/api/company", company)
      .then((res) => {
        setCompanies([...companies, res.data]);
      })
      .catch((err) => console.error(err));
  };

  const handleSelect = (company: ICompany) => {
    console.log("Select handled");
  };
  const handleEdit = (company: ICompany) => {
    console.log("edit handled");
  };
  const handleDelete = (company: ICompany) => {
    console.log("delete handled");
  };

  return (
    <div>
      <Button color="primary" onClick={switchModalState}>
        Ajouter une société
      </Button>
      <CompanyModalForm
        showModal={addModal}
        setShowModal={switchModalState}
        addCompany={addCompany}
        companies={companies}
      ></CompanyModalForm>
      <Companies
        companies={companies}
        onSelect={handleSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CompaniesList;
