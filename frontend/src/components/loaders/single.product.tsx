const ProductSkeleton: React.FC = () => (
    <div className="max-w-4xl text-left mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row animate-pulse">
        {/* Skeleton Image */}
        <div className="w-full h-60 bg-gray-300 md:w-1/2"></div>

        {/* Skeleton Content */}
        <div className="p-6 flex-1 space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);

export default ProductSkeleton;
