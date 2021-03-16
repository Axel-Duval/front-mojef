import React, { useEffect, useState } from "react";
import UIkit from "uikit";
import "./stylesheet.css";

interface ITimelineProps {
  exchanges?: String;
}

interface ITimelineElement {
  time: string;
  body: string;
}

function Timeline({ exchanges }: ITimelineProps) {
  const [timeline, setTimeline] = useState(new Array());

  useEffect(() => {
    if (exchanges) {
      const result: Array<Object> = [];
      const element = exchanges?.split("<#>");
      element.forEach((elt) => {
        const [time, body] = elt.split("<$>");
        result.push({ time, body });
      });
      setTimeline(result);
    }
  }, [exchanges]);

  const add = (element: ITimelineElement) => {
    setTimeline((timeline) => [element, ...timeline]);
    save();
  };

  const remove = (element: ITimelineElement) => {
    setTimeline(timeline.filter((item) => item !== element));
    save();
  };

  const format = (): string => {
    return timeline
      .map((item) => {
        return item.time + "<$>" + item.body;
      })
      .join("<#>");
  };

  const addModal = () => {
    UIkit.modal.prompt("Nouvel échange", "").then((body) => {
      if (body && body.length > 0) {
        add({
          time: new Date().toLocaleDateString(),
          body,
        });
      }
    });
  };

  const editModal = (item: ITimelineElement, index: number) => {
    UIkit.modal.prompt("Modifier échange", item.body).then((body) => {
      if (body && body.length > 0) {
        setTimeline(
          timeline.map((item, i) => {
            return index !== i ? item : { time: item.time, body };
          })
        );
        save();
      } else {
        remove(item);
      }
    });
  };

  const save = () => {
    const data = format();
    console.log(data);
  };

  return (
    <div className="-timeline">
      <ul className="-timeline-container">
        <li
          className="uk-placeholder uk-text-center uk-padding-small uk-width-2-3 uk-align-center"
          onClick={addModal}
        >
          Ajouter un échange
        </li>

        {timeline.map((elt, index) => {
          return (
            <li className="-timeline-item" key={index}>
              <p className="uk-label">{elt.time}</p>
              <div className="uk-card uk-card-default uk-card-body uk-padding-small">
                <div className="uk-flex uk-flex-between uk-visible-toggle">
                  <p className="uk-width-5-6 uk-margin-remove-vertical">
                    {elt.body}
                  </p>
                  <div className="uk-flex uk-width-auto uk-invisible-hover">
                    <span
                      className="uk-icon-link uk-margin-small-right"
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
  );
}

export default Timeline;
