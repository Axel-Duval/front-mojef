import Navbar from "../../components/Navbar/index";
import PublishersList from "../../components/publishers/PublishersList";

const Publishers = () => {
  return (
    <div className="uk-flex uk-flex-stretch" id="app-layout">
      <div className="uk-width-1-3 uk-width-1-6@l">
        <Navbar />
      </div>
      <main className="uk-width-2-3 uk-width-5-6@l uk-background-muted uk-padding-large">
        <PublishersList />
      </main>
    </div>
  );
};

export default Publishers;
