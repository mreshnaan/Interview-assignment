import { useParams } from 'react-router-dom';
import React from 'react';
import { IProduct } from '@/types/single.product.type';
import { IProductCard } from '@/types/product.card.type';
import { useQuery } from 'react-query';
import { fetchProductById } from '@/api-services/product';
import ProductSkeleton from '@/components/loaders/single.product';

// Product Card Component
const SingleProductCard: React.FC<IProductCard> = ({ id, name, price, description, image }) => {
    return (
        <div key={id} className="max-w-4xl text-left mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <img
                src={image}
                alt={name}
                className="w-full h-60 object-cover object-center md:w-1/2"
                loading="lazy"
            />
            <div className="p-6 flex-1">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">{name}</h2>
                <p className="text-xl text-gray-600 mb-4">${price.toFixed(2)}</p>
                <p className="text-gray-500">{description}</p>
            </div>
        </div>
    );
};

// Tailwind CSS Skeleton Loader


function ProductPage() {
    const { productId } = useParams();

    const { data, isLoading } = useQuery(['product', productId], () => fetchProductById(productId!), {
        enabled: !!productId,
    });

    const product: IProduct = data;

    return (
        <div className="py-8 px-4">
            {isLoading ? (
                <ProductSkeleton />
            ) : (
                <SingleProductCard
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    category={product.category.name}
                />
            )}
        </div>
    );
}

export default ProductPage;
