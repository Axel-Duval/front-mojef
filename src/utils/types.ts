/**
 * CONTACTS
 */
export interface ITableContacts {
  contacts: IContact[];
  onEdit?: Function;
  onDelete?: Function;
  onToggle?: Function;
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
 * BOOKINGS
 */
export interface ITableBookings {
  bookings: IBookingJoinCompany[];
}

export interface IBookingCreate {
  id?: string;
  notes: string;
  exchanges: string;
  needVolunteers: boolean;
  isPresent: boolean;
  isPlaced: boolean;
  discount: number;
  fees: number;
  createdOn: Date;
  billSentOn?: Date;
  billPaidOn?: Date;
  festival: string;
  company: string;
}

export interface IBooking {
  id?: string;
  notes: string;
  exchanges: string;
  needVolunteers: boolean;
  isPresent: boolean;
  isPlaced: boolean;
  discount: number;
  fees: number;
  createdOn: Date;
  billSentOn?: Date;
  billPaidOn?: Date;
  festival: string;
  companyId: string;
}

export interface IBookingJoinCompany {
  id?: string;
  notes: string;
  exchanges: string;
  needVolunteers: boolean;
  isPresent: boolean;
  isPlaced: boolean;
  discount: number;
  fees: number;
  createdOn: Date;
  billSentOn?: Date;
  billPaidOn?: Date;
  festival: string;
  company: ICompany;
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
  prices: IPrice[];
  areas: IArea[];
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
  guideLink?: string | null;
  type: string;
}

export interface ITableGames {
  games: IGame[];
  onEdit?: Function;
  onDelete?: Function;
  onToggle?: Function;
  showCompanies?: boolean;
}

/**
 * AREAS
 */

export interface IArea {
  label: string;
  id?: string;
}

/**
 * PRICES
 */
export interface IPrice {
  id: string;
  label: string;
  tableCount: number;
  floorCount: number;
  tablePrice: number;
  floorPrice: number;
  festivalId: string;
}

/**
 * USERS
 */
export interface IUser {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface IUserCreate {
  password: string;
  username: string;
  isAdmin: boolean;
}

export enum FilterState {
  ON = "on",
  OFF = "off",
  NONE = "none",
}
