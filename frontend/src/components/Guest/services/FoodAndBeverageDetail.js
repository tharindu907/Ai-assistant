import React, { useState, useEffect } from 'react';
import { FaSearch, FaCoffee, FaHamburger, FaConciergeBell, FaAppleAlt, FaGlassWhiskey, FaCookie } from 'react-icons/fa'; // Add icons for categories
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import axios from 'axios';

import StrawberryBurrataSaladImg from '../../../assets/Strawberry-Burrata-Salad.jpg';
import GrilledBeefSteakImg from '../../../assets/beef-steak.jpg';
import FajitaPastaImg from '../../../assets/Fajita-pasta.jpg';
import BurgerImg from '../../../assets/burger.jpg';
import PancakesImg from '../../../assets/pancake.jpeg';

// Sample meal data, you can replace this with real data from your backend
const meals = [
    { id: 1, name: 'Pancakes', category: 'Breakfast', description: 'Delicious pancakes with syrup', price: 5, dietary: 'Vegetarian', image: PancakesImg },
    { id: 2, name: 'Burger', category: 'Lunch', description: 'Cheese burger with fries', price: 10, dietary: 'Non-Vegetarian', image: BurgerImg },
    { id: 3, name: 'Grilled Beef Steak', category: 'Dinner', description: 'A tender, juicy grilled beef steak seasoned perfectly, offering rich flavors with a smoky char finish.', price: 200, dietary: 'Non-Vegetarian', image: GrilledBeefSteakImg },
    { id: 4, name: 'Fries', category: 'Snacks', description: 'Crispy fries with ketchup', price: 3, dietary: 'Vegan', image: FajitaPastaImg },
    { id: 5, name: 'Smoothie', category: 'Drinks', description: 'Healthy fruit smoothie', price: 6, dietary: 'Vegetarian', image: FajitaPastaImg },
    { id: 6, name: 'Strawberry Burrata Salad', category: 'Healthy', description: 'A refreshing mix of juicy strawberries, creamy burrata, fresh greens, and a drizzle of balsamic.', price: 105, dietary: 'Vegetarian', image: StrawberryBurrataSaladImg },
    { id: 7, name: 'Cupcake', category: 'Dessert', description: 'Vanilla cupcake with frosting', price: 4, dietary: 'Vegetarian', image: FajitaPastaImg },
    { id: 8, name: 'Nuts Mix', category: 'Nuts', description: 'Assorted mixed nuts', price: 5, dietary: 'Vegan', image: FajitaPastaImg },
    { id: 9, name: 'Fajita Pasta', category: 'Lunch', description: 'Fajita pasta combines tender chicken, sautéed peppers, creamy sauce, and flavorful spices in a delicious meal.', price: 160, dietary: 'Non-Vegetarian', image: FajitaPastaImg }
];

