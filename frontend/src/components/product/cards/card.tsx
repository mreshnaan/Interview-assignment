import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IProductCard } from "@/types/product.card.type";

import ProductViewModal from '@/components/modals/product.view.modal';

function ProductCard({ id, name, price, image, category, description }: IProductCard) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };



    return (
        <>
            <Card key={id} className="max-w-sm">
                <div className="bg-white overflow-hidden transition duration-300 hover:shadow-lg">
                    <img src={image} alt={name} className="w-full h-64 object-cover" loading="lazy" />
                    <div className="p-6">
                        <h3 className="font-light text-xl mb-2 text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{category}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-medium text-gray-900">${price}</p>
                            <Button
                                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                                onClick={handleOpenModal}
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            <ProductViewModal isOpen={isOpen} setIsOpen={setIsOpen} id={id} name={name} description={description} price={price} image={image} category={category} />

        </>
    );
}

export default ProductCard;