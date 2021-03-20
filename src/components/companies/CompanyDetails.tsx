import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import { ICompany, IContact, IGame } from "../../utils/types";
import ContactsTable from "../Tables/Contacts";
import ContactModalForm from "../ContactModalForm";
import GamesTable from "../Tables/Games";
import GameModalForm from "../GameModalForm";

const CompanyDetails = (props: { id: string }) => {
  const [company, setCompany] = useState<ICompany>({
    id: "",
    name: "",
    address: "",
    isPublisher: true,
    isExhibitor: true,
    isActive: true,
    contacts: [],
    games: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [contactModalState, setContactModalState] = useState<boolean>(false);
  const [gameModalState, setGameModalState] = useState<boolean>(false);

  const instance = useAxios();

  useEffect(() => {
    instance
      .get(`/api/company/${props.id}`)
      .then((res) => {
        setCompany(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setRedirect(true);
      });
  }, [instance, props.id]);

  const addContact = (contact: IContact) => {
    setLoading(true);
    instance
      .post("/api/contact", contact)
      .then((res) => {
        let newCompany = company;
        newCompany.contacts = [...newCompany.contacts!, res.data];
        setCompany(newCompany);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const deleteContact = (contact: IContact) => {
    setLoading(true);
    instance
      .delete(`/api/contact/${contact.id}`)
      .then((res) => {
        let newCompany: ICompany = company;
        let removeIndex = newCompany.contacts.indexOf(contact);
        newCompany.contacts.splice(removeIndex, 1);
        setCompany(newCompany);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const switchContactModalState = (): void => {
    setContactModalState(!contactModalState);
  };

  const switchGameModalState = (): void => {
    setGameModalState(!gameModalState);
  };

  const editContact = (contact: IContact) => {
    console.log("edit: " + contact);
  };

  const switchContactIsPrimary = (contact: IContact) => {
    setLoading(true);
    instance
      .patch(`/api/contact/${contact.id!}`, { isPrimary: !contact.isPrimary })
      .then((res) => {
        let newCompany = company;
        newCompany.contacts!.forEach((element) => {
          if (element.id! === contact.id) {
            element.isPrimary = !element.isPrimary;
          }
        });
        setCompany(newCompany);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const switchGameIsPrototype = (game: IGame) => {
    console.log(`${game.name} toggled.`);
  };

  const addGame = (game: IGame): void => {
    setLoading(true);
    instance
      .post("/api/game", game)
      .then((res) => {
        let newCompany = company;
        newCompany.games = [...newCompany.games, res.data];
        setCompany(newCompany);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const editGame = (game: IGame) => {
    console.log(`${game.name} wants to be edited.`);
  };

  const deleteGame = (game: IGame) => {
    setLoading(true);
    instance
      .delete(`/api/game/${game.id}`)
      .then((res) => {
        let newCompany: ICompany = company;
        let removeIndex = newCompany.games.indexOf(game);
        newCompany.games.splice(removeIndex, 1);
        setCompany(newCompany);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  if (redirect) {
    return <Redirect to="/companies" />;
  } else {
    return (
      <div>
        {loading ? (
          "loading ..."
        ) : (
          <div>
            <h1>Company details</h1>
            <p>{company.name}</p>
            <p>{company.isActive ? "Actif" : "Inactif"}</p>
            <p>{company.isPublisher ? "Editeur" : "Non Editeur"}</p>
            <p>{company.isExhibitor ? "Exposant" : "Non Exposant"}</p>
            <div>
              <h3>Contacts</h3>
              <button
                className="uk-button uk-button-primary"
                onClick={switchContactModalState}
              >
                Ajout de contact
              </button>
              <ContactModalForm
                showModal={contactModalState}
                setShowModal={switchContactModalState}
                addContact={addContact}
                companyId={company.id!}
              />
              {company.contacts.length !== 0 ? (
                <ContactsTable
                  contacts={company.contacts!}
                  onEdit={editContact}
                  onDelete={deleteContact}
                  onToggle={switchContactIsPrimary}
                />
              ) : (
                <p>pas encore de contacts</p>
              )}
              <div>
                {company.isPublisher && (
                  <>
                    <h3>Jeux</h3>
                    <button
                      className="uk-button uk-button-primary"
                      onClick={switchGameModalState}
                    >
                      <GameModalForm
                        setShowModal={switchGameModalState}
                        showModal={gameModalState}
                        addGame={addGame}
                        companyId={company.id!}
                      />
                      Ajout jeu
                    </button>
                  </>
                )}
                {company.games.length !== 0 ? (
                  <GamesTable
                    games={company.games}
                    onEdit={editGame}
                    onDelete={deleteGame}
                    onToggle={switchGameIsPrototype}
                  />
                ) : (
                  <p>pas encore de jeux</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default CompanyDetails;
