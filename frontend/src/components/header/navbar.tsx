import { TNavbar } from '@/types/navbar.type'
import { Filter, LogOutIcon, Search, ShoppingBag, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useProductContext } from '@/contexts/ProductContext';
import CartModal from '../modals/cart.modal';
import { useAuth } from '@/contexts/AuthContext';



const Navbar: React.FC<TNavbar> = ({ filters, setFilters, debouncedSetFilters, filtersOpen, setFiltersOpen, handleOpenModal }) => {
    const { logout } = useAuth();
    const { cart } = useProductContext();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setFilters(prev => ({ ...prev, query }));
        debouncedSetFilters({ ...filters, query });
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-light text-gray-900">Interview Assignment</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search products"
                            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.query}
                            onChange={handleSearchChange}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <Button
                        variant={"ghost"}
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="text-gray-600 hover:text-gray-900 transition duration-300 flex items-center"
                    >
                        <Filter size={20} className="mr-2" />
                        Filters
                    </Button>
                    <Button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition duration-300 flex items-center" onClick={handleOpenModal}>
                        <ShoppingBag size={20} className="mr-2" />
                        Create Product
                    </Button>
                    <Button
                        variant={"ghost"}
                        className="relative"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart size={24} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Button>
                    <Button variant={"outline"} className="text-black px-6 py-2 rounded-full  transition duration-300 flex items-center" onClick={logout}>
                        <LogOutIcon size={20} className="mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
            <CartModal isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        </header>
    )
}

export default Navbar;