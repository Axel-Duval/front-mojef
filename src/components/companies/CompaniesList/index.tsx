import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useAxios } from "../../../hooks/useAxios";
import { Company } from "../companies.types";
import CompanyModalForm from "../CompanyModalForm";
import CompanyRow from "../CompanyRow";

const CompaniesList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
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

  const addCompany = (company: Company) => {
    instance
      .post("/api/company", company)
      .then((res) => {
        setCompanies([...companies, res.data]);
      })
      .catch((err) => console.error(err));
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
      {loading ? (
        <div>...loading </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sociétés</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <CompanyRow company={company} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompaniesList;
