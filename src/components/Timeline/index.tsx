import React from "react";
import "./stylesheet.css";

function Timeline() {
  return (
    <div className="-timeline">
      <div>
        <div className="uk-placeholder uk-text-center uk-padding-small">
          Ajouter un échange
        </div>
        <div className="-timeline-item">
          <p className="uk-label">02/04/2021</p>
          <div className="uk-card uk-card-default uk-card-body uk-padding-small">
            <div className="uk-flex uk-flex-between">
              <p className="uk-width-5-6">
                Lorem ipsum sit amet, consectetur adipiscing elit,Lorem ipsum
                sit amet, consectetur adipiscing elit, Lorem ipsum sit amet,
                consectetur adipiscing elit,
              </p>
              <div className="uk-flex uk-width-auto">
                <span
                  className="uk-icon-link uk-margin-small-right"
                  uk-icon="file-edit"
                />
                <span className="uk-icon-link" uk-icon="trash" />
              </div>
            </div>
          </div>
        </div>
        <div className="-timeline-item">
          <p className="uk-label">02/04/2021</p>
          <div className="uk-card uk-card-default uk-card-body uk-padding-small">
            <div className="uk-flex uk-flex-between">
              <p className="uk-width-5-6">Lorem ipsum sit amet, consec</p>
              <div className="uk-flex uk-width-auto">
                <span
                  className="uk-icon-link uk-margin-small-right"
                  uk-icon="file-edit"
                />
                <span className="uk-icon-link" uk-icon="trash" />
              </div>
            </div>
          </div>
        </div>
        <div className="-timeline-item">
          <p className="uk-label">02/04/2021</p>
          <div className="uk-card uk-card-default uk-card-body uk-padding-small">
            <div className="uk-flex uk-flex-between">
              <p className="uk-width-5-6">Lorem ipsum sit amet, consec</p>
              <div className="uk-flex uk-width-auto">
                <span
                  className="uk-icon-link uk-margin-small-right"
                  uk-icon="file-edit"
                />
                <span className="uk-icon-link" uk-icon="trash" />
              </div>
            </div>
          </div>
        </div>
        <div className="-timeline-item">
          <p className="uk-label">02/04/2021</p>
          <div className="uk-card uk-card-default uk-card-body uk-padding-small">
            <div className="uk-flex uk-flex-between">
              <p className="uk-width-5-6">
                Lorem ipsum sit amet, consectetur adipi
              </p>
              <div className="uk-flex uk-width-auto">
                <span
                  className="uk-icon-link uk-margin-small-right"
                  uk-icon="file-edit"
                />
                <span className="uk-icon-link" uk-icon="trash" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
