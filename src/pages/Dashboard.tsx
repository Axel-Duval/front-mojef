import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import PriceCard from "../components/dashboard/PriceCard";
import Tile from "../components/dashboard/Tile";
import { FestivalContext } from "../contexts/festival";
import { useGet } from "../hooks/useGet";
import { IBooking, IFestival, IPartialCompany, IPrice } from "../utils/types";
import Modal from "../components/Modal";
import PriceForm from "../components/dashboard/PriceForm";
import { useAxios } from "../hooks/useAxios";
import UIkit from "uikit";

const Dashboard = () => {
  const currentFestival = useContext(FestivalContext).currentFestival;
  const [showAddPriceModal, setShowAddPriceModal] = useState(false);
  const [editPrice, setEditPrice] = useState<IPrice | null>(null);
  const [prices, setPrices] = useState<IPrice[]>([]);
  const instance = useAxios();

  /**
   *  API FETCHING
   */
  const [festival, loadingFestival] = useGet<IFestival>(
    `/api/festival/${currentFestival?.id}`
  );
  const [companies, loadingCompanies] = useGet<IPartialCompany[]>(
    "/api/company"
  );
  const [bookings, loadingBookings] = useGet<IBooking[]>(
    `/api/booking/festival/${currentFestival?.id}`
  );

  useEffect(() => {
    setPrices(festival?.prices || []);
  }, [festival]);

  /**
   *  COMPUTE STATS
   */
  const countPaidBookings = () => {
    return bookings?.filter((booking) => booking.billPaidOn).length;
  };

  const countPresent = () => {
    return bookings?.filter((booking) => booking.isPresent).length;
  };

  const countPlaced = () => {
    return bookings?.filter((booking) => booking.isPlaced).length;
  };

  const sumVolunteers = () => {
    return bookings?.reduce((prev, curr) => {
      return prev + (curr.needVolunteers ? 1 : 0);
    }, 0);
  };

  const percent = (val: number, max: number) => {
    if (val === 0) {
      return 0;
    } else {
      return Math.floor((100 * val) / max);
    }
  };

  /**
   *  ADD/EDIT PRICE
   */
  const onAddPriceSuccess = (price: IPrice, isEdit: boolean) => {
    if (isEdit) {
      //Edit mode
      setEditPrice(null);
      setPrices(
        prices.map((p) => {
          if (p.id !== price.id) {
            return p;
          } else {
            return price;
          }
        })
      );
    } else {
      //Add mode
      setPrices([price, ...prices]);
    }
    setShowAddPriceModal(false);
  };

  const deletePrice = (price: IPrice) => {
    instance
      .delete(`/api/price/${price.id}`)
      .then((res) => {
        if (res.data && res.data.deleted) {
          setPrices(
            prices.filter((p) => {
              return p.id !== price.id;
            })
          );
        } else {
          UIkit.notification({
            message: "Le tarif n'a pas été supprimé",
            status: "danger",
            pos: "top-center",
          });
        }
      })
      .catch(() =>
        UIkit.notification({
          message: "Impossible de supprimer ce tarif",
          status: "danger",
          pos: "top-center",
        })
      );
  };

  const handleDelete = (price: IPrice) => {
    UIkit.modal
      .confirm(`Êtes vous sûr de vouloir supprimer ${price.label}?`)
      .then(() => deletePrice(price));
  };

  const handleEdit = (price: IPrice) => {
    setEditPrice(price);
    setShowAddPriceModal(true);
  };

  // const sumDiscounts = () => {
  //   return bookings?.reduce((prev, curr) => {
  //     return prev + curr.discount;
  //   }, 0);
  // };

  return (
    <>
      {showAddPriceModal && (
        <Modal
          onClose={() => {
            setEditPrice(null);
            setShowAddPriceModal(false);
          }}
          title="Nouveau tarif"
        >
          <PriceForm onSuccess={onAddPriceSuccess} price={editPrice} />
        </Modal>
      )}
      {loadingFestival || loadingCompanies || loadingBookings ? (
        <Loading />
      ) : (
        <div className="uk-flex uk-flex-column -fullheight">
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h1 className="uk-heading-bullet uk-primary">
              {currentFestival?.name}
              {currentFestival?.isActive && (
                <label className="uk-label uk-margin-left">API</label>
              )}
            </h1>
            <div className="uk-flex uk-flex-middle">
              <button
                className="uk-button uk-button-primary uk-button-small"
                onClick={() => setShowAddPriceModal(true)}
              >
                Ajouter tarification
              </button>
              <span
                className="uk-icon-link uk-margin-left -pointer"
                uk-icon="server"
                uk-tooltip="Calculer les stats"
                uk-toggle="target: #toggle-numbers"
              />
              <span
                className="uk-icon-link uk-margin-left -pointer"
                uk-icon="cloud-upload"
                uk-tooltip="auto-sync"
              />
            </div>
          </div>
          <hr />
          <div id="toggle-numbers" hidden={true}>
            <div className="uk-flex uk-flex-wrap uk-flex-wrap-top">
              <Tile
                title="Sociétés contactées"
                body={"" + bookings?.length}
                percent={percent(bookings?.length!, companies?.length!)}
                color="default"
              />
              <Tile
                title="Factures payées"
                body={"" + countPaidBookings()}
                percent={percent(countPaidBookings()!, bookings?.length!)}
                color="secondary"
              />
              <Tile
                title="Exposants présents"
                body={"" + countPresent()}
                percent={percent(countPresent()!, bookings?.length!)}
                color="primary"
              />
              <Tile
                title="Exposants placés"
                body={"" + countPlaced()}
                percent={percent(countPlaced()!, bookings?.length!)}
                color="default"
              />
              <Tile
                title="Bénévoles"
                body={"" + sumVolunteers()}
                percent={percent(sumVolunteers()!, bookings?.length!)}
                color="secondary"
              />
            </div>
            <hr />
          </div>
          <div className="uk-flex uk-flex-wrap uk-flex-wrap-top">
            {prices
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((price, index) => {
                return (
                  <PriceCard
                    key={index}
                    price={price}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
