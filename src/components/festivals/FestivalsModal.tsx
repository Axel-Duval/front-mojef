import { FestivalContext } from "../../contexts/festival";
import Modal from "../Modal";

interface IFestivalModal {
  show: boolean;
  onClose: Function;
  onAdd: Function;
}

const Festivals = ({ show, onClose, onAdd }: IFestivalModal) => {
  return (
    <>
      {show && (
        <Modal onClose={onClose}>
          <FestivalContext.Consumer>
            {(value) => (
              <>
                <h2 className="uk-modal-title uk-margin-bottom uk-margin-left -noselect">
                  Festivals
                </h2>

                <ul
                  className="uk-tab -noselect"
                  uk-switcher="animation: uk-animation-fade; toggle: > *"
                  uk-tab="true"
                >
                  <li>
                    <a href="#travail">Espace de travail</a>
                  </li>
                  <li>
                    <a href="#actif">Visiteurs</a>
                  </li>
                </ul>

                <ul className="uk-switcher uk-margin-medium-top -noselect">
                  <li className="uk-margin-bottom">
                    <ul className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-flex-middle uk-padding-remove-left">
                      {value.festivals.map((festival, index: number) => {
                        return (
                          <li
                            key={index}
                            className={
                              festival.id === value.currentFestival?.id
                                ? "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-primary uk-margin-bottom -pointer"
                                : "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-default uk-margin-bottom -pointer"
                            }
                            onClick={() => value.setCurrentFestival(festival)}
                          >
                            <p>{festival.name}</p>
                          </li>
                        );
                      })}
                      <li>
                        <span
                          className="uk-icon-link uk-margin-bottom -pointer"
                          uk-icon="icon: plus"
                          onClick={() => onAdd()}
                        />
                      </li>
                    </ul>
                  </li>
                  <li className="uk-margin-bottom">
                    <ul className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-flex-middle uk-padding-remove-left">
                      {value.festivals.map((festival, index: number) => {
                        return (
                          <li
                            key={index}
                            className={
                              festival.isActive
                                ? "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-primary uk-margin-bottom -pointer"
                                : "uk-card uk-card-hover uk-card-body uk-padding-small -timeline-card uk-margin-small-right uk-card-default uk-margin-bottom -pointer"
                            }
                          >
                            <p>{festival.name}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </>
            )}
          </FestivalContext.Consumer>
        </Modal>
      )}
    </>
  );
};

export default Festivals;
