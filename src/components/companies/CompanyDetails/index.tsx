import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Company } from "../companies.types";
import CompanyRow from "../CompanyRow";

const CompanyDetails = (props: { id: string }) => {
  const [company, setCompany] = useState<Company>({
    name: "loading",
    address: "loading",
    isPublisher: true,
    isExhibitor: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);

  const instance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1000,
    headers: { "Access-Control-Allow-Origin": "*", crossorigin: true },
  });

  useEffect(() => {
    instance
      .get(`/api/company/${props.id}`)
      .then((res) => {
        setCompany(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setRedirect(true);
      });
  }, []);

  if (redirect) {
    return <Redirect to="/companies" />;
  } else {
    return (
      <div>
        {loading ? (
          "loading ..."
        ) : (
          <table>
            <tbody>
              <CompanyRow company={company}></CompanyRow>
            </tbody>
          </table>
        )}
      </div>
    );
  }
};

export default CompanyDetails;
