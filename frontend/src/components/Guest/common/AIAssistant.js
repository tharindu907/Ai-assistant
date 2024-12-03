import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AIAssistant = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [userMessage, setUserMessage] = useState(''); // To store the user's input
    const [chatHistory, setChatHistory] = useState([
        { sender: 'bot', message: 'Hi! How can I help you?' }
    ]);

    const [chatAreaHeight, setChatAreaHeight] = useState('15rem'); // Initial height of chat area
    const [isReduced, setIsReduced] = useState(false); // State to track if chat area is reduced

    // Reference to the chat container for auto-scrolling
    const chatEndRef = useRef(null);

    // Scroll to the bottom whenever chatHistory updates
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    const toggleAssistant = () => {
        setIsOpen(!isOpen);
    };

     // Function to handle sending the message to the Flask API
     const sendMessage = async () => {
        if (!userMessage) return; // Do nothing if the message is empty

        // Update the chat history with the user's message
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: 'user', message: userMessage }
        ]);

        try {
            // Send the message to the Flask backend
            const response = await axios.post('http://127.0.0.1:5000/chat', {
                message: userMessage
            });

            const botMessage = response.data.response;
            const redirectUrl = response.data.redirectUrl;

            // Update chat history with the bot's response
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'bot', message: botMessage }
            ]);

            // Check if the response contains a redirect URL
            if (redirectUrl) {
                setChatAreaHeight('4rem');
                setIsReduced(true);
                setTimeout(() => {
                    navigate(redirectUrl);
                }, 500); // Delay for user to see the bot message
            }

        } catch (error) {
            console.error("Error sending message to backend:", error);
    
            // Optionally update chat history with an error message
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'bot', message: 'Sorry, there was an error. Please try again.' }
            ]);
        }
    

        // Clear the input field after sending the message
        setUserMessage('');
    };

    // Function to handle input focus and restore chat area height
    const handleInputFocus = () => {
        if (isReduced) {
            setChatAreaHeight('15rem'); // Restore chat area height
            setIsReduced(false); // Mark chat area as no longer reduced
        }
    };

    return (
        <div className="fixed bottom-12 right-2 z-[60] flex flex-col items-end space-y-2">
            {/* AI Assistant Toggle Button */}
            {!isOpen && (
                <button
                    onClick={toggleAssistant}
                    className={`w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-transform duration-100 
                        ${isOpen ? '' : 'animate-pulse'}`}
                >
                    💬
                </button>
            )}

            {/* AI Assistant Popup */}
            {isOpen && (
                <div
                    className="bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-md"
                    style={{
                        maxWidth: '28rem', // Restricts max width
                        width: 'calc(100vw - 1rem)', // Responsive based on viewport width
                        height: 'auto',
                        maxHeight: '75vh', // Ensures it doesn’t overflow vertically
                    }}
                >
                    {/* Header */}
                    <div className="bg-blue-900 text-white px-4 py-2 rounded-t-lg flex justify-between">
                        <h2 className="text-lg">Chat with Us</h2>
                        <button
                            onClick={toggleAssistant}
                            className="text-white hover:text-gray-300"
                        >
                            ×
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div
                        className="p-4 overflow-y-auto"
                        style={{
                            height: chatAreaHeight, // Dynamic height
                            maxHeight: '75vh', // Restricts overflow behavior
                        }}
                    >
                        
                        {chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                className={`text-sm flex ${chat.sender === 'bot' ? 'text-gray-500' : 'text-blue-600'}`}
                                style={{
                                    // Align user message to the right, bot message to the left
                                    justifyContent: chat.sender === 'user' ? 'flex-end' : 'flex-start',
                                    marginBottom: '8px',
                                }}
                            >
                                <div
                                    // Added border, padding, and styling for message boxes
                                    className={`px-4 py-2 rounded-lg ${
                                        chat.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'
                                    }`}
                                    style={{
                                        // Border styling for each message box
                                        border: '1px solid #e0e0e0', // Light border color
                                        maxWidth: '70%', // Control maximum width for each message box
                                        wordWrap: 'break-word', // Ensures long words break and don’t overflow
                                    }}
                                >
                                <p>{chat.message}</p>
                            </div>
                        </div>
                        ))}
                        {/* Invisible div to maintain auto-scroll */}
                        <div ref={chatEndRef}></div>
                    </div>

                    {/* Input Box */}
                    <div className="flex items-center px-4 py-2 bg-white border-t border-gray-300 rounded-b-lg">
                        <input
                            type="text"
                            placeholder="Type here..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)} // Update userMessage state
                            onFocus={handleInputFocus} // Restore chat area height on focus
                            className="flex-1 p-2 text-sm border rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button 
                            onClick={sendMessage} //// Call the sendMessage function when clicked
                            className="ml-3 w-10 h-10 bg-blue-900 rounded-full flex justify-center items-center hover:bg-blue-600"
                        >
                            <div className="w-2 h-2 border-t-2 border-r-2 border-white rotate-45 transform origin-center" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant;
