import React from "react";
import { IHeading } from "../../types";

const Heading: React.FC<IHeading> = ({ title, subtitle, children }) => {
  return (
    <>
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <div>
          <p className="uk-text-lead uk-margin-remove-bottom">{title}</p>
          <p className="uk-text-meta uk-margin-remove-top">{subtitle}</p>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Heading;
