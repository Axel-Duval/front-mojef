import React from "react";

const Loading = () => {
  return (
    <div className="-fullheight -fullwidth uk-flex uk-flex-center uk-flex-middle">
      <div uk-spinner="ratio: 3"></div>
    </div>
  );
};

export default Loading;
