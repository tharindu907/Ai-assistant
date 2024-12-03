// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';

// Guest Pages 
import HomePage from './components/Guest/home/Home';
import ActivitiesPage from './components/Guest/Activities';
import ProfilePage from './components/Guest/Profile';
import BillingPage from './components/Guest/Billing';
import CartPage from './components/Guest/Cart';
import NotificationPage from './components/Guest/Notification';
import Footer from './components/Guest/common/Footer';
import UserReviewsPage from './components/Guest/UserReviews';
import AddReviewPage from './components/Guest/AddReviewPage';

// Services Pages
import FoodAndBeverageDetail from './components/Guest/services/FoodAndBeverageDetail';
import PoolBookingDetail from './components/Guest/services/PoolBookingDetail';
import PoolReservation from './components/Guest/services/PoolReservation';
import PlayAreaBookingDetail from './components/Guest/services/PlayAreaBookingDetail';
import PlayAreaBooking from './components/Guest/services/PlayAreaBooking';
import ShuttleBookingDetail from './components/Guest/services/ShuttleBookingDetail';

import { CartProvider } from './components/Guest/context/CartContext';
import AIAssistant from './components/Guest/common/AIAssistant';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <AIAssistant />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/activities" element={<ActivitiesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/billing" element={<BillingPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/notifications" element={<NotificationPage />} /> 
                    <Route path="/footer" element={<Footer />} />
                    <Route path="/user-reviews" element={<UserReviewsPage />} />
                    <Route path="/add-review" element={<AddReviewPage />} />

                    <Route path="/services/1" element={<FoodAndBeverageDetail />} />
                    <Route path="/services/2" element={<PoolBookingDetail />} />
                    <Route path="/services/pool-reservation" element={<PoolReservation />} />
                    <Route path="/services/3" element={<PlayAreaBookingDetail />} />
                    <Route path="/services/play-area-booking" element={<PlayAreaBooking />} />
                    <Route path="/services/4" element={<ShuttleBookingDetail />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
