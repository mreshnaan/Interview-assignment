export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
}

export let products: IProduct[] = [];