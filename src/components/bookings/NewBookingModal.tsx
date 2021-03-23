import { useContext } from "react";
import UIkit from "uikit";
import { FestivalContext } from "../../contexts/festival";
import { useAxios } from "../../hooks/useAxios";
import { useForm } from "../../hooks/useForm";
import { useGet } from "../../hooks/useGet";
import { IBooking, ICompany } from "../../utils/types";
import { required } from "../../validators";
import Modal from "../Modal";

interface INewBookingModal {
  onClose: Function;
  handleSuccess: Function;
}

const NewBookingModal = ({ onClose, handleSuccess }: INewBookingModal) => {
  const instance = useAxios();
  const currentFestivalId = useContext(FestivalContext).currentFestival?.id;
  const [form, formErrors] = useForm({
    needVolunteers: { default: false, validators: [] },
    isPresent: { default: false, validators: [] },
    isPlaced: { default: false, validators: [] },
    company: { default: null, validators: [required()] },
  });

  const [companies, ,] = useGet<ICompany[]>("/api/company");

  const onSubmit = (booking: IBooking) => {
    instance
      .post("/api/booking", booking)
      .then((res) => {
        console.log(res);
        handleSuccess(res.data);
      })
      .catch(() => {
        UIkit.notification({
          message: `Impossible de créer le suivi`,
          status: "danger",
          pos: "top-center",
        });
      });
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="uk-modal-title uk-margin-bottom uk-margin-medium-bottom -noselect">
        Nouvelle réservation
      </h2>
      <form
        className="uk-form-stacked -noselect"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            company: form.company.get(),
            needVolunteers: form.needVolunteers.get(),
            isPresent: form.isPresent.get(),
            isPlaced: form.isPlaced.get(),
            notes: "",
            exchanges: "",
            discount: 0,
            fees: 0,
            createdOn: new Date(),
            festival: currentFestivalId!,
          });
        }}
      >
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="bookingCompany">
            Société
          </label>
          <div className="uk-form-controls">
            <select
              className="uk-select"
              id="bookingCompany"
              onChange={(e) => form.company.set(e.target.value)}
            >
              <option value="">-</option>
              {companies &&
                companies.map((company, index) => {
                  return (
                    <option key={index} value={company.id}>
                      {company.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="uk-margin uk-flex uk-flex-between uk-margin-medium-top">
          <label>
            <input
              className="uk-checkbox"
              type="checkbox"
              checked={form.needVolunteers.get()}
              onChange={() =>
                form.needVolunteers.set(!form.needVolunteers.get())
              }
            />{" "}
            Volontaires
          </label>
          <label>
            <input
              className="uk-checkbox"
              type="checkbox"
              checked={form.isPlaced.get()}
              onChange={() => form.isPlaced.set(!form.isPlaced.get())}
            />{" "}
            Placé
          </label>
          <label>
            <input
              className="uk-checkbox"
              type="checkbox"
              checked={form.isPresent.get()}
              onChange={() => form.isPresent.set(!form.isPresent.get())}
            />{" "}
            Présent
          </label>
        </div>
        <button
          type="submit"
          className="uk-button uk-button-primary uk-align-center"
          disabled={!formErrors.$form.valid}
        >
          Enregistrer la réservation
        </button>
      </form>
    </Modal>
  );
};

export default NewBookingModal;
