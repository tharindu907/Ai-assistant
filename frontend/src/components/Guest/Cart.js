import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from './context/CartContext';
import axios from 'axios';

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, setCart, setOrderTotal, orderTotal } = useCart();

    // Fetch cart from backend on page load
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/api/cart');
                setCart(response.data.items || []);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, [setCart]);

    // // Update cart in the backend
    // const updateCartBackend = async (updatedCart) => {
    //     try {
    //         await axios.post('/api/cart/update', { items: updatedCart });
    //     } catch (error) {
    //         console.error('Error updating cart:', error);
    //     }
    // };

    // // Increment item quantity
    // const handleIncrement = async (id) => {
    //     const updatedCart = cart.map((item) =>
    //         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    //     );
    //     setCart(updatedCart);
    //     updateCartBackend(updatedCart); // Sync with backend
    // };

    // // Decrement item quantity
    // const handleDecrement = async (id) => {
    //     const updatedCart = cart.map((item) =>
    //         item.id === id && item.quantity > 1
    //             ? { ...item, quantity: item.quantity - 1 }
    //             : item
    //     );
    //     setCart(updatedCart);
    //     updateCartBackend(updatedCart); // Sync with backend
    // };

    // // Remove item from cart
    // const handleRemove = async (id) => {
    //     const updatedCart = cart.filter((item) => item.id !== id);
    //     setCart(updatedCart);
    //     updateCartBackend(updatedCart); // Sync with backend
    // };

    // // Continue shopping
    // const handleContinueShopping = () => {
    //     navigate('/services/1'); // Navigate to FoodAndBeverageDetail
    // };

    // // Place order and clear cart
    // const handlePlaceOrder = async () => {
    //     try {
    //         const currentTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    //         await axios.post('/api/cart/place-order', { items: cart, total: currentTotal });
    //         setOrderTotal(orderTotal + currentTotal); // Accumulate order total
    //         setCart([]); // Clear the cart in state
    //         alert('Your order has been placed successfully!');
    //     } catch (error) {
    //         console.error('Error placing order:', error);
    //         alert('Failed to place order. Please try again.');
    //     }
    // };

    const handleIncrement = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const handleContinueShopping = () => {
        navigate('/services/1'); // Navigate to FoodAndBeverageDetail
    };

    const handlePlaceOrder = () => {
        const currentTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setOrderTotal(orderTotal + currentTotal); // Accumulate the order total
        setCart([]); // Clear the cart
        setTimeout(() => {
            alert('Your order has been accepted!');
        }, 1000);
    };

    // Calculate total items and price
    const totalItems = cart.length;
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col">
            <div className="sticky top-0 z-50">
                <Navbar cartItemCount={totalItems} />
            </div>

            <div className="flex-grow container mx-auto p-4 ">
                <h2 className="text-center text-white text-xl sm:text-2xl mb-4">Your Cart</h2>
                <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto h-[500px] flex flex-col justify-between">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-700 text-sm sm:text-base">Your cart is empty.</p>
                    ) : (
                        <div className="overflow-y-auto">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b py-2">
                                    <span className="text-customBlue font-semibold text-sm sm:text-base">{item.name}</span>
                                    <div className="flex items-center">
                                        <span className="text-gray-700 text-xs sm:text-base mr-4">LKR {item.price * item.quantity}</span>
                                        <button onClick={() => handleDecrement(item.id)} className="text-red-500 mx-1 text-xs sm:text-base">
                                            <FaMinus />
                                        </button>
                                        <span className="text-gray-700 text-xs sm:text-base mx-2">{item.quantity}</span>
                                        <button onClick={() => handleIncrement(item.id)} className="text-green-500 mx-1 text-xs sm:text-base">
                                            <FaPlus />
                                        </button>
                                        <button onClick={() => handleRemove(item.id)} className="text-gray-500 ml-4 text-xs sm:text-base">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {cart.length > 0 && (
                        <div className="mt-4 text-xs sm:text-base">
                            <button onClick={handleContinueShopping} className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg w-full mb-2">
                                Continue Shopping
                            </button>
                            <button onClick={handlePlaceOrder} className="bg-gradient-to-r from-customBlueStart to-customBlueEnd text-white py-2 px-4 rounded-lg w-full flex justify-between">
                                <span>Place Order</span>
                                <span>LKR {totalPrice}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer className="mt-auto" />
        </div>
    );
};

export default CartPage;
