import { ICategory } from "./category.type";

export type IFilters = {
  query: string | undefined;
  categoryIds: string[] | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  page: number;
  pageSize: number;
};

export interface CreateProductModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal: () => void;
  categories: Array<ICategory>;
}
