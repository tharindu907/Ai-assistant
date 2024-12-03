import React, { useState } from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import userAvatar from '../../assets/avatar.png';

const ProfilePage = () => {
    const [userData] = useState({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1 234 567 8900',
        bookings: [
            {
                service: 'Pool Booking',
                date: '15th March 2024',
                time: '2:00 PM - 4:00 PM',
                status: 'Confirmed'
            },
            {
                service: 'Shuttle Service',
                date: '16th March 2024',
                time: '10:00 AM',
                status: 'Pending'
            }
        ]
    });

    return (
        <div className="w-full">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col">
                <div className="flex-grow px-2 sm:px-6 lg:px-8"> {/* Adjust padding here for mobile */}
                    <div className="bg-opacity-40 bg-white rounded-lg p-4 sm:p-4 lg:p-4 my-4 sm:my-4 lg:my-10">
                        <h1 className="text-customBlue text-xl sm:text-2xl font-bold text-center">Profile</h1>

                        <div className="flex justify-center mt-4">
                            <img
                                src={userAvatar}
                                alt="Profile"
                                className="w-16 h-16 sm:w-20.5 sm:h-20.5 rounded-full object-cover border-4 border-customBlue"
                            />
                        </div>

                        <div className="mt-6 sm:mt-8 w-full max-w-md mx-auto">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex flex-col">
                                    <label className="text-customBlue font-semibold mb-1 sm:mb-2">Full Name</label>
                                    <h1 className="text-gray-700 text-base sm:text-lg font-medium break-words">{userData.fullName}</h1>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-customBlue font-semibold mb-1 sm:mb-2">Email</label>
                                    <h1 className="text-gray-700 text-base sm:text-lg font-medium break-words">{userData.email}</h1>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-customBlue font-semibold mb-1 sm:mb-2">Phone Number</label>
                                    <h1 className="text-gray-700 text-base sm:text-lg font-medium">{userData.phoneNumber}</h1>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-customBlue font-semibold mb-1 sm:mb-2 text-center w-full">My Bookings</label>
                                    <div className="bg-gray-100 rounded-lg shadow-md">
                                        <details className="p-3 sm:p-4">
                                            <summary className="cursor-pointer text-customBlue font-medium hover:text-blue-700 text-sm sm:text-base">
                                                Current Bookings
                                            </summary>
                                            <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                                                {userData.bookings.map((booking, index) => (
                                                    <div key={index} className="border-b pb-3 sm:pb-4">
                                                        <h3 className="font-semibold text-sm sm:text-base text-gr">{booking.service}</h3>
                                                        <p className="text-xs sm:text-sm text-gray-600">Date: {booking.date}</p>
                                                        <p className="text-xs sm:text-sm text-gray-600">Time: {booking.time}</p>
                                                        <p className="text-xs sm:text-sm text-gray-600">Status: {booking.status}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.href = '#';
                                    }}

                                    className="bg-white hover:bg-blue-200 text-customBlue font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out mx-auto block mt-8"
                                >
                                    Logout
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                <Footer className="mt-auto" />
            </div>
        </div>
    );
};

export default ProfilePage;
