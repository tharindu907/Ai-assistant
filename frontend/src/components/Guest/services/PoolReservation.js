import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import pool2IMG from '../../../assets/pool 2.jpg';

const PoolReservation = () => {
    const [date, setDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

    const timeSlots = Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 || 12;
        const ampm = i < 12 ? 'AM' : 'PM';
        return `${hour}:00 ${ampm}`;
    });

    const guestOptions = [1, 2, 3, 4];

    const toggleTimeDropdown = () => {
        setIsTimeDropdownOpen(!isTimeDropdownOpen);
    };

    const toggleGuestDropdown = () => {
        setIsGuestDropdownOpen(!isGuestDropdownOpen);
    };

    const handleTimeSelect = (time) => {
        if (time === 'Select Time') {
            setSelectedTime('');
        } else {
            setSelectedTime(time);
        }
        setIsTimeDropdownOpen(false);
    };

    const handleGuestSelect = (guest) => {
        setNumberOfGuests(guest);
        setIsGuestDropdownOpen(false);
    };

    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col"> {/* Flex container */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="flex-grow">
                <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd p-6 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                        <h1 className="text-3xl font-bold text-center text-customBlue mb-6">Book Swimming Pool</h1>
                        <img
                            src={pool2IMG}
                            alt="Pool"
                            className="w-full h-auto max-h-60 object-cover rounded-lg mb-6"
                        />
                        <div className="space-y-6">
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-customBlue transition duration-300"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <button
                                    className="w-full p-3 shadow-md border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue text-left"
                                    onClick={toggleTimeDropdown}
                                >
                                    {selectedTime || 'Select Time'}
                                </button>
                                {isTimeDropdownOpen && (
                                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg max-h-36 overflow-y-auto">
                                        <li
                                            className="p-3 text-gray-500 cursor-pointer"
                                            onClick={() => handleTimeSelect('Select Time')}
                                        >
                                            Select Time
                                        </li>
                                        {timeSlots.map((time, index) => (
                                            <li
                                                key={index}
                                                className="p-1 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => handleTimeSelect(time)}
                                            >
                                                {time}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <span className="absolute right-3 top-3 text-gray-500">
                                    ⏰
                                </span>
                            </div>
                            <div className="relative mt-4">
                                <button
                                    className="w-full p-3 shadow-md border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue text-left"
                                    onClick={toggleGuestDropdown}
                                >
                                    {numberOfGuests || 'Select Guests'}
                                </button>
                                {isGuestDropdownOpen && (
                                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg max-h-36 overflow-y-auto">
                                        <li
                                            className="p-1 text-gray-500 cursor-default"
                                            onClick={() => setIsGuestDropdownOpen(false)}
                                        >
                                            Select Guests
                                        </li>
                                        {guestOptions.map((guest, index) => (
                                            <li
                                                key={index}
                                                className="p-1 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => handleGuestSelect(guest)}
                                            >
                                                {guest}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <span className="absolute right-3 top-3 text-gray-500">
                                    👥
                                </span>
                            </div>
                            <button className="w-full bg-customBlue text-white py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
                                Confirm Pool Reservation
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer className="mt-auto" /> {/* Pushes the footer to the bottom */}
        </div>
    );
};

export default PoolReservation;
