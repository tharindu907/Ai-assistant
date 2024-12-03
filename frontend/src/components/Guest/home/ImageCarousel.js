import React, { useEffect, useState } from 'react';
import slide1 from '../../../assets/welcome.png'; // Adjust the path based on your file structure
import slide2 from '../../../assets/welcome2.png';
import slide3 from '../../../assets/welcome.png';
import slide4 from '../../../assets/welcome2.png';

const ImageCarousel = () => {
    const images = [slide1, slide2, slide3, slide4]; // Use imported images

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [images.length]);

    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg"> {/* Rounded corners and shadow */}
            <div className="relative w-full h-60 md:h-96"> {/* Adjust height for different screen sizes */}
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg" // Cover the container and round corners
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition duration-200 ${
                            index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
