import React from "react";
import Heading from "../Heading";
import "./style.css";

function Contacts() {
  return (
    <div className="uk-margin-medium-left -flex-1">
      <div className="uk-flex uk-flex-column -fullheight">
        <Heading
          title="Contacts"
          subtitle="Dernière mis à jour il y a 10 jours"
          icon="info"
          tooltip="Vos notes sont sauvegardées automatiquement"
        />
        <div className="-contacts">
          <div className="-contact-container">
            <table className="uk-table uk-table-justify uk-table-divider">
              <thead>
                <tr>
                  <th className="uk-width-small">Table Heading</th>
                  <th>Table Heading</th>
                  <th>Table Heading</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Table Data</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </td>
                  <td>
                    <button
                      className="uk-button uk-button-default"
                      type="button"
                    >
                      Button
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Table Data</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </td>
                  <td>
                    <button
                      className="uk-button uk-button-default"
                      type="button"
                    >
                      Button
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Table Data</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </td>
                  <td>
                    <button
                      className="uk-button uk-button-default"
                      type="button"
                    >
                      Button
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Table Data</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </td>
                  <td>
                    <button
                      className="uk-button uk-button-default"
                      type="button"
                    >
                      Button
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
