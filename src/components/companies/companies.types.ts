export interface Company {
  id?: string;
  name: string;
  address: string;
  isPublisher: boolean;
  isExhibitor: boolean;
  isActive?: boolean;
}
