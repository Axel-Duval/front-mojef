import { useContext, useEffect, useState } from "react";
import UIkit from "uikit";
import CompaniesFilter from "../components/companies/CompaniesFilter";
import CompanyForm from "../components/companies/CompanyForm";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import CompaniesTable from "../components/Tables/Companies";
import { FestivalContext } from "../contexts/festival";
import { useAxios } from "../hooks/useAxios";
import { useGet } from "../hooks/useGet";
import { ICompany, IPartialCompany } from "../utils/types";

const CompaniesPage = () => {
  const instance = useAxios();
  const currentFestivalId = useContext(FestivalContext).currentFestival?.id;
  const [companies, setCompanies] = useState<IPartialCompany[]>(new Array());
  const [modalState, setModalState] = useState<boolean>(false);
  const [data, loading] = useGet<IPartialCompany[]>("/api/company");
  const [bookingsCompaniesId, setBookingsCompaniesId] = useState(new Array());
  const [useFilter, setUseFilter] = useState(false);
  const [filters, setFilters] = useState<{
    input: string;
    exhibitor: boolean | null;
    publisher: boolean | null;
    followed: boolean | null;
    active: boolean | null;
  }>({
    input: "",
    exhibitor: null,
    publisher: null,
    followed: null,
    active: null,
  });

  const filteredCompanies = (companies: IPartialCompany[]) => {
    return companies.filter((company) => {
      if (useFilter) {
        return (
          company.name.toLowerCase().includes(filters.input.toLowerCase()) &&
          (filters.exhibitor === null ||
            company.isExhibitor === filters.exhibitor) &&
          (filters.publisher === null ||
            company.isPublisher === filters.publisher) &&
          (filters.followed === null ||
            bookingsCompaniesId.includes(company.id!) === filters.followed) &&
          (filters.active === null || company.isActive === filters.active)
        );
      } else {
        return company;
      }
    });
  };

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
          message: `Impossible de récupérer les sociétés du festival courant.`,
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
    setModalState(false);
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
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="uk-flex uk-flex-column -fullheight">
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h1 className="uk-heading-bullet">Sociétés</h1>
            <div>
              <span
                className="uk-icon-link uk-margin-small-right -pointer"
                uk-icon="plus"
                onClick={() => setModalState(true)}
                uk-tooltip="ajouter une nouvelle société"
              />
              <span
                className="uk-icon-link uk-margin-small-right -pointer"
                uk-icon="database"
                uk-tooltip="filter les sociétés"
                onClick={() => setUseFilter(!useFilter)}
              />
              <span
                className="uk-icon-link -pointer"
                uk-icon="cloud-upload"
                uk-tooltip="auto-sync"
              />
            </div>
          </div>
          <hr />
          <div id="toggle-filter-companies" hidden={!useFilter}>
            <CompaniesFilter setFilters={setFilters} />
            <hr />
          </div>
          {modalState && (
            <Modal
              onClose={() => setModalState(false)}
              title="Ajouter une société."
            >
              <CompanyForm onSuccess={onAddSuccess} companies={companies} />
            </Modal>
          )}
          <CompaniesTable
            companies={filteredCompanies(companies)}
            onCreateBooking={handleCreateBooking}
            bookingsCompaniesId={bookingsCompaniesId}
          />
        </div>
      )}
    </>
  );
};

export default CompaniesPage;
