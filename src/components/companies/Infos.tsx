import { FC, useEffect, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { ICompany } from "../../utils/types";
import Heading from "../Heading";

enum AllowedField {
  isActive = "isActive",
  isPublisher = "isPublisher",
  isExhibitor = "isExhibitor",
}

const Infos: FC<{ companyInfos: ICompany }> = ({ companyInfos }) => {
  const [company, setCompany] = useState<ICompany>(companyInfos);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputAddress, setInputAddress] = useState<string>(company.address);
  const instance = useAxios();

  const handleEditModeChange = (): void => {
    if (editMode === true) {
      setEditMode(false);
      const lastAddress = company.address;
      setCompany((company) => {
        return {
          ...company,
          address: inputAddress,
        };
      });
      instance
        .patch(`/api/company/${company.id!}`, { address: inputAddress })
        .catch(() => {
          setCompany((company) => {
            return {
              ...company,
              address: lastAddress,
            };
          });
          UIkit.notification({
            message: `Impossible de changer l'adresse de la société.`,
            status: "danger",
            pos: "top-center",
          });
        });
    }
    setEditMode(true);
  };

  const toggleProperty = (
    field: "isExhibitor" | "isPublisher" | "isActive"
  ): void => {
    setCompany((company) => {
      return {
        ...company,
        [field]: !company[field],
      };
    });
    instance
      .patch(`/api/company/${company.id!}`, {
        [field]: !company[field],
      })
      .catch(() => {
        setCompany((company) => {
          return {
            ...company,
            [field]: !company[field],
          };
        });
        UIkit.notification({
          message: `Impossible de changer le statut de la société`,
          status: "danger",
          pos: "top-center",
        });
      });
  };
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
          {!editMode ? (
            <p className=" uk-margin-remove-vertical uk-width-expand">
              {company.address}
            </p>
          ) : (
            <input
              className="uk-input"
              id="form-stacked-text"
              type="text"
              placeholder="entrer l'adresse'..."
              value={inputAddress}
              onChange={(e) => {
                setInputAddress(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEditModeChange();
                }
              }}
            />
          )}
          <div className="uk-flex uk-flex-middle uk-width-auto -timeline-hover-expand">
            <span
              className="uk-icon-link uk-margin-small-left"
              uk-icon="file-edit"
              onClick={handleEditModeChange}
            />
          </div>
        </div>
      </div>

      <div className="uk-flex uk-flex-between uk-margin-medium-bottom">
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            onChange={toggleProperty.bind(this, "isActive")}
            checked={company.isActive}
          />{" "}
          Actif
        </label>
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            onChange={toggleProperty.bind(this, "isPublisher")}
            checked={company.isPublisher}
          />{" "}
          Editeur
        </label>
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            onChange={toggleProperty.bind(this, "isExhibitor")}
            checked={company.isExhibitor}
          />{" "}
          Exposant
        </label>
      </div>
    </>
  );
};

export default Infos;
