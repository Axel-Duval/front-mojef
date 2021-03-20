import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Companies from "./pages/Companies";
import Company from "./pages/Company";
import Accounting from "./pages/Accounting";
import Games from "./pages/Games";
import Zones from "./pages/Zones";
import Categories from "./pages/Categories";
import Account from "./pages/Account";
import Accounts from "./pages/Accounts";
import { Route } from "react-router";

function App() {
  return (
    <div className="uk-flex" id="app-layout">
      <aside>
        <Navbar />
      </aside>
      <main className="uk-flex-1 uk-background-muted uk-padding-large">
        <Route exact path="/app" component={Dashboard} />
        <Route exact path="/app/reservations" component={Bookings} />
        <Route exact path="/app/reservations/:id" component={Booking} />
        <Route exact path="/app/comptabilite" component={Accounting} />
        <Route exact path="/app/zones" component={Zones} />
        <Route exact path="/app/societes/:id" component={Company} />
        <Route exact path="/app/societes" component={Companies} />
        <Route exact path="/app/jeux" component={Games} />
        <Route exact path="/app/categories" component={Categories} />
        <Route exact path="/app/compte" component={Account} />
        <Route exact path="/app/comptes" component={Accounts} />
      </main>
    </div>
  );
}

export default App;
