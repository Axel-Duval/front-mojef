import React from "react";

interface IModal {
  onClose: Function;
}

const Modal: React.FC<IModal> = ({ onClose, children }) => {
  return (
    <div className="-modal display-block">
      <section className="-modal-main">
        <div className="-modal-close">
          <span uk-icon="icon: close" onClick={() => onClose()} />
        </div>
        <div className="-modal-children">{children}</div>
      </section>
    </div>
  );
};

export default Modal;
