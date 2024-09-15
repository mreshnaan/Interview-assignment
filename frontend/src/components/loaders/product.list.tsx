
const ProductListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="animate-pulse flex flex-col space-y-4">
                    <div className="bg-gray-200 h-32 rounded-md"></div>
                </div>
            ))}
        </div>
    );
};

export default ProductListSkeleton;
