import React, { useState, useEffect } from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import userAvatar from '../../assets/avatar.png';
import poolIMG from '../../assets/pool.jpg';

const UserReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // useEffect(() => {
    //     // Fetch reviews from the backend
    //     fetch('/api/reviews') // Adjust the endpoint as needed
    //         .then(response => response.json())
    //         .then(data => setReviews(data))
    //         .catch(error => console.error('Error fetching reviews:', error));
    // }, []);

    useEffect(() => {
        // Temporary mock data
        const mockReviews = [
            {
                userName: 'Clara T.',
                userImage: userAvatar,
                date: '4 weeks ago',
                comment: 'Loved the convenience of ordering room service through the app. Great stay overall!',
                rating: 4
            },
            {
                userName: 'Jane Smith',
                userImage: userAvatar,
                date: '2 weeks ago',
                comment: 'The app made everything so easy. Highly recommend!',
                rating: 5
            },
            {
                userName: 'Alice Johnson',
                userImage: userAvatar,
                date: '1 month ago',
                comment: 'Good service, but the app could be more user-friendly.',
                rating: 3,
                images: [
                    poolIMG,
                    poolIMG,
                    poolIMG, poolIMG, poolIMG, poolIMG, poolIMG
                ]
            }
        ];

        // Set the mock data
        setReviews(mockReviews);
    }, []);

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            
            <div className="flex-grow p-4 flex justify-center">
                <div className="bg-opacity-50 bg-blue-300 p-4 rounded-lg shadow-xl max-w-md w-full space-y-4">
                    <h2 className="text-center text-white text-xl mb-4">Rate and Reviews</h2>
                    
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex items-center mb-2">
                                <img src={review.userImage} alt={review.userName} className="w-10 h-10 rounded-full mr-2" />
                                <div>
                                    <h3 className="text-sm font-bold">{review.userName}</h3>
                                    <p className="text-xs text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            <p className="text-sm mb-2">{review.comment}</p>
                            
                            {review.images && review.images.length > 0 && (
                                <div className="mb-2 flex space-x-2 overflow-x-auto">
                                    {review.images.map((image, imgIndex) => (
                                        <img 
                                            key={imgIndex} 
                                            src={image} 
                                            alt={`Review ${imgIndex + 1}`} 
                                            className="w-20 h-20 object-cover rounded-lg cursor-pointer" 
                                            onClick={() => openModal(image)}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center">
                                {[...Array(5)].map((star, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.176 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.343 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <button className="mt-4 bg-gradient-to-r from-customBlueStart to-customBlueEnd text-white py-2 px-4 rounded-lg shadow-md"
                        onClick={() => window.location.href = '/add-review'}>Add Post</button>
                    </div>
                </div>
            </div>

            <Footer className="mt-auto" />

            {/* Modal for displaying the image */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleModalClick}>
                    <div className="relative">
                        <img src={selectedImage} alt="Selected" className="max-w-full max-h-full rounded-lg" />
                        <button onClick={closeModal} className="absolute top-0 right-0 mt-2 mr-2 text-white text-2xl">&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserReviewsPage;
