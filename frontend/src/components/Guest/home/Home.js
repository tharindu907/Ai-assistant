import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import ImageCarousel from '../home/ImageCarousel';

// Import images from the assets folder
import foodandbeverageImg from '../../../assets/Food-and-Beverage.jpg';
import poolbookingImg from '../../../assets/pool.jpg';
import playareabookingImg from '../../../assets/play area.jpg';
import shuttlebookingImg from '../../../assets/shuttle sevice.jpg';

const HomePage = () => {
    const services = [
        { id: 1, name: 'Food & Beverage', description: 'Order food and other essentials directly to your room.', image: foodandbeverageImg },
        { id: 2, name: 'Pool Booking', description: 'Enjoy access to our pool during your stay.', image: poolbookingImg },
        { id: 3, name: 'Play Area Booking', description: 'Enjoy your day and make playful memories with your family.', image: playareabookingImg },
        { id: 4, name: 'Shuttle Booking', description: 'Travel comfortably with our shuttle service.', image: shuttlebookingImg },
    ];

    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            <ImageCarousel />
            
            {/* Our Services Section */}
            <div className="flex items-center justify-between p-4">
                <h1 className="text-white text-xl sm:text-3xl font-semibold italic">Our Services</h1>
                <a href="/user-reviews" className="text-white text-md sm:text-lg hover:text-gray-300">
                    User Reviews&gt;&gt;
                </a>
            </div>

            {/* Services Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                {services.map(service => (
                    <Link to={`/services/${service.id}`} key={service.id} className="block">
                        <div className="bg-white rounded-lg shadow-md p-4 w-84 h-96 flex flex-col justify-between hover:shadow-lg transition-shadow">
                            <img src={service.image} alt={service.name} className="w-full h-52 object-cover rounded-md mb-4" /> 
                            <h2 className="text-xl font-bold  text-customBlue">{service.name}</h2>
                            <p className="text-gray-600 mt-2 line-clamp-3 flex-grow">{service.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;
