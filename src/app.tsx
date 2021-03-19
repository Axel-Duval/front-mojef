import React from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
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

function App() {
  return (
    <div className="uk-flex" id="app-layout">
      <aside>
        <Navbar />
      </aside>
      <main className="uk-flex-1 uk-background-muted uk-padding-large">
        <ProtectedRoute exact path="/app" component={Dashboard} />
        <ProtectedRoute exact path="/app/reservations" component={Bookings} />
        <ProtectedRoute
          exact
          path="/app/reservations/:id"
          component={Booking}
        />
        <ProtectedRoute exact path="/app/comptabilite" component={Accounting} />
        <ProtectedRoute exact path="/app/zones" component={Zones} />
        <ProtectedRoute exact path="/app/societes/:id" component={Company} />
        <ProtectedRoute exact path="/app/societes" component={Companies} />
        <ProtectedRoute exact path="/app/jeux" component={Games} />
        <ProtectedRoute exact path="/app/categories" component={Categories} />
        <ProtectedRoute exact path="/app/compte" component={Account} />
        <ProtectedRoute exact path="/app/comptes" component={Accounts} />
      </main>
    </div>
  );
}

export default App;
