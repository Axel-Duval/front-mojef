import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Companies from "./pages/Companies";
import Company from "./pages/Company";
import Accounting from "./pages/Accounting";
import Games from "./pages/Games";
import Areas from "./pages/Areas";
import Account from "./pages/Account";
import Accounts from "./pages/Accounts";
import { Redirect, Route, Switch } from "react-router";
import {
  FestivalContext,
  FestivalContextValue,
  FestivalData,
} from "./contexts/festival";
import { useGet } from "./hooks/useGet";
import Loading from "./components/Loading";
import NoFestival from "./pages/NoFestival";

function App() {
  const [loaded, setLoaded] = useState(false);

  const [
    festivalCtxValue,
    setFestivalCtxValue,
  ] = useState<FestivalContextValue>({
    festivals: [],
    currentFestival: null,
    setCurrentFestival: (festival) => {
      localStorage.setItem("working_festival", festival.id);
      setFestivalCtxValue((ctx) => ({
        ...ctx,
        currentFestival: festival,
      }));
    },
    addFestival: (festival) =>
      setFestivalCtxValue((ctx) => ({
        ...ctx,
        festivals: [...ctx.festivals, festival],
        currentFestival: ctx.currentFestival || festival,
      })),
  });

  const [festivals, loading, errored] = useGet<
    (FestivalData & { date: string })[]
  >("/api/festival");

  useEffect(() => {
    if (festivals) {
      let current: FestivalData | null = null;

      /**
       * Try to retrieve festival from local storage
       */
      const currentFestivalId = localStorage.getItem("working_festival");
      if (currentFestivalId) {
        const filteredFestivals = festivals.filter(
          (f) => f.id === currentFestivalId
        );
        if (filteredFestivals.length) {
          current = filteredFestivals[0];
        }
      }

      /**
       * If local storage retrieval failed and some festivals were found
       */
      if (current === null && festivals.length) {
        current = festivals[0];
        localStorage.setItem("working_festival", current.id);
      }
      setFestivalCtxValue((ctx) => ({
        ...ctx,
        currentFestival: current,
        festivals,
      }));
      setLoaded(true);
    }
  }, [festivals]);

  return (
    <FestivalContext.Provider value={festivalCtxValue}>
      {!loaded ? (
        <Loading />
      ) : festivalCtxValue.currentFestival ? (
        <div className="uk-flex" id="app-layout">
          <aside>
            <Navbar />
          </aside>
          <main className="uk-flex-1 uk-background-muted uk-padding-large">
            <Switch>
              <Route exact path="/app" component={Dashboard} />
              <Route exact path="/app/societes/:id" component={Company} />
              <Route exact path="/app/societes" component={Companies} />
              <Route exact path="/app/jeux" component={Games} />
              <Route exact path="/app/compte" component={Account} />
              <Route exact path="/app/comptes" component={Accounts} />

              <Route exact path="/app/reservations" component={Bookings} />
              <Route exact path="/app/reservations/:id" component={Booking} />
              <Route exact path="/app/comptabilite" component={Accounting} />
              <Route exact path="/app/zones" component={Areas} />

              <Redirect from="/app/*" to="/app" />
            </Switch>
          </main>
        </div>
      ) : (
        <NoFestival />
      )}
    </FestivalContext.Provider>
  );
}

export default App;
