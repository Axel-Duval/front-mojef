import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FestivalContext } from "../contexts/festival";
import { UserContext } from "../contexts/user";
import FestivalsModal from "./festivals/FestivalsModal";
import NewFestivalModal from "./festivals/NewFestivalModal";

const Navbar = () => {
  const [festivalsShow, setFestivalsShow] = useState<boolean>(false);
  const [newFestivalShow, setNewFestivalShow] = useState<boolean>(false);

  const ctx = useContext(FestivalContext);

  return (
    <div className="uk-container -nav-scroll-container">
      <img
        src={logo}
        alt="Montpellier Jeu Festival Logo"
        className="-nav-icon"
      />
      <ul className="uk-nav uk-nav-default -nav-padding">
        <li>
          <FestivalsModal
            show={festivalsShow}
            onClose={() => setFestivalsShow(false)}
            onAdd={() => {
              setFestivalsShow(false);
              setNewFestivalShow(true);
            }}
          />
          <NewFestivalModal
            show={newFestivalShow}
            onClose={() => setNewFestivalShow(false)}
            onSuccess={(festival) => {
              ctx.addFestival(festival);
              setNewFestivalShow(false);
              setFestivalsShow(true);
            }}
          />
          <button
            className="uk-button uk-button-small uk-button-default uk-width-small -wrap-text-button"
            onClick={() => setFestivalsShow(true)}
          >
            {ctx.currentFestival
              ? ctx.currentFestival.name
              : "Sélectionner ...."}
          </button>
        </li>
        <li className="uk-nav-header uk-margin-top">Organisation</li>
        <li className="uk-nav-divider"></li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/app">
            <span className="uk-margin-small-right" uk-icon="icon: uikit" />
            Tableau
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="uk-active" to="/app/reservations">
            <span className="uk-margin-small-right" uk-icon="icon: bell" />
            Suivis
          </NavLink>
        </li>
        {/* <li>
          <NavLink exact activeClassName="uk-active" to="/app/prix">
            <span
              className="uk-margin-small-right"
              uk-icon="icon:  credit-card"
            />
            Prix
          </NavLink>
        </li> */}
        <li>
          <NavLink exact activeClassName="uk-active" to="/app/comptabilite">
            <span className="uk-margin-small-right" uk-icon="icon: file-text" />
            Comptabilité
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/app/zones">
            <span className="uk-margin-small-right" uk-icon="icon: location" />
            Zones
          </NavLink>
        </li>
        <li className="uk-nav-header uk-margin-top">Ressources</li>
        <li className="uk-nav-divider"></li>
        <li>
          <NavLink activeClassName="uk-active" to="/app/societes">
            <span className="uk-margin-small-right" uk-icon="icon: users" />
            Sociétés
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/app/jeux">
            <span className="uk-margin-small-right" uk-icon="icon: bolt" />
            Jeux
          </NavLink>
        </li>
        <li className="uk-nav-header uk-margin-top">Comptes</li>
        <li className="uk-nav-divider"></li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/app/compte">
            <span className="uk-margin-small-right" uk-icon="icon: user" />
            Mon compte
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/app/comptes">
            <span className="uk-margin-small-right" uk-icon="icon: settings" />
            Autres comptes
          </NavLink>
        </li>

        <li>
          <UserContext.Consumer>
            {(ctx) => (
              <a onClick={() => ctx.logout()} href=" ">
                <span
                  className="uk-margin-small-right"
                  uk-icon="icon: sign-out"
                />
                Déconnexion
              </a>
            )}
          </UserContext.Consumer>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
