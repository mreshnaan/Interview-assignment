import Modal from '../ui/modal'
import ProductForm from '../product/form/form'
import { CreateProductModalProps } from '@/types/product.list.type'

const CreateProductModal: React.FC<CreateProductModalProps> = ({
    modalOpen,
    setModalOpen,
    handleCloseModal,
    categories,
}) => {
    return (
        <Modal
            isOpen={modalOpen}
            setOpen={setModalOpen}
            description="Create Product"
            title="Create Product"
        >
            <ProductForm onClose={handleCloseModal} categories={categories} />
        </Modal>
    )
}

export default CreateProductModal