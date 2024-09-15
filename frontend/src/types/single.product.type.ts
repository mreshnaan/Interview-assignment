export type IProduct = {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: {
        id: string
        name: string
    }
}