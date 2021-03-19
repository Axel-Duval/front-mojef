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
  firstname: string;
  lastname: string;
  phone: string;
  company: string;
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
export interface ICompany {
  id?: string;
  name: string;
  address: string;
  isPublisher: boolean;
  isExhibitor: boolean;
  isActive?: boolean;
}
