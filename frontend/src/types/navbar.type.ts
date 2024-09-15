import { IFilters } from "./product.list.type";

export type TNavbar = {
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  debouncedSetFilters: (newFilters: IFilters) => void;
  handleOpenModal: () => void; 
};
