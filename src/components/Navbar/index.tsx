import React from "react";
import { NavLink } from "react-router-dom";
import img from "../../assets/pictures/logo.png";
import { UserContext } from "../../context/user-context";
import "./style.css";

function Navbar() {
  return (
    <div className="uk-container -nav-scroll-container">
      <img
        src={img}
        alt="Montpellier Jeu Festival Logo"
        className="-nav-icon"
      />

      <ul className="uk-nav uk-nav-default -nav-padding">
        <li className="uk-nav-header uk-margin-top">Organisation</li>
        <li className="uk-nav-divider"></li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/">
            <span className="uk-margin-small-right" uk-icon="icon: uikit" />
            Tableau de bord
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/app">
            <span className="uk-margin-small-right" uk-icon="icon: bell" />
            Réservations
          </NavLink>
        </li>

        <li>
          <NavLink exact activeClassName="uk-active" to="/roufr">
            <span className="uk-margin-small-right" uk-icon="icon: location" />
            Zones
          </NavLink>
        </li>
        <li className="uk-nav-header uk-margin-top">Ressources</li>
        <li className="uk-nav-divider"></li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/publishers">
            <span className="uk-margin-small-right" uk-icon="icon: users" />
            Editeurs
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/roufr">
            <span className="uk-margin-small-right" uk-icon="icon: bolt" />
            Jeux
          </NavLink>
        </li>

        <li>
          <NavLink exact activeClassName="uk-active" to="/roufr">
            <span className="uk-margin-small-right" uk-icon="icon: tag" />
            Catégories
          </NavLink>
        </li>
        <li className="uk-nav-header uk-margin-top">Comptabilité</li>
        <li className="uk-nav-divider"></li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/roufr">
            <span className="uk-margin-small-right" uk-icon="icon: uikit" />
            Tableau de bord
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/roufr">
            <span className="uk-margin-small-right" uk-icon="icon: file-text" />
            Détails
          </NavLink>
        </li>
        <li className="uk-nav-header uk-margin-top">Comptes</li>
        <li className="uk-nav-divider"></li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/roufr">
            <span className="uk-margin-small-right" uk-icon="icon: user" />
            Mon compte
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="uk-active" to="/roufr">
            <span className="uk-margin-small-right" uk-icon="icon: settings" />
            Autres comptes
          </NavLink>
        </li>

        <li>
          <UserContext.Consumer>
            {(ctx) => (
              <a onClick={() => ctx.logout()}>
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
}

export default Navbar;
