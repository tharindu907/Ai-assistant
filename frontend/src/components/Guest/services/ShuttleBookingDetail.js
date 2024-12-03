import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const ShuttleBookingDetail = () => {
    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col"> {/* Flex container */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            
            <div className="flex-grow"> {/* Empty content area */}
                {/* You can leave this empty or put content here */}
            </div>

            <Footer className="mt-auto" /> {/* Pushes the footer to the bottom */}
        </div>
    );
};

export default ShuttleBookingDetail;
