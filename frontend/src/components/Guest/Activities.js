import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

const ActivitiesPage = () => {


    return (
        <div>
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            {/* Other homepage content */}
            <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col">
                <div className="bg-opacity-40 bg-white rounded-lg  sm:p-4 lg:p-4 m-4 sm:m-6 lg:m-6 flex-grow ">
                    <h1 className="text-customBlue text-2xl font-bold text-center p-4">On going Activities</h1>
                    <div className="flex flex-col">
                        
                    </div>
                </div>

                <Footer className="mt-auto" />
            </div>
        </div>
    );
};

export default ActivitiesPage;