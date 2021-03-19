import { Link } from "react-router-dom";
import { ICompany } from "../../../utils/types";

const CompanyRow = (props: { company: ICompany }) => {
  return (
    <tr key={props.company.id}>
      <Link to={`/companies/${props.company.id}`}>
        <td>{props.company.name}</td>
      </Link>
      <td>{props.company.address}</td>
      <td>{props.company.isPublisher ? "Editeur" : "Non Editeur"}</td>
      <td>{props.company.isExhibitor ? "Exposant" : "Non Exposant"}</td>
    </tr>
  );
};

export default CompanyRow;
