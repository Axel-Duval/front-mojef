import React from "react";
import Booking from "../../components/Booking";
import Navbar from "../../components/Navbar/index";
import "./style.css";

function App() {
  return (
    <div className="uk-flex" id="app-layout">
      <aside className="">
        <Navbar />
      </aside>
      <main className="uk-flex-1 uk-background-muted uk-padding-large">
        <Booking />
      </main>
    </div>
  );
}

export default App;
