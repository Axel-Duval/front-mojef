/**
 * CONTACTS
 */
export interface ITableContacts {
  contacts: IContact[];
  onEdit: Function;
  onDelete: Function;
  onToggle: Function;
}
export interface IContact {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  companyId: string;
  isPrimary: boolean;
}

/**
 * HEADINGS
 */
export interface IHeading {
  title: string;
  subtitle: string;
}

/**
 * TIMELINE
 */
export interface ITimelineElement {
  datetime: string;
  body: string;
}

/**
 * COMPANIES
 */

export interface ITableCompanies {
  companies: IPartialCompany[];
}

export interface IPartialCompany {
  id?: string;
  name: string;
  address: string;
  isPublisher: boolean;
  isExhibitor: boolean;
  isActive: boolean;
}

export interface ICompany extends IPartialCompany {
  contacts: IContact[];
  games: IGame[];
}

/**
 * FESTIVALS
 */
export interface IFestival {
  id: string;
  name: string;
  date: Date;
  isActive: boolean;
}

/**
 * GAMES
 */

export interface IGame {
  id?: string;
  name: string;
  duration: string;
  minPlayers: number;
  maxPlayers: number;
  minAge: number;
  maxAge: number;
  isPrototype: boolean;
  publisherId: string;
  publisher?: ICompany;
  guideLink: string | null;
  type: string;
}

export interface ITableGames {
  games: IGame[];
  onEdit: Function;
  onDelete: Function;
  onToggle: Function;
}
