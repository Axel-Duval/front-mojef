import React from "react";

interface IModal {
  onClose: Function;
  show: boolean;
}

const Modal: React.FC<IModal> = ({ onClose, show, children }) => {
  const showHideClassName = show
    ? "-modal display-block"
    : "-modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="-modal-main">
        <div className="-modal-close">
          <span uk-icon="icon: close" onClick={() => onClose()} />
        </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;
