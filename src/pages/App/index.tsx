import React from "react";
import Booking from "../../components/Booking";
import Navbar from "../../components/Navbar/index";
import "./style.css";

function App() {
  return (
    <div className="uk-flex" id="app-layout">
      <div className="uk-width-1-3 uk-width-1-6@l">
        <Navbar />
      </div>
      <main className="uk-width-2-3 uk-width-5-6@l uk-background-muted uk-padding-large">
        <Booking />
      </main>
    </div>
  );
}

export default App;
