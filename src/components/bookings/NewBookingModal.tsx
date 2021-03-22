import React, { useContext } from "react";
import { FestivalContext } from "../../contexts/festival";
import { useForm } from "../../hooks/useForm";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";
import { IBooking, ICompany, IPartialCompany } from "../../utils/types";
import { minLength, required } from "../../validators";
import Modal from "../Modal";

interface INewBookingModal {
  show: boolean;
  onClose: Function;
}

const NewBookingModal = ({ show, onClose }: INewBookingModal) => {
  const currenFestivalId = useContext(FestivalContext).currentFestival?.id;
  const [form, formErrors] = useForm({
    needVolunteers: { default: false, validators: [] },
    isPresent: { default: false, validators: [] },
    isPlaced: { default: false, validators: [] },
    company: { default: null, validators: [required()] },
  });

  const [companies, isLoading, isErrored] = useGet<ICompany[]>("/api/company");

  const [booking, createBooking, loading, errored] = usePost<
    {
      company: string;
      needVolunteers: boolean;
      isPresent: boolean;
      isPlaced: boolean;
      notes: string;
      discount: number;
      fees: number;
      createdOn: Date;
      festival: string;
    },
    IBooking
  >("/api/booking");

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="uk-modal-title uk-margin-bottom uk-margin-medium-bottom -noselect">
        Nouvelle réservation
      </h2>
      <form
        className="uk-form-stacked -noselect"
        onSubmit={(e) => {
          e.preventDefault();
          createBooking({
            company: form.company.get(),
            needVolunteers: form.needVolunteers.get(),
            isPresent: form.isPresent.get(),
            isPlaced: form.isPlaced.get(),
            notes: "",
            discount: 0,
            fees: 0,
            createdOn: new Date(),
            festival: currenFestivalId!,
          });
        }}
      >
        <div className="uk-margin">
          {/* <label htmlFor="bookingCompany" className="uk-form-label">
            Société
          </label>
          <div className="uk-form-controls">
            <input
              className="uk-input"
              placeholder="Aa"
              id="bookingCompany"
              value={form.company.get()}
              onChange={(e) => form.company.set(e.target.value)}
            />
          </div> */}
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
          disabled={!formErrors.$form.valid || loading}
        >
          Enregistrer la réservation
        </button>
      </form>
    </Modal>
  );
};

export default NewBookingModal;
