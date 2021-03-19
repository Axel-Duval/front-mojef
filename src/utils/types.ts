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
  companies: ICompany[];
}
export interface ICompany {
  id?: string;
  name: string;
  address: string;
  isPublisher: boolean;
  isExhibitor: boolean;
  isActive?: boolean;
  contacts?: IContact[];
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
