import React, { useState } from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import userAvatar from '../../assets/avatar.png';

const AddReviewPage = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [rating, setRating] = useState(0);

    const handleImageChange = (event) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            if (selectedImages.length + filesArray.length <= 10) {
                const newImages = filesArray.map(file => URL.createObjectURL(file));
                setSelectedImages(prevImages => [...prevImages, ...newImages]);
            } else {
                alert("You can only upload up to 10 images.");
            }
        }
    };

    const handleStarClick = (index) => {
        if (rating === index + 1) {
            setRating(0);
        } else {
            setRating(index + 1);
        }
    };

    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            
            <div className="flex-grow p-4 flex justify-center">
                <div className="bg-opacity-70 bg-blue-300 p-4 rounded-lg shadow-xl max-w-md w-full">
                    <h2 className="text-center text-white text-xl mb-4">Rate & Review Your Stay</h2>
                    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img src={userAvatar} alt="User" className="w-10 h-10 rounded-full mr-2" />
                            <h3 className="text-sm font-bold">John Doe</h3>
                        </div>
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((star, i) => (
                                <svg
                                    key={i}
                                    onClick={() => handleStarClick(i)}
                                    className={`w-6 h-6 cursor-pointer ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.176 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.343 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                </svg>
                            ))}
                        </div>
                        <textarea 
                            className="w-full p-2 mb-4 border rounded" 
                            placeholder="Share details of your own experience at this place"
                            maxLength={300}
                        ></textarea>
                        <input 
                            type="file" 
                            accept="image/*" 
                            multiple
                            onChange={handleImageChange} 
                            className="hidden" 
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className="w-full bg-blue-300 text-customBlueEnd py-2 px-4 rounded-lg mb-4 flex items-center justify-center cursor-pointer">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm0-1h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" />
                                <path d="M8 10a2 2 0 114 0 2 2 0 01-4 0z" />
                                <path d="M10 2a1 1 0 00-1 1v1H7a1 1 0 00-1 1v1H4a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1h-2V4a1 1 0 00-1-1h-2V3a1 1 0 00-1-1h-2z" />
                            </svg>
                            Add Photos
                        </label>
                        {selectedImages.map((image, index) => (
                            <img key={index} src={image} alt={`Selected ${index + 1}`} className="w-full h-auto mb-4 rounded" />
                        ))}

                        <div className="flex justify-center pt-10">
                            <button className="w-20 bg-gradient-to-r from-customBlueStart to-customBlueEnd text-white py-2 px-4 rounded-lg">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer className="mt-auto" />
        </div>
    );
};

export default AddReviewPage;