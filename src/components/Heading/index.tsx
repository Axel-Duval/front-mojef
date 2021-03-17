import React from "react";

interface IHeadingProps {
  title: string;
  subtitle: string;
}

const Heading: React.FC<IHeadingProps> = ({ title, subtitle, children }) => {
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
