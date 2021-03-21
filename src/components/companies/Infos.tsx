import React from "react";
import { ICompany } from "../../utils/types";
import Heading from "../Heading";

interface IConpanyInfos {
  company: ICompany;
}

const Infos = ({ company }: IConpanyInfos) => {
  return (
    <>
      <Heading title="Renseignements" subtitle="">
        <span
          className="uk-icon-link -pointer uk-margin-small-right"
          uk-icon="info"
          uk-tooltip="Vous pouvez ajouter, modifier ou supprimer des contacts"
        />
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
        />
      </Heading>

      <div className="uk-card uk-card-default uk-card-body uk-padding-small -timeline-card uk-margin-medium-bottom uk-margin-top">
        <div className="uk-flex uk-flex-middle">
          <p className=" uk-margin-remove-vertical uk-width-expand">
            {company.address}
          </p>
          <div className="uk-flex uk-flex-middle uk-width-auto -timeline-hover-expand">
            <span
              className="uk-icon-link uk-margin-small-left"
              uk-icon="file-edit"
              onClick={() => {
                console.log("modifier l'adresse");
              }}
            />
          </div>
        </div>
      </div>

      <div className="uk-flex uk-flex-between uk-margin-medium-bottom">
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            onChange={() => console.log("toggle isActive")}
            checked={company.isActive}
          />{" "}
          Actif
        </label>
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            onChange={() => console.log("toggle isPublisher")}
            checked={company.isPublisher}
          />{" "}
          Editeur
        </label>
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            onChange={() => console.log("toggle isExhibitor")}
            checked={company.isExhibitor}
          />{" "}
          Exposant
        </label>
      </div>
    </>
  );
};

export default Infos;
