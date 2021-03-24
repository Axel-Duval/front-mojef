import { useContext, useEffect, useState } from "react";
import UIkit from "uikit";
import CompanyModalForm from "../components/companies/CompanyModalForm";
import CompaniesTable from "../components/Tables/Companies";
import { FestivalContext } from "../contexts/festival";
import { useAxios } from "../hooks/useAxios";
import { useGet } from "../hooks/useGet";
import { ICompany, IPartialCompany } from "../utils/types";

const CompaniesPage = () => {
  const instance = useAxios();
  const currentFestivalId = useContext(FestivalContext).currentFestival?.id;
  const [companies, setCompanies] = useState<IPartialCompany[]>([]);
  const [addModal, setAddModal] = useState<boolean>(false);

  const [data, ,] = useGet<IPartialCompany[]>("/api/company");

  const [bookingsCompaniesId, setBookingsCompaniesId] = useState(new Array());

  useEffect(() => {
    instance
      .get(`/api/booking/festival/${currentFestivalId}`)
      .then((res) => {
        setBookingsCompaniesId(
          res.data.map((booking: any) => {
            return booking.companyId;
          })
        );
      })
      .catch(() => {
        UIkit.notification({
          message: `Impossible de récupérer les sociétés`,
          status: "danger",
          pos: "top-center",
        });
      });
  }, [instance, currentFestivalId]);

  useEffect(() => {
    if (data) {
      setCompanies(data);
    }
  }, [data]);

  const onAddSuccess = (company: IPartialCompany) => {
    setCompanies([...companies, company]);
    setAddModal(false);
  };

  const handleCreateBooking = (company: ICompany) => {
    instance
      .post("/api/booking", {
        company: company.id,
        needVolunteers: false,
        isPresent: false,
        isPlaced: false,
        notes: "",
        exchanges: "",
        discount: 0,
        fees: 0,
        createdOn: new Date(),
        festival: currentFestivalId!,
      })
      .then(() => {
        setBookingsCompaniesId([...bookingsCompaniesId, company.id]);
      })
      .catch(() => {
        UIkit.notification({
          message: `Impossible de commencer le suivi`,
          status: "danger",
          pos: "top-center",
        });
      });
  };

  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">Sociétés</h1>
        <div>
          <span
            className="uk-icon-link uk-margin-small-right -pointer"
            uk-icon="plus"
            onClick={() => setAddModal(true)}
            uk-tooltip="ajouter une nouvelle société"
          />
          <span
            className="uk-icon-link uk-margin-small-right -pointer"
            uk-icon="database"
            uk-tooltip="filter les sociétés"
            uk-toggle="target: #toggle-filter-companies"
          />
          <span
            className="uk-icon-link -pointer"
            uk-icon="cloud-upload"
            uk-tooltip="auto-sync"
          />
        </div>
      </div>
      <hr />
      <div id="toggle-filter-companies">
        <div className="uk-flex uk-flex-center uk-flex-middle">
          <input
            type="text"
            placeholder="Aa"
            className="uk-input uk-width-medium "
          />
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input className="uk-checkbox" type="checkbox" /> Editeur
          </label>
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input className="uk-checkbox" type="checkbox" /> Exposant
          </label>
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input className="uk-checkbox" type="checkbox" /> Actif
          </label>
        </div>
        <hr />
      </div>
      <CompanyModalForm
        showModal={addModal}
        setShowModal={setAddModal}
        onSuccess={onAddSuccess}
        companies={companies}
      />
      <CompaniesTable
        companies={companies}
        onCreateBooking={handleCreateBooking}
        bookingsCompaniesId={bookingsCompaniesId}
      />
    </div>
  );
};

export default CompaniesPage;
