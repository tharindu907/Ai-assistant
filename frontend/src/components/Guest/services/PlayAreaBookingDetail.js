import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import rifleIMG from '../../../assets/rifle.jpg';
import ArcheryIMG from '../../../assets/archery.jpg';
import { useNavigate } from 'react-router-dom';

const PlayAreaBookingDetail = () => {
    const navigate = useNavigate();

    const gameDetails = [
        {
            gameName: 'Rifle Shooting',
            shortDescription: 'Sharpen your focus and aim with an exciting round of rifle shooting.',
            details: 'Game Type: Outdoor\nMin. Players: 1 player minimum\nDifficulty: Challenging',
            prices: '3600',
            image: rifleIMG // Replace with actual image path
        },
        {
            gameName: 'Archery',
            shortDescription: 'Test your accuracy and skill with a thrilling session of archery.',
            details: 'Game Type: Outdoor \nMin. Players: 1 player minimum \nDifficulty: Challenging.',
            prices: '4600',
            image: ArcheryIMG
        },
        {
            gameName: 'Rifle Shooting',
            shortDescription: 'Sharpen your focus and aim with an exciting round of rifle shooting.',
            details: 'Game Type: Outdoor\nMin. Players: 1 player minimum\nDifficulty: Challenging',
            prices: '3600',
            image: rifleIMG // Replace with actual image path
        }
        // Add more games if needed
    ];

    const handleBookNow = (game) => {
        navigate('/services/play-area-booking', { state: { game } });
    };

    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold text-center text-white mb-6">Play Area Games</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {gameDetails.map((game, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4">
                            <img src={game.image} alt={game.gameName} className="w-full h-48 object-cover rounded-t-lg" />
                            <h2 className="text-xl font-bold mt-4">{game.gameName}</h2>
                            <p className="mt-2">{game.shortDescription}</p>
                            <p className="mt-2 whitespace-pre-line">{game.details}</p>
                            <ul className="mt-2">
                                <li>Price: LKR {game.prices} per Person</li>
                            </ul>
                            <div className="flex justify-center">
                                <button 
                                    className="mt-4 bg-gradient-to-r from-customBlueStart to-customBlueEnd text-white py-2 px-4 rounded-full"
                                    onClick={() => handleBookNow(game)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer className="mt-auto" />
        </div>
    );
};

export default PlayAreaBookingDetail;
