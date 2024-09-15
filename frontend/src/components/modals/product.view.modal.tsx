import ProductViewCard from '../product/cards/product.view.card'
import Modal from '../ui/modal'
import { IProductViewModal } from '@/types/product.card.type'

function ProductViewModal({ isOpen, setIsOpen, ...props }: IProductViewModal) {
  const { id, name, description, price, image, category } = props

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setIsOpen}
    >
      <ProductViewCard id={id} name={name} description={description} price={price} image={image} category={category} />
    </Modal>
  )
}

export default ProductViewModal