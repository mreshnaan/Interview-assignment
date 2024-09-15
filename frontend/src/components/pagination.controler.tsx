import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PaginationControlsProps {
    filters: { page: number; pageSize: number };
    totalPages: number;
    onPageSizeChange: (value: number) => void;
    onPageChange: (newPage: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ filters, totalPages, onPageSizeChange, onPageChange }) => {
    const handlePageSizeChange = (value: string) => {
        onPageSizeChange(Number(value));
    };

    return (
        <div className='flex items-center gap-8 mt-4 mx-6'>
            <div className='flex items-center gap-2'>
                <Label className='uppercase text-[#517894]'>Page Size</Label>
                <Select onValueChange={handlePageSizeChange} defaultValue={filters.pageSize.toString()}>
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder={filters.pageSize.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex justify-between gap-4 items-center'>
                <button
                    disabled={filters.page <= 1}
                    onClick={() => onPageChange(filters.page - 1)}
                >
                    Previous
                </button>
                <span>Page {filters.page} of {totalPages === 0 ? 1 : totalPages}</span>
                <button
                    disabled={filters.page >= totalPages}
                    onClick={() => onPageChange(filters.page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;
