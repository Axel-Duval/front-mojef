import { Link } from "react-router-dom";

interface Publisher {
  id: string;
  name: string;
  address: string;
  isPublisher: string;
  isExhibitor: string;
  isActive: string;
}

const PublisherRow = (props: { publisher: Publisher }) => {
  return (
    <tr key={props.publisher.id}>
      <td>{props.publisher.name}</td>
      <td>{props.publisher.address}</td>
      <td>
        {props.publisher.isExhibitor ? "Editeur-Exposant" : "Editeur seulement"}
      </td>
      {/* <td><Link to={`/publisher/${props.publisher.id}`}></Link></td> */}
    </tr>
  );
};

export default PublisherRow;
