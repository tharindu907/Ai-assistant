import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { useCart } from './context/CartContext';

const BillingPage = () => {
    const { orderTotal } = useCart();

    return (
        <div className="min-h-screen bg-gradient-to-b from-customBlueStart to-customBlueEnd flex flex-col">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            <div className="flex-grow container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto min-h-[500px]">
                    <h2 className="text-center text-2xl font-semibold text-customBlue mb-4">Total Bill</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-700">Room Charges</span>
                            <span className="text-gray-700">LKR 54000.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-700">Food & Beverages</span>
                            <span className="text-gray-700">LKR {orderTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-700">Pool Charges</span>
                            <span className="text-gray-700">LKR 3000.00</span>
                        </div>
                        <hr className="border-gray-300" />
                        <div className="flex justify-between font-semibold">
                            <span className="text-gray-700">Total</span>
                            <span className="text-gray-700">LKR {(54000 + orderTotal + 3000).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-700">Service Fee</span>
                            <span className="text-gray-700">LKR 3000.00</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span className="text-gray-700">Grand Total</span>
                            <span className="text-gray-700">LKR {(54000 + orderTotal + 3000 + 3000).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer className="mt-auto" />
        </div>
    );
};

export default BillingPage;
