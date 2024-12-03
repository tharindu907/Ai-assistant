import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const PlayAreaBookingPage = () => {
    const { state } = useLocation();
    const { game } = state || {};
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM'
    ];

    const toggleTimeDropdown = () => {
        setIsTimeDropdownOpen(!isTimeDropdownOpen);
    };

    const handleTimeSelect = (time) => {
        if (time === 'Select a time slot') {
            setTime('');
        } else {
            setTime(time);
        }
        setIsTimeDropdownOpen(false);
    };

    const handleConfirmReservation = () => {
        if (date && time && guests) {
            setIsClicked(true);
            alert('Reservation confirmed!');
        } else {
            alert('Please fill all fields.');
        }
    };

    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold text-center text-white mb-6">{game?.gameName} Booking</h1>
                <div className="flex justify-center mb-6">
                    <img src={game?.image} alt={game?.gameName} className="w-32 h-32 rounded-full" />
                </div>
                <div className="flex flex-col justify-center items-center space-y-6 w-full max-w-md mx-auto">
                    <input
                        type="date"
                        className="w-full p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <div className="relative w-full">
                        <button
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-left bg-gray-100"
                            onClick={toggleTimeDropdown}
                        >
                            {time || 'Select a time slot'}
                        </button>
                        {isTimeDropdownOpen && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg max-h-36 overflow-y-auto">
                                <li
                                    className="p-3 text-gray-500 cursor-pointer"
                                    onClick={() => handleTimeSelect('Select a time slot')}
                                >
                                    Select a time slot
                                </li>
                                {timeSlots.map((slot, index) => (
                                    <li
                                        key={index}
                                        className="p-1 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleTimeSelect(slot)}
                                    >
                                        {slot}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <span className="absolute right-3 top-3 text-gray-500">
                            ⏰
                        </span>
                    </div>
                    <input
                        type="number"
                        className="w-full p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
                        placeholder="Number of Guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        min="1"
                        max="11"
                    />
                    <button
                        className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg border-2 border-white transition duration-300 ${
                            isClicked ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-blue-800'
                        }`}
                        onClick={handleConfirmReservation}
                        disabled={isClicked}
                    >
                        Confirm Reservation
                    </button>
                </div>
            </div>

            <Footer className="mt-auto" />
        </div>
    );
};

export default PlayAreaBookingPage;
