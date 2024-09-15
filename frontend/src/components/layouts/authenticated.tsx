import { useProductContext } from '@/contexts/ProductContext';
import React, { useCallback } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../header/navbar';


const AuthenticatedLayout: React.FC = () => {
    const {
        filters,
        setFilters,
        setDebouncedFilters,
        setModalOpen,
        filtersOpen,
        setFiltersOpen,
    } = useProductContext();

    const handleOpenModal = useCallback(() => {
        setModalOpen(true);
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-full">
            {/* Header */}
            <Navbar
                filtersOpen={filtersOpen}
                setFiltersOpen={setFiltersOpen}
                setFilters={setFilters}
                debouncedSetFilters={setDebouncedFilters}
                filters={filters}
                handleOpenModal={handleOpenModal}
            />
            {/* Main Content */}
            <div className="flex-1">
                <Outlet />
            </div>

            {/* Footer */}
        </div>
    );
}

export default AuthenticatedLayout;
