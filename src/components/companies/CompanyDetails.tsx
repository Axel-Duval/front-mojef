import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import { ICompany } from "../../utils/types";
import CompanyRow from "./CompanyRow";

const CompanyDetails = (props: { id: string }) => {
  const [company, setCompany] = useState<ICompany>({
    name: "loading",
    address: "loading",
    isPublisher: true,
    isExhibitor: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);

  const instance = useAxios();

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
  }, [instance, props.id]);

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
