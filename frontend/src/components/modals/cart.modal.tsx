import { useProductContext } from "@/contexts/ProductContext";
import Modal from "../ui/modal";
import { CartModalProps } from "@/types/cart.modal.types";
import { Button } from "../ui/button";
import { ShoppingCart, X } from "lucide-react";


const CartModal: React.FC<CartModalProps> = ({ isOpen, setIsOpen }) => {
    const { cart, removeFromCart, updateCartItemQuantity } = useProductContext();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Modal
            isOpen={isOpen}
            setOpen={setIsOpen}
            title="Your Cart"
        >
            <div className="mt-4">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                        <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" /> {/* Cart icon */}
                        <h1 className="text-2xl font-semibold text-gray-700">Your cart is empty</h1>
                        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet!</p>
                    </div>
                ) : (
                    <>
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center mb-4">
                                {/* Product Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                    loading="lazy"

                                />
                                <div className="flex-grow ml-4">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                                </div>
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-2"
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Total:</span>
                                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button className="w-full mt-4">
                            Checkout
                        </Button>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default CartModal