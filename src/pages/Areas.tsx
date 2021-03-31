import { useContext, useEffect, useState } from "react";
import UIkit from "uikit";
import Loading from "../components/Loading";
import GamesTable from "../components/Tables/Games";
import { FestivalContext } from "../contexts/festival";
import { useAxios } from "../hooks/useAxios";
import { useForm } from "../hooks/useForm";
import { useGet } from "../hooks/useGet";
import { IArea, IGame } from "../utils/types";
import { required } from "../validators";

const Areas = () => {
  const axios = useAxios();
  const ctx = useContext(FestivalContext);

  ///////////////////
  // DATA FETCHING //
  ///////////////////

  const [areas, setAreas] = useState<IArea[]>([]);
  const [festival, loading, fetchErrored] = useGet<{ areas: IArea[] }>(
    `/api/festival/${ctx.currentFestival?.id}`
  );
  useEffect(() => {
    if (fetchErrored) {
      UIkit.notification({
        message: "Impossible de contacter le serveur",
        pos: "top-center",
        status: "danger",
      });
    }
  }, [fetchErrored]);

  useEffect(() => {
    if (festival) {
      setAreas(festival.areas);
    }
  }, [festival]);

  //////////////
  // CREATION //
  //////////////

  const [newAreaForm, formErrors] = useForm({
    label: {
      default: "",
      validators: [
        required(),
        (label: string) => {
          if (
            areas
              .map((a) => a.label.toLowerCase())
              .includes(label.toLowerCase())
          ) {
            return {
              unique: true,
            };
          }
          return null;
        },
      ],
    },
  });

  const createArea = (label: string) => {
    newAreaForm.label.set("");
    setAreas((areas) => [...areas, { label }]);

    const revert = () => {
      setAreas((areas) => {
        return areas.filter((a) => a.label === label);
      });
    };

    axios
      .post("/api/area", {
        label,
        festival: ctx.currentFestival!.id,
      })
      .then((res) => {
        if (res.status !== 201) {
          revert();
        } else {
          setAreas((areas) => {
            const newAreas = [...areas];
            const index = newAreas.findIndex((a) => a.label === label);
            newAreas[index].id = res.data.id;
            return newAreas;
          });
        }
      })
      .catch(() => revert());
  };

  //////////////
  // EDTITION //
  //////////////

  const [editedArea, setEditedArea] = useState<IArea>({
    label: "",
    id: "",
  });
  const [editAreaForm, editAreaErrors] = useForm({
    label: {
      default: "",
      validators: [
        required(),
        (label: string) => {
          if (
            areas
              .filter((a) => a.id !== editedArea.label)
              .map((a) => a.label.toLowerCase())
              .includes(label.toLowerCase())
          ) {
            return {
              unique: true,
            };
          }
          return null;
        },
      ],
    },
  });

  const startEditing = (area: IArea) => {
    editAreaForm.label.set(area.label);
    setEditedArea({ ...area });
  };

  const stopEditing = () => {
    setEditedArea({ label: "", id: "" });
  };

  const applyEdition = (forceEscape: boolean = false) => {
    const area = editedArea;
    const newLabel = editAreaForm.label.get();
    if (!area.id || !editAreaErrors.$form.valid) {
      if (forceEscape) {
        stopEditing();
      }
      return;
    }
    stopEditing();
    setAreas((areas) => {
      const newAreas = [...areas];
      const index = newAreas.findIndex((a) => a.id === area.id);
      newAreas[index].label = newLabel;
      return newAreas;
    });
    const revert = () => {
      UIkit.notification({
        message: "Impossible de mettre à jour le nom de la zone",
        pos: "top-center",
        status: "danger",
      });
      const currentLabel = area.label;
      setAreas((areas) => {
        const newAreas = [...areas];
        const index = newAreas.findIndex((a) => a.id === area.id);
        newAreas[index].label = currentLabel;
        return newAreas;
      });
    };
    axios
      .patch(`/api/area/${area.id}`, {
        label: newLabel,
      })
      .then((res) => {
        if (((res.status / 100) | 0) !== 2) revert();
      })
      .catch(() => revert());
  };

  //////////////
  // DELETION //
  //////////////

  const deleteArea = (area: IArea) => {
    if (!area.id) return;
    UIkit.modal
      .confirm(`Voulez-vous vraiment supprimer cette zone ?`)
      .then(() => {
        const revert = () => setAreas((areas) => [...areas, area]);
        if (activeArea?.id === area.id) {
          setActiveArea(null);
        }
        setAreas((areas) => areas.filter((a) => a.id !== area.id));
        axios
          .delete(`api/area/${area.id}`)
          .then((res) => {
            if (((res.status / 100) | 0) !== 2) {
              revert();
            }
          })
          .catch(() => revert());
      })
      .catch(() => {});
  };

  ///////////////
  // SELECTION //
  ///////////////

  const [activeArea, setActiveArea] = useState<IArea | null>(null);
  const [areaGames, setAreaGames] = useState<IGame[]>([]);
  const [gamesData, gamesLoading, gamesRetrieveErrored] = useGet<IGame[]>(
    `/api/game/byArea/${activeArea?.id}`,
    activeArea != null
  );

  const selectArea = (area: IArea) => {
    if (activeArea && activeArea.id === area.id) {
      setActiveArea(null);
    } else {
      setActiveArea(area);
    }
  };

  useEffect(() => {
    if (gamesData) {
      setAreaGames(
        gamesData.filter((value, index, games) => {
          for (let i = 0; i < index; i++) {
            if (games[i].id === value.id) {
              return false;
            }
          }
          return true;
        })
      );
    }
  }, [gamesData]);

  useEffect(() => {
    if (gamesRetrieveErrored) {
      UIkit.notification({
        message: "Impossible de récupérer les jeux de la zone sélectionnée",
        pos: "top-center",
        status: "danger",
      });
      setActiveArea(null);
    }
  }, [gamesRetrieveErrored]);

  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">Zones de jeux</h1>
        <div>
          <span
            className="uk-icon-link -pointer uk-margin-small-right"
            uk-icon="info"
            uk-tooltip="Selectionnez une zone pour voir les jeux qu'elle contient"
          />
          <span
            className="uk-icon-link -pointer"
            uk-icon="cloud-upload"
            uk-tooltip="auto-sync"
          />
        </div>
      </div>
      <hr />

      <div className="-fullheight">
        <div className="uk-flex -fullheight -booking-responsive">
          <div className="-flex-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (formErrors.$form.valid) {
                  createArea(newAreaForm.label.get());
                }
              }}
            >
              <label htmlFor="newArea" className="uk-form-label">
                Nouvelle zone
              </label>
              <div className="uk-form-controls">
                <input
                  id="newArea"
                  type="text"
                  className={
                    formErrors.label && formErrors.label.unique
                      ? "uk-input uk-width-medium uk-form-danger"
                      : "uk-input uk-width-medium"
                  }
                  placeholder="Aa"
                  disabled={loading}
                  value={newAreaForm.label.get()}
                  onChange={(e) => newAreaForm.label.set(e.target.value)}
                />
                {!formErrors.label && (
                  <span
                    className="uk-icon-link -pointer uk-margin-small-left"
                    uk-icon="check"
                    uk-tooltip="Appuyez sur entrer pour valider"
                  />
                )}
              </div>
            </form>
            <table className="uk-table uk-table-divider uk-table-small -noselect">
              <thead>
                <tr>
                  <th className="uk-table-expand">Label</th>
                  <th className="uk-table-shrink">actions</th>
                </tr>
              </thead>
              <tbody>
                {areas.map((area) => (
                  <tr
                    key={area.id || area.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectArea(area);
                    }}
                    className={
                      activeArea && activeArea.id === area.id
                        ? "active-area"
                        : ""
                    }
                  >
                    <td>
                      {area.label === editedArea.label ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            applyEdition();
                          }}
                        >
                          <input
                            className={
                              editAreaErrors.label &&
                              editAreaErrors.label.unique
                                ? "uk-input uk-form-width-medium uk-form-small uk-form-danger"
                                : "uk-input uk-form-width-medium uk-form-small"
                            }
                            type="text"
                            value={editAreaForm.label.get()}
                            onChange={(e) =>
                              editAreaForm.label.set(e.target.value)
                            }
                            onClick={(e) => e.stopPropagation()}
                            autoFocus={true}
                            onKeyDown={(e) => {
                              if (e.code === "Escape") {
                                stopEditing();
                              }
                            }}
                            onBlur={() => applyEdition(true)}
                          ></input>
                        </form>
                      ) : (
                        <>{area.label}</>
                      )}
                    </td>
                    <td>
                      {area.label === editedArea.label ? null : (
                        <>
                          <span
                            className="uk-icon-link -pointer uk-margin-small-right"
                            uk-icon="icon: file-edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(area);
                            }}
                          />
                          <span
                            className="uk-icon-link -pointer"
                            uk-icon="icon: trash"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteArea(area);
                            }}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className="uk-divider-vertical -fullheight uk-margin-medium-left uk-margin-medium-right" />
          <div className="-flex-1">
            {!activeArea ? (
              <div className="uk-padding-large -fullheight">
                <div className="uk-placeholder -fullwidth -fullheight uk-flex uk-flex-center uk-flex-middle">
                  Sélectionnez une zone pour voir les jeux s'y trouvant
                </div>
              </div>
            ) : gamesLoading ? (
              <Loading />
            ) : (
              <>
                <h2 className="uk-margin-medium-top">{activeArea.label}</h2>
                <GamesTable games={areaGames} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Areas;
