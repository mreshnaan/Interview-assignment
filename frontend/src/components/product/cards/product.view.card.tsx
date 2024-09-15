import { Button } from '@/components/ui/button'
import { useProductContext } from '@/contexts/ProductContext'
import { IProductViewCard } from '@/types/product.card.type';
import { Badge, ShoppingCart, Star } from 'lucide-react'

function ProductViewCard({ ...props }: IProductViewCard) {
    const { id, name, description, price, image, category } = props
    const { addToCart } = useProductContext();

    const handleAddToCart = () => {
        addToCart({ id, name, price, image, category, description });
    };
    return (
        <div key={id} className="mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img
                        className="h-96 w-full object-cover md:w-96"
                        src={image}
                        alt={name}
                        loading="lazy"

                    />
                </div>
                <div className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge className="mb-2">{category}</Badge>
                            <h2 className="block mt-1 text-3xl leading-tight font-semibold text-gray-900">{name}</h2>
                        </div>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                            <span className="ml-2 text-gray-600">(4.5)</span>
                        </div>
                    </div>
                    <p className="mt-2 text-xl font-bold text-gray-900">${price.toFixed(2)}</p>
                    <p className="mt-4 text-gray-500">{description}</p>
                    <div className="mt-6 flex items-center">
                        <Button
                            className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductViewCard