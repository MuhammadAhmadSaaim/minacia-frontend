import React, { useState } from 'react';
import { FaInstagram, FaLock } from 'react-icons/fa';

const Lock = () => {
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // prevent default form submission or refresh
            if (!password.trim()) {
                alert('Please enter your password');
            } else {
                // Navigate to root
                window.location.href = '/';
            }
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-[#e5e5e5]">
            {/* Logo at top center */}
            <img
                src="images/Final-06.png"
                alt="Logo"
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-32 sm:w-40"
            />

            {/* Background Image */}
            <img
                src="images/DSC08937.jpg"
                alt="Background"
                className="absolute h-full max-h-screen w-auto object-contain z-0"
            />

            {/* Optional overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm z-0"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-8 max-w-ls w-full font-cormorant text-black">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 uppercase">
                   Rule Breakers Move First
                </h1>

                <p className="text-gray-200 mb-4">Prove you're one of us, enter your email to start notified.</p>

                {/* Email Field */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 w-full sm:w-auto border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                    />
                    <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition">
                        Request
                    </button>
                </div>

                {/* Password Entry */}
                <div className="flex flex-col items-center justify-center gap-2 text-sm text-black cursor-pointer mb-6">
                    {!showPasswordInput ? (
                        <div
                            className="flex items-center hover:underline"
                            onClick={() => setShowPasswordInput(true)}
                        >
                            <FaLock className="text-black mr-2" />
                            <span>Enter using password</span>
                        </div>
                    ) : (
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            autoFocus
                        />
                    )}
                </div>

                {/* Instagram Link */}
                <div className="flex items-center justify-center gap-2">
                    <FaInstagram className="text-black text-xl" />
                    <a
                        href="https://www.instagram.com/minaciasociety/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:underline"
                    >
                        @minaciasociety
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Lock;
