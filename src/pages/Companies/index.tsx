import Navbar from "../../components/Navbar/index";
import CompaniesList from "../../components/companies/CompaniesList";

const CompaniesPage = () => {
  return (
    <div className="uk-flex uk-flex-stretch" id="app-layout">
      <div className="uk-width-1-3 uk-width-1-6@l">
        <Navbar />
      </div>
      <main className="uk-width-2-3 uk-width-5-6@l uk-background-muted uk-padding-large">
        <CompaniesList />
      </main>
    </div>
  );
};

export default CompaniesPage;
