import React from "react";

interface ITile {
  title: string;
  body: string;
  color: string;
  percent?: number;
}

const Tile = ({ title, body, color, percent }: ITile) => {
  return (
    <div className={"uk-tile -noselect -tile uk-tile-" + color}>
      {percent !== undefined && (
        <span className="uk-badge -tile-badge">{percent}%</span>
      )}
      <p className="-tile-body">{body}</p>
      <p className="-tile-title">{title}</p>
    </div>
  );
};

export default Tile;
