import React, { useEffect, useState } from "react";
import { IFestival } from "../../utils/types";
import Modal from "../Modal";

interface IFestivalModal {
  show: boolean;
  onClose: Function;
  onAdd: Function;
}

const Festivals = ({ show, onClose, onAdd }: IFestivalModal) => {
  const [festivals, setFestivals] = useState<IFestival[]>([]);
  const [working, setWorking] = useState<string | null>(null);

  useEffect(() => {
    setFestivals([
      { id: "zefuuky", name: "MTP 2020", date: new Date(), isActive: false },
      { id: "zefzefe", name: "MTP 2019", date: new Date(), isActive: true },
      { id: "zergerf", name: "MTP 2018", date: new Date(), isActive: false },
    ]);
  }, [setFestivals]);

  const setActive = (festival: IFestival) => {
    setFestivals(
      festivals.map((f) => {
        if (f === festival) {
          f.isActive = true;
        } else {
          f.isActive = false;
        }
        return f;
      })
    );
  };

  const handleSetWorking = (festival: IFestival) => {
    setWorking(festival.id);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="uk-modal-title uk-margin-bottom -noselect">Festivals</h2>

      <ul
        className="uk-tab -noselect"
        uk-switcher="animation: uk-animation-fade; toggle: > *"
        uk-tab="true"
      >
        <li>
          <a href="#travail">Espace de travail</a>
        </li>
        <li>
          <a href="#actif">Visiteurs</a>
        </li>
      </ul>

      <ul className="uk-switcher uk-margin-medium-top -noselect">
        <li className="uk-margin-bottom">
          <ul className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-flex-middle uk-padding-remove-left">
            {festivals.map((festival: IFestival, index: number) => {
              return (
                <li
                  key={index}
                  className={
                    festival.id === working
                      ? "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-primary -pointer"
                      : "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-default -pointer"
                  }
                  onClick={() => handleSetWorking(festival)}
                >
                  <p>{festival.name}</p>
                </li>
              );
            })}
            <li>
              <span
                className="uk-icon-link -pointer"
                uk-icon="icon: plus"
                onClick={() => onAdd()}
              />
            </li>
          </ul>
        </li>
        <li className="uk-margin-bottom">
          <ul className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-flex-middle uk-padding-remove-left">
            {festivals.map((festival: IFestival, index: number) => {
              return (
                <li
                  key={index}
                  className={
                    festival.isActive
                      ? "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-primary -pointer"
                      : "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-default -pointer"
                  }
                  onClick={() => setActive(festival)}
                >
                  <p>{festival.name}</p>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </Modal>
  );
};

export default Festivals;
