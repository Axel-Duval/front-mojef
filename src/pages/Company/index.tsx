import { useParams } from "react-router";
import CompanyDetails from "../../components/companies/CompanyDetails";
import Navbar from "../../components/Navbar";

const CompanyPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="uk-flex" id="app-layout">
      <aside className="">
        <Navbar />
      </aside>
      <main className="uk-flex-1 uk-background-muted uk-padding-large">
        <CompanyDetails id={id} />
      </main>
    </div>
  );
};

export default CompanyPage;
