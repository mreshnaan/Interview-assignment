import { IProduct } from "@/types/single.product.type";
import ProductCard from "../cards/card";
import { Frown } from "lucide-react";  // Import the Frown icon

interface ProductListProps {
    products: IProduct[];
}

function ProductList({ products }: ProductListProps) {
    return (
        products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
                <Frown className="w-16 h-16 text-gray-400" />
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-gray-700">No products found</p>
                    <p className="text-gray-500 mt-2">It looks like we don’t have any products to display at the moment.</p>
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id} 
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        image={product.image}
                        category={product.category.name}
                    />
                ))}
            </div>
        )
    );
}

export default ProductList;
