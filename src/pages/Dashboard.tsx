import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import PriceCard from "../components/PriceCard";
import Tile from "../components/Tile";
import { FestivalContext } from "../contexts/festival";
import { useAxios } from "../hooks/useAxios";
import { useGet } from "../hooks/useGet";
import { IBooking, IPartialCompany } from "../utils/types";

const Dashboard = () => {
  const instance = useAxios();
  const currentFestival = useContext(FestivalContext).currentFestival;
  const [companies, loadingCompanies] = useGet<IPartialCompany[]>(
    "/api/company"
  );
  const [bookings, loadingBookings] = useGet<IBooking[]>(
    `/api/booking/festival/${currentFestival?.id}`
  );

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

  // const sumDiscounts = () => {
  //   return bookings?.reduce((prev, curr) => {
  //     return prev + curr.discount;
  //   }, 0);
  // };

  return (
    <>
      {loadingCompanies || loadingBookings ? (
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
                onClick={() => console.log("ajouter tarification")}
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
          <div>
            <PriceCard />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
