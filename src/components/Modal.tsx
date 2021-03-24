import React from "react";

interface IModal {
  onClose: Function;
  title?: string;
}

const Modal: React.FC<IModal> = ({ title, onClose, children }) => {
  return (
    <div className="-modal display-block">
      <section className="-modal-main">
        <div className="-modal-close">
          <span uk-icon="icon: close" onClick={() => onClose()} />
        </div>
        <div className="-modal-children">
          {title && <h2>{title}</h2>}
          {children}
        </div>
      </section>
    </div>
  );
};

export default Modal;
