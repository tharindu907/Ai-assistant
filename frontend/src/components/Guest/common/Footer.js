import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
    return (
        <footer className="bg-[#0E295F] text-white py-4  pb-16 md:pb-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                {/* Company Info */}
                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-bold">HotelLogo</h2>
                    <p className="text-sm">Your comfort, our priority.</p>
                </div>

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                    <a href="/about" className="hover:text-gray-300">About Us</a>
                    <a href="/services" className="hover:text-gray-300">Services</a>
                    <a href="/contact" className="hover:text-gray-300">Contact</a>
                    <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FaFacebookF size={20} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FaTwitter size={20} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FaInstagram size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FaLinkedinIn size={20} />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-4 border-t border-gray-300 pt-2">
                <p className="text-sm">&copy; {new Date().getFullYear()} HotelLogo. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
