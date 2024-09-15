import { useCallback } from 'react';
import { useQuery } from 'react-query';
import ProductList from '@/components/product/list/list';
import ProductListSkeleton from '@/components/loaders/product.list';
import { fetchProducts } from '@/api-services/product';
import { fetchCategories } from '@/api-services/category';
import PaginationControls from '@/components/pagination.controler';
import FilterBar from '@/components/filter.bar';
import { useProductContext } from '@/contexts/ProductContext';
import { IFilters } from '@/types/product.list.type';
import CreateProductModal from '@/components/modals/create.product.modal';

function ProductListPage() {
    const {
        filters,
        setFilters,
        debouncedFilters,
        setDebouncedFilters,
        modalOpen,
        setModalOpen,
        filtersOpen,
        setFiltersOpen,
    } = useProductContext();

    const { data: products = [], isLoading, refetch } = useQuery(['products', debouncedFilters], () => fetchProducts(debouncedFilters), {
        enabled: !!debouncedFilters
    });

    const { data: categories = [] } = useQuery('categories', fetchCategories);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        refetch();
    }, [refetch]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4">

            {/* Filter bar */}
            {filtersOpen && (
                <FilterBar
                    categories={categories}
                    setFilters={setFilters}
                    debouncedSetFilters={setDebouncedFilters}
                    filters={filters}
                    setFiltersOpen={setFiltersOpen}
                />
            )}
            <CreateProductModal modalOpen={modalOpen} setModalOpen={setModalOpen} categories={categories} handleCloseModal={handleCloseModal} />

            {isLoading ? (
                <ProductListSkeleton />
            ) : (
                <>
                    <ProductList products={products?.data ?? []} />
                    <PaginationControls
                        filters={filters}
                        totalPages={products?.pagination?.totalPages ?? 0}
                        onPageSizeChange={pageSize => {
                            setFilters((prev: IFilters) => ({ ...prev, pageSize, page: 1 }));
                            setDebouncedFilters({ ...filters, pageSize, page: 1 });
                        }}
                        onPageChange={newPage => {
                            setFilters((prev: IFilters) => ({ ...prev, page: newPage }));
                            setDebouncedFilters({ ...filters, page: newPage });
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default ProductListPage;
