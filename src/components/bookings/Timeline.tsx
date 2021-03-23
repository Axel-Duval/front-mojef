import { useEffect, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { ITimelineElement } from "../../utils/types";
import Heading from "../Heading";

interface ITimeline {
  exchanges: string;
  bookingId: string;
}

const Timeline = ({ exchanges, bookingId }: ITimeline) => {
  const instance = useAxios();
  const [timeline, setTimeline] = useState<ITimelineElement[]>(
    timelineFromString(exchanges)
  );

  useEffect(() => {
    function format() {
      return timeline
        .map((item: ITimelineElement) => {
          return item.datetime + "<$>" + item.body;
        })
        .join("<#>");
    }
    instance
      .patch(`/api/booking/${bookingId}`, { exchanges: format() })
      .catch(() => {
        UIkit.notification({
          message: `Impossible de sauvegarder les échanges`,
          status: "danger",
          pos: "top-center",
        });
      });
  }, [timeline, bookingId, instance]);

  const add = (element: ITimelineElement) => {
    setTimeline((timeline) => [element, ...timeline]);
  };

  const remove = (element: ITimelineElement) => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer cet échange ?")
      .then(() => {
        setTimeline(timeline.filter((item) => item !== element));
      });
  };

  function timelineFromString(timeline: string) {
    if (timeline.length < 2) {
      return [];
    }
    const result: ITimelineElement[] = [];
    timeline.split("<#>").forEach((elt) => {
      const [datetime, body] = elt.split("<$>");
      result.push({ datetime, body });
    });
    return result;
  }

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
        } else {
          remove(item);
        }
      }
    });
  };
  return (
    <div className="uk-flex uk-flex-column -fullheight -noselect">
      <Heading
        title="Suivi des échanges"
        subtitle={"Dernier échange: " + timeline[0].datetime}
      >
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
          onClick={() => {
            addModal();
          }}
        />
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="info"
          uk-tooltip="Vous pouvez modifier/supprimer un échange en passant la souris dessus"
        />
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
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
                        className="uk-icon-link uk-margin-small-right uk-margin-small-left -pointer"
                        uk-icon="file-edit"
                        onClick={() => {
                          editModal(elt, index);
                        }}
                      />
                      <span
                        className="uk-icon-link -pointer"
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