const FoodAndBeverageDetail = () => {
    const { cart, setCart } = useCart(); // Use the useCart hook to get cart and setCart
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMeals, setFilteredMeals] = useState(meals);
    const [priceRange, setPriceRange] = useState('All');
    const [dietary, setDietary] = useState('All');

    useEffect(() => {
        let filtered = meals.filter(meal =>
            (selectedCategory === 'All' || meal.category === selectedCategory) &&
            meal.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (priceRange !== 'All') {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(meal => meal.price >= min && meal.price <= max);
        }

        if (dietary !== 'All') {
            filtered = filtered.filter(meal => meal.dietary === dietary);
        }

        setFilteredMeals(filtered);
    }, [selectedCategory, searchQuery, priceRange, dietary ]);

    useEffect(() => {
        const fetchCart = async () => {
          try {
            // Assuming you have a user ID available (you could use auth tokens to get the user ID)
            const userId = 'someUserId'; // Replace with actual user ID
    
            const response = await axios.get(`/api/cart?userId=${userId}`);
            if (response.data) {
              setCart(response.data.items); // Set the cart in state
            }
          } catch (error) {
            console.error('Error fetching cart data:', error);
          }
        };
    
        fetchCart();
      }, [setCart]);

    // Handle adding meal to the cart
  const handleAddToCart = async (meal) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === meal.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...meal, quantity: 1 }];
      }
    });

    try {
      // Send the updated cart to the server
      const updatedCart = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const userId = 'someUserId'; // Replace with actual user ID
      await axios.post('/api/cart', { userId, items: updatedCart });
    } catch (error) {
      console.error('Error updating cart on server:', error);
    }
  };


    const handleResetFilters = () => {
        setPriceRange('All');
        setDietary('All');
        setSearchQuery('');
        setSelectedCategory('All');
    };

    return (
        <div className="bg-gradient-to-b from-customBlueStart to-customBlueEnd min-h-screen flex flex-col scrollbar-hide">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="container mx-auto p-4 flex-grow px-2">
                {/* Category Icons */}
                <div className="flex overflow-x-auto space-x-4 sm:space-x-3 py-4 px-4 justify-start lg:justify-center  text-white">
                    {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks', 'Nuts', 'Healthy', 'Dessert'].map((category) => {
                        let Icon;
                        if (category === 'Breakfast') {
                            Icon = FaCoffee;
                        } else if (category === 'Lunch') {
                            Icon = FaHamburger;
                        } else if (category === 'Dinner') {
                            Icon = FaConciergeBell;
                        } else if (category === 'Snacks') {
                            Icon = FaAppleAlt;
                        } else if (category === 'Drinks') {
                            Icon = FaGlassWhiskey;
                        } else if (category === 'Nuts') {
                            Icon = FaAppleAlt;
                        } else if (category === 'Healthy') {
                            Icon = FaAppleAlt;
                        } else if (category === 'Dessert') {
                            Icon = FaCookie;
                        } else {
                            Icon = FaConciergeBell; // Default icon for 'All'
                        }

                        return (
                            <div
                                key={category}
                                className={`flex flex-col items-center cursor-pointer transform transition duration-300 hover:scale-110 ${selectedCategory === category ? 'text-blue-300' : ''
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                <div
                                    className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-blue-800 rounded-full shadow-lg transform transition duration-300 ${selectedCategory === category ? 'animate-bounce' : ''
                                        }`}
                                >
                                    <Icon className="text-2xl sm:text-3xl" />
                                </div>
                                <span className="mt-2 text-xs">{category}</span>
                            </div>
                        );
                    })}
                </div>


                {/* Search Bar */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        className="border p-2 pl-10 w-full rounded-lg text-sm sm:text-sm md:text-base focus:outline-blue-600"
                        placeholder="Search meals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

                </div>

                {/* Filters */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 mb-6 text-gray-600 md:grid-cols-4 ">
                    {/* Price Range Filter */}
                    <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="border p-2 rounded-lg mb-2 sm:mb-0 w-full sm:w-auto text-xs sm:text-sm md:text-base focus:outline-blue-600"
                    >
                        <option value="All">Price Range</option>
                        <option value="0-10">Under $10</option>
                        <option value="10-50">$10 - $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100-200">$100 - $200</option>
                    </select>

                    {/* Dietary Filter */}
                    <select
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="border p-2 rounded-lg mb-2 sm:mb-0 w-full sm:w-auto text-xs sm:text-sm md:text-base focus:outline-blue-600"
                    >
                        <option value="All">Dietary</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                    </select>

                    <button
                        onClick={handleResetFilters}
                        className="bg-yellow-500 text-white p-2 rounded-lg mb-2 sm:mb-0 w-full sm:w-auto text-xs sm:text-sm md:text-base"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Meals List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto" style={{ maxHeight: '500px' }}>
                    {filteredMeals.map((meal) => (
                        <div key={meal.id} className="bg-white border p-4 rounded-lg h-8100 flex flex-col">
                            <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover rounded-md mb-4" />
                            <div className="flex-grow overflow-hidden mb-2">
                                <h3 className="text-xl font-semibold text-customBlue truncate">{meal.name}</h3>
                            </div>

                            {/* Fixed height for description */}
                            <div className="flex-grow overflow-hidden mb-4">
                                <p className="text-gray-700 text-md">{meal.description}</p>
                            </div>

                            <p className="text-gray-500 font-bold">Price: ${meal.price}</p>

                            <button
                                onClick={() => handleAddToCart(meal)}
                                className="bg-gradient-to-r from-customBlueStart to-customBlueEnd text-white p-2 mt-4 w-full rounded-lg shadow-md transform transition duration-200 hover:scale-105 active:scale-95"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer className="mt-auto" />
        </div>
    );
};

export default FoodAndBeverageDetail;
