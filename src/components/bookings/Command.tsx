import React, { useContext, useState } from "react";
import Heading from "../Heading";
import table from "../../assets/images/table.svg";
import selection from "../../assets/images/selection.svg";
import {
  IBookingSummarize,
  IFestival,
  ITableQuantities,
} from "../../utils/types";
import { useAxios } from "../../hooks/useAxios";
import UIkit from "uikit";
import CommandModal from "./CommandModal";
import { FestivalContext } from "../../contexts/festival";
import { useGet } from "../../hooks/useGet";

interface IBookingCommand {
  booking: IBookingSummarize;
}

const Bookingcommand = ({ booking }: IBookingCommand) => {
  const instance = useAxios();
  const [tablesQuantities, setTablesQuantities] = useState(
    booking.tablesQuantities
  );
  const festivalId = useContext(FestivalContext).currentFestival?.id;
  const [festival] = useGet<IFestival>(`api/festival/${festivalId}`);
  const [showCommandModal, setShowCommandModal] = useState(false);
  const [
    editTableQuantitie,
    setEditTableQuantitie,
  ] = useState<ITableQuantities | null>(null);
  const [checkboxes, setCheckboxes] = useState({
    isPlaced: booking.isPlaced,
    isPresent: booking.isPresent,
    needVolunteers: booking.needVolunteers,
  });

  const getAvailablePrices = () => {
    const taken = tablesQuantities.map((t) => t.priceId);
    return (
      festival?.prices.filter((price) => {
        return !taken.includes(price.id);
      }) || []
    );
  };

  const handleSuccess = async (
    tableQuantity: ITableQuantities,
    isEdit: boolean
  ) => {
    if (festival) {
      if (isEdit) {
        //edit mode
        setTablesQuantities(
          tablesQuantities.map((t) => {
            if (t.priceId === tableQuantity.priceId) {
              return {
                ...t,
                tables: tableQuantity.tables,
                floors: tableQuantity.floors,
              };
            } else {
              return t;
            }
          })
        );
      } else {
        //add mode
        const tmp = festival.prices.find(
          (p) => p.id === tableQuantity.priceId
        )!;
        setTablesQuantities([
          ...tablesQuantities,
          { ...tableQuantity, price: tmp },
        ]);
      }
      setShowCommandModal(false);
    }
  };

  const handleDelete = (quantity: ITableQuantities) => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer cette commande ?")
      .then(() => {
        instance
          .delete(
            `api/table-quantities/${quantity.bookingId}/${quantity.priceId}`
          )
          .then(() => {
            setTablesQuantities(
              tablesQuantities.filter((tq) => tq.priceId !== quantity.priceId)
            );
          })
          .catch(() => {
            UIkit.notification({
              message: `Impossible de supprimer la commande`,
              status: "danger",
              pos: "top-center",
            });
          });
      })
      .catch(() => {});
  };

  const toggleCheckbox = (item: any) => {
    //Toggle checkboxes
    const tmp = checkboxes;

    setCheckboxes({ ...tmp, ...item });

    //Perform action (API)
    instance.patch(`/api/booking/${booking.id}`, item).catch(() => {
      //Error re-toggle checkboxes
      setCheckboxes(tmp);
      UIkit.notification({
        message: `Impossible d'appliquer la modification`,
        status: "danger",
        pos: "top-center",
      });
    });
  };
  return (
    <div className="uk-flex uk-flex-column -fullheight -noselect">
      {showCommandModal && (
        <CommandModal
          onClose={() => {
            setShowCommandModal(false);
            setEditTableQuantitie(null);
          }}
          tableQuantitie={editTableQuantitie}
          prices={getAvailablePrices() || []}
          bookingId={booking.id}
          onSuccess={handleSuccess}
        />
      )}
      <Heading title="Récapitulatif" subtitle="Dernière mise a jour il y a 2h">
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
          onClick={() => setShowCommandModal(true)}
        />
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="info"
          uk-tooltip="Vous pouvez modifier/supprimer la commande en passant la souris dessus"
        />
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
        />
      </Heading>
      <div className="-booking-command">
        <ul className="-booking-command-container">
          {tablesQuantities &&
            tablesQuantities
              .sort((a, b) =>
                a.price.label
                  .toLowerCase()
                  .localeCompare(b.price.label.toLowerCase())
              )
              .map((quantity, index) => {
                return (
                  <li
                    className="uk-flex uk-flex-middle -booking-command-item"
                    key={index}
                  >
                    <p className="uk-label uk-margin-remove-bottom">
                      {quantity.price.label}
                    </p>
                    <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small uk-flex uk-flex-middle">
                      <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small">
                        <img width="30" height="30" alt="" uk-img={table} />
                      </div>
                      <div className="uk-flex uk-flex-center uk-flex-column uk-flex-middle uk-margin-left">
                        <p className="uk-text-bold uk-heading-small uk-margin-remove">
                          {quantity.tables}
                        </p>
                      </div>
                    </div>
                    <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-margin-left uk-padding-small uk-flex uk-flex-middle">
                      <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small">
                        <img width="30" height="30" alt="" uk-img={selection} />
                      </div>
                      <div className="uk-flex uk-flex-center uk-flex-column uk-flex-middle uk-margin-left">
                        <p className="uk-text-bold uk-heading-small uk-margin-remove">
                          {quantity.floors}
                        </p>
                      </div>
                    </div>
                    <div className="uk-flex uk-flex-middle uk-width-auto uk-card uk-card-default uk-card-body uk-padding-small -booking-command-card uk-margin-left -booking-command-hover-expand">
                      <span
                        className="uk-icon-link uk-margin-small-right"
                        uk-icon="file-edit"
                        onClick={() => {
                          setEditTableQuantitie(quantity);
                          setShowCommandModal(true);
                        }}
                      />
                      <span
                        className="uk-icon-link"
                        uk-icon="trash"
                        onClick={() => {
                          handleDelete(quantity);
                        }}
                      />
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
      <div className="uk-flex uk-flex-between">
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            checked={checkboxes.isPlaced}
            onChange={() => toggleCheckbox({ isPlaced: !checkboxes.isPlaced })}
          />{" "}
          Placé sur le plan
        </label>
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            checked={checkboxes.isPresent}
            onChange={() =>
              toggleCheckbox({ isPresent: !checkboxes.isPresent })
            }
          />{" "}
          Sera présent
        </label>
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            checked={checkboxes.needVolunteers}
            onChange={() =>
              toggleCheckbox({ needVolunteers: !checkboxes.needVolunteers })
            }
          />{" "}
          Besoin bénévoles
        </label>
      </div>
    </div>
  );
};

export default Bookingcommand;
