import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { IFilters } from '@/types/product.list.type';
import { ICategory } from '@/types/category.type';
import { Button } from './ui/button';

interface FilterBarProps {
    filters: IFilters;
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
    debouncedSetFilters: (newFilters: IFilters) => void;
    categories: ICategory[];
    setFiltersOpen: (open: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    filters,
    setFilters,
    debouncedSetFilters,
    categories,
    setFiltersOpen,
}) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.categoryIds ?? []);
    const [minPrice, setMinPrice] = useState<number | ''>(filters.minPrice ?? '');
    const [maxPrice, setMaxPrice] = useState<number | ''>(filters.maxPrice ?? '');
    const [priceError, setPriceError] = useState<string | null>(null);

    const updatePrice = (name: string, value: number | '') => {
        if (name === 'minPrice') {
            setMinPrice(value);
        } else if (name === 'maxPrice') {
            setMaxPrice(value);
        }
        validatePrice(name, value);
    };

    const validatePrice = (name: string, value: number | '') => {
        const min = name === 'minPrice' ? value : minPrice;
        const max = name === 'maxPrice' ? value : maxPrice;

        if (min !== '' && max !== '' && min > max) {
            setPriceError('Minimum price cannot be greater than maximum price');
        } else {
            setPriceError(null);
            setFilters(prev => ({ ...prev, [name]: value === '' ? undefined : value }));
            debouncedSetFilters({ ...filters, [name]: value === '' ? undefined : value });
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        const updatedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId];
        setSelectedCategories(updatedCategories);
        setFilters(prev => ({ ...prev, categoryIds: updatedCategories }));
        debouncedSetFilters({ ...filters, categoryIds: updatedCategories });
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setFiltersOpen(false)}
            />

            {/* Filter Bar as Popup */}
            <div className="fixed top-0 right-0 w-full sm:w-96 bg-white shadow-lg z-50 p-6 h-full transition-transform transform translate-x-0">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg">Filters</h3>
                    <button onClick={() => setFiltersOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-2">Categories</h4>
                    <div
                        className={`flex flex-col gap-2 ${categories.length > 10 ? 'max-h-60 overflow-y-auto' : ''}`}
                    >
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryChange(category.id)}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-gray-700">{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-2">Price Range</h4>
                    <div className="flex items-center space-x-4">
                        <Input
                            type="number"
                            name="minPrice"
                            placeholder="Min"
                            value={minPrice === '' ? '' : minPrice}
                            onChange={(e) => updatePrice('minPrice', parseFloat(e.target.value) || '')}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${priceError ? 'border-red-500' : ''}`}
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                            type="number"
                            name="maxPrice"
                            placeholder="Max"
                            value={maxPrice === '' ? '' : maxPrice}
                            onChange={(e) => updatePrice('maxPrice', parseFloat(e.target.value) || '')}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${priceError ? 'border-red-500' : ''}`}
                        />
                    </div>
                    {priceError && <p className="text-red-500 text-sm mt-2">{priceError}</p>}
                </div>

                {/* Apply Filters Button */}
                <div className="flex justify-end">
                    <Button onClick={() => setFiltersOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Close
                    </Button>
                </div>
            </div>
        </>
    );
};

export default FilterBar;
