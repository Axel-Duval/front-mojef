import axios from "axios";
import { useEffect, useState } from "react";
import { Company } from "../companies.types";
import CompanyModalForm from "../CompanyModalForm";
import CompanyRow from "../CompanyRow";

const CompaniesList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addModal, setAddModal] = useState<boolean>(false);

  const instance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1000,
    headers: { "Access-Control-Allow-Origin": "*", crossorigin: true },
  });

  useEffect(() => {
    instance
      .get("/api/company")
      .then((res) => {
        setCompanies(res.data);
        setLoading(false);
        console.log(companies);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const switchModalState = () => {
    setAddModal(!addModal);
  };

  return (
    <div>
      <button onClick={switchModalState}>Ajouter un éditeur</button>
      <CompanyModalForm
        showModal={addModal}
        setShowModal={switchModalState}
      ></CompanyModalForm>
      {loading ? (
        <div>...loading </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>éditeurs</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((publisher) => (
              <CompanyRow publisher={publisher} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompaniesList;
