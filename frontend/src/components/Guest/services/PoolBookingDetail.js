import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import pool2IMG from '../../../assets/pool 2.jpg';
import { useNavigate } from 'react-router-dom';

const mockPoolDetails = {
    title: "Book Swimming Pool",
    image: pool2IMG, // Replace with your image path
    description: "Take a refreshing dip in our crystal-clear swimming pool. Whether you're swimming laps or relaxing by the water, the pool is perfect for a leisurely escape.",
    type: "Outdoor",
    maxGuests: 8,
    timeSlots: "1-hour intervals",
    depth: "1.2m to 2.0m",
    features: "Lounge chairs, towels provided, shallow and deep ends",
    price: "$50 per hour"
};

const PoolBookingDetail = () => {
    const navigate = useNavigate();
    const poolDetails = mockPoolDetails; // Directly assign mockPoolDetails

    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            <div className="p-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-4 text-customBlue">{poolDetails.title}</h1>
                    <img 
                        src={poolDetails.image} 
                        alt="Pool" 
                        className="w-full h-auto max-h-96 object-cover rounded-lg mb-4" 
                    />
                    <p className="text-gray-700 mb-4">{poolDetails.description}</p>
                    <div className="text-gray-600">
                        <p className="font-semibold">Details:</p>
                        <ul className="list-disc list-inside">
                            <li>Pool Type: {poolDetails.type}</li>
                            <li>Max. Guests: {poolDetails.maxGuests} guests per reservation</li>
                            <li>Time Slots: {poolDetails.timeSlots}</li>
                            <li>Pool Depth: {poolDetails.depth}</li>
                            <li>Price: {poolDetails.price}</li>
                            <li>Pool Features: {poolDetails.features}</li>
                        </ul>
                    </div>
                    <button 
                        className="mt-4 bg-gradient-to-r from-customBlueStart to-customBlueEnd text-white py-2 px-4 rounded-xl w-1/2 mx-auto block transform transition duration-200 hover:scale-105 active:scale-95"
                        onClick={() => navigate('/services/pool-reservation')}
                    >
                        Book Now
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PoolBookingDetail;
