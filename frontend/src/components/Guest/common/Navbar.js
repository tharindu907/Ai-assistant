import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaList, FaReceipt, FaShoppingCart, FaBell } from 'react-icons/fa'; // Updated import
import userAvatar from '../../../assets/avatar.png'; // Replace with your avatar image path

const Navbar = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Guest'); // Default name

    useEffect(() => {
        // Fetch user data from the API or database
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user'); // Replace with your actual API endpoint
                const data = await response.json();
                setUserName(data.name || 'Guest');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            {/* Top Navbar with User Info */}
            <nav className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md md:hidden">
                <div className="flex items-center">
                    <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                    <span className="text-sm font-semibold">{userName}</span>
                </div>
                <div className="relative cursor-pointer" onClick={() => handleNavigation('/notifications')}>
                    <FaBell size={20} className="text-white" />
                    <span className="absolute -top-1 -right-2 text-xs bg-red-600 rounded-full px-1">3</span> {/* Notification count */}
                </div>
            </nav>

            {/* Desktop Navbar with Navigation */}
            <nav className="hidden md:flex bg-blue-600 text-white p-4 justify-between items-center shadow-md">
                <div className="text-2xl font-bold cursor-pointer" onClick={() => handleNavigation('/')}>
                    HotelLogo
                </div>
                <ul className="flex space-x-4">
                    <li className="hover:text-gray-300 cursor-pointer" onClick={() => handleNavigation('/home')}>
                        Home
                    </li>
                    <li className="hover:text-gray-300 cursor-pointer" onClick={() => handleNavigation('/profile')}>
                        Profile
                    </li>
                    <li className="hover:text-gray-300 cursor-pointer" onClick={() => handleNavigation('/activities')}>
                        Activities
                    </li>
                    <li className="hover:text-gray-300 cursor-pointer" onClick={() => handleNavigation('/cart')}>
                        Cart
                    </li>
                    <li className="hover:text-gray-300 cursor-pointer" onClick={() => handleNavigation('/billing')}>
                        Billing
                    </li>
                </ul>
                <div className="flex items-center space-x-2">
                    <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span className="font-medium">{userName}</span>
                    <div className="relative cursor-pointer" onClick={() => handleNavigation('/notifications')}>
                        <FaBell size={20} className="text-white" />
                        <span className="absolute -top-1 -right-2 text-xs bg-red-600 rounded-full px-1">3</span> {/* Notification count */}
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navbar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#0F447E] text-white shadow-lg flex items-center justify-between px-4 py-2 md:hidden">
                <button onClick={() => handleNavigation('/home')} className="flex flex-col items-center">
                    <FaHome size={20} />
                    <span className="text-xs">Home</span>
                </button>
                <button onClick={() => handleNavigation('/profile')} className="flex flex-col items-center">
                    <FaUser size={20} />
                    <span className="text-xs">Profile</span>
                </button>
                <button onClick={() => handleNavigation('/activities')} className="flex flex-col items-center">
                    <FaList size={20} />
                    <span className="text-xs">Activities</span>
                </button>
                <button onClick={() => handleNavigation('/cart')} className="flex flex-col items-center">
                    <FaShoppingCart size={20} />
                    <span className="text-xs">Cart</span>
                </button>
                <button onClick={() => handleNavigation('/billing')} className="flex flex-col items-center">
                    <FaReceipt size={20} />
                    <span className="text-xs">Billing</span>
                </button>
            </nav>
        </>
    );
}

export default Navbar;
