import React from "react";

const Dashboard = () => {
  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">Tableau de bord</h1>
        <div className="uk-flex uk-flex-middle">
          <span className="uk-icon-link" uk-icon="refresh" />
          <span className="uk-margin-small-left uk-text-meta">2min</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
