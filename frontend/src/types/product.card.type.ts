export type IProductCard = {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
}

export interface IProductViewModal extends IProductCard {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type IProductViewCard = IProductCard;
