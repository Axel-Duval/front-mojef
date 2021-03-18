import { Link } from "react-router-dom";
import { Company } from "../companies.types";

const CompanyRow = (props: { publisher: Company }) => {
  return (
    <tr key={props.publisher.id}>
      <td>{props.publisher.name}</td>
      <td>{props.publisher.address}</td>
      <td>{props.publisher.isPublisher ? "Editeur" : "Non Editeur"}</td>
      <td>{props.publisher.isExhibitor ? "Exposant" : "Non Exposant"}</td>
      {/* <td><Link to={`/publisher/${props.publisher.id}`}></Link></td> */}
    </tr>
  );
};

export default CompanyRow;
