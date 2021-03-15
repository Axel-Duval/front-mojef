import React from "react";

interface IHeadingProps {
  title: string;
  subtitle: string;
  icon: string;
  tooltip?: string;
  cb?: Function;
}

function Heading({ title, subtitle, icon, tooltip, cb }: IHeadingProps) {
  return (
    <>
      <p className="uk-text-lead uk-margin-remove-bottom">{title}</p>
      <div className="uk-flex uk-flex-between">
        <p className="uk-text-meta uk-margin-remove-top uk-flex-bottom">
          {subtitle}
        </p>
        <span
          className="uk-icon-link uk-margin-small-right"
          uk-icon={"icon: " + icon + "; ratio: 0.8"}
          uk-tooltip={"title: " + (tooltip || " ") + "; delay: 100;"}
          onClick={() => {
            cb && cb();
          }}
        />
      </div>
    </>
  );
}

export default Heading;
