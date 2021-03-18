import React, { useState } from "react";
import UIkit from "uikit";
import { ITimelineElement } from "../../types";
import Heading from "../Heading";
import "./stylesheet.css";

const Timeline = () => {
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  const [timeline, setTimeline] = useState(new Array());

  const add = (element: ITimelineElement) => {
    setTimeline((timeline) => [element, ...timeline]);
    save();
  };

  const remove = (element: ITimelineElement) => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer cet échange ?")
      .then(() => {
        setTimeline(timeline.filter((item) => item !== element));
        save();
      });
  };

  const setTimelineFromString = (timeline: string) => {
    const result: Array<Object> = [];
    timeline.split("<#>").forEach((elt) => {
      const [datetime, body] = elt.split("<$>");
      result.push({ datetime, body });
    });
    setTimeline(result);
  };

  const format = (): string => {
    return timeline
      .map((item) => {
        return item.datetime + "<$>" + item.body;
      })
      .join("<#>");
  };

  const addModal = () => {
    UIkit.modal.prompt("Nouvel échange", "").then((body) => {
      if (body && body.length > 0) {
        add({
          datetime: new Date().toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          body,
        });
      }
    });
  };

  const editModal = (item: ITimelineElement, index: number) => {
    UIkit.modal.prompt("Modifier échange", item.body).then((body) => {
      if (body !== null) {
        if (body && body.length > 0) {
          setTimeline(
            timeline.map((item, i) => {
              return index !== i ? item : { datetime: item.datetime, body };
            })
          );
          save();
        } else {
          remove(item);
        }
      }
    });
  };

  const save = () => {
    const data = format();
    console.log(data);
  };

  return (
    <div className="uk-flex uk-flex-column -fullheight -noselect">
      <Heading
        title="Suivi des échanges"
        subtitle="Dernière mise a jour il y a 2h"
      >
        <span
          className="uk-icon-link uk-margin-small-right"
          uk-icon="plus"
          onClick={() => {
            addModal();
          }}
        />
        <span
          className="uk-icon-link"
          uk-icon="info"
          uk-tooltip="Vous pouvez modifier/supprimer un échange en passant la souris dessus"
        />
      </Heading>
      <div className="-timeline">
        <ul className="-timeline-container">
          {timeline.map((elt, index) => {
            return (
              <li className="-timeline-item" key={index}>
                <p className="uk-label">{elt.datetime}</p>
                <div className="uk-card uk-card-default uk-card-body uk-padding-small -timeline-card">
                  <div className="uk-flex uk-flex-middle">
                    <p className=" uk-margin-remove-vertical uk-width-expand">
                      {elt.body}
                    </p>
                    <div className="uk-flex uk-flex-middle uk-width-auto -timeline-hover-expand">
                      <span
                        className="uk-icon-link uk-margin-small-right uk-margin-small-left"
                        uk-icon="file-edit"
                        onClick={() => {
                          editModal(elt, index);
                        }}
                      />
                      <span
                        className="uk-icon-link"
                        uk-icon="trash"
                        onClick={() => {
                          remove(elt);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
