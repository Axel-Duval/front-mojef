import React, { useEffect, useState } from "react";
import { IFestival } from "../utils/types";

const Festivals = () => {
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
    const temp = festivals.map((f) => {
      if (f === festival) {
        f.isActive = true;
      } else {
        f.isActive = false;
      }
      return f;
    });
    console.log(temp);
    setFestivals(temp);
  };

  const handleSetWorking = (festival: IFestival) => {
    setWorking(festival.id);
  };

  return (
    <div id="festivals-modal" uk-modal="true">
      <div className="uk-modal-dialog uk-modal-body" uk-overflow-auto="true">
        <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom">
          <h2 className="uk-modal-title">Festivals</h2>
          <span className="uk-icon-link" uk-icon="icon: plus; ratio: 1.3" />
        </div>

        <ul
          className="uk-tab"
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

        <ul className="uk-switcher uk-margin-medium-top">
          <li>
            <ul className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-flex-middle uk-padding-remove-left">
              {festivals.map((festival: IFestival, index: number) => {
                return (
                  <li
                    key={index}
                    className={
                      festival.id === working
                        ? "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-primary"
                        : "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-default"
                    }
                    onClick={() => handleSetWorking(festival)}
                  >
                    <p>{festival.name}</p>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <ul className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-flex-middle uk-padding-remove-left">
              {festivals.map((festival: IFestival, index: number) => {
                return (
                  <li
                    key={index}
                    className={
                      festival.isActive
                        ? "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-primary"
                        : "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-default"
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
      </div>
    </div>
  );
};

export default Festivals;
