import axios from "axios";
import { useEffect, useState } from "react";
import { Publisher } from "../publisher.types";
import PublisherModalForm from "../PublisherModalForm";
import PublisherRow from "../PublisherRow";

const PublishersList = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addModal, setAddModal] = useState<boolean>(false);

  const instance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1000,
    headers: { "Access-Control-Allow-Origin": "*", crossorigin: true },
  });

  useEffect(() => {
    instance
      .get("/api/company?publisher=true")
      .then((res) => {
        setPublishers(res.data);
        setLoading(false);
        console.log(publishers);
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
      <PublisherModalForm
        showModal={addModal}
        setShowModal={switchModalState}
      ></PublisherModalForm>
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
            {publishers.map((publisher) => (
              <PublisherRow publisher={publisher} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PublishersList;
