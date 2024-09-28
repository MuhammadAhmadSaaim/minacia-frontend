import React, { useState } from 'react';
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="mt-16 h-screen w-full flex items-center justify-center font-cormorant">
            <div className="relative w-[900px] h-[450px] bg-white rounded-lg overflow-hidden">
                {/* Sign In Form */}
                <div className={`absolute top-0 left-0 w-1/2 h-full p-6 flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                    <form>
                        <h1 className='text-6xl font-cormorant font-bold text-center'>Login</h1>
                        <div className="relative mt-4">
                            <UserIcon className="absolute inset-y-0 mt-10 left-3 flex items-center text-gray-500 h-5 w-5" />
                            <label className="block text-gray-700 text-md font-bold mb-2">User Name</label>
                            <input
                                className="text-gray-700 focus:outline-none focus:shadow-outline border border-purple-200 py-2 pl-10 block w-full appearance-none"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4 relative">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-md font-bold mb-2">Password</label>
                                <a href="#" className="text-sm text-gray-500">Forget Password?</a>
                            </div>
                            <LockClosedIcon className="absolute inset-y-0 left-3 flex mt-10 items-center text-gray-500 h-5 w-5" />
                            <input
                                className="text-gray-700 focus:outline-none focus:shadow-outline border border-purple-200 py-2 pl-10 block w-full appearance-none pr-10"
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 cursor-pointer"
                                onClick={() => setIsPasswordVisible(prevState => !prevState)}
                            >
                                {isPasswordVisible ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <div>
                            <button className="mt-8 p-2 text-center text-lg text-white w-full rounded bg-black">Login</button>
                        </div>
                    </form>
                </div>

                {/* Sign Up Form */}
                <div className={`absolute top-0 left-0 w-1/2 h-full p-8 flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                    <form>
                        <h1 className='text-6xl font-cormorant font-bold text-center'>SignUp</h1>
                        <div className="relative mt-4">
                            <UserIcon className="absolute inset-y-0 mt-10 left-3 flex items-center text-gray-500 h-5 w-5" />
                            <label className="block text-gray-700 text-md font-bold mb-2">User Name</label>
                            <input
                                className="text-gray-700 focus:outline-none focus:shadow-outline border border-purple-200  py-2 pl-10 block w-full appearance-none"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative mt-4">
                            <EnvelopeIcon className="absolute inset-y-0 mt-10 left-3 flex items-center text-gray-500 h-5 w-5" />
                            <label className="block text-gray-700 text-md font-bold mb-2">Email Address</label>
                            <input
                                className="text-gray-700 focus:outline-none focus:shadow-outline border border-purple-200 py-2 pl-10 block w-full appearance-none"
                                type="email"
                                placeholder="mail@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4 relative">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-md font-bold mb-2">Password</label>
                            </div>
                            <LockClosedIcon className="absolute inset-y-0 left-3 flex mt-10 items-center text-gray-500 h-5 w-5" />
                            <input
                                className="text-gray-700 focus:outline-none focus:shadow-outline border border-purple-200 py-2 pl-10 block w-full appearance-none pr-10"
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 cursor-pointer"
                                onClick={() => setIsPasswordVisible(prevState => !prevState)}
                            >
                                {isPasswordVisible ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <div>
                            <button className="mt-8 p-2 text-center text-lg text-white w-full rounded bg-black">SignUp</button>
                        </div>
                    </form>
                </div>

                {/* Overlay Panels */}
                <div className="absolute w-full h-full">
                    <div className={`absolute inset-0 w-1/2 h-full flex items-center justify-center text-white transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-full' : 'hidden'}`}
                        style={{ backgroundImage: "url('/images/background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="absolute inset-0 bg-black opacity-65" />
                        <div className='relative z-10 flex flex-col items-center justify-center'>
                            <h1 className="text-5xl text-center font-bold">Hello, Friend!</h1>
                            <p className="mt-4 text-center text-2xl">Enter your personal details and start your journey with us</p>
                            <button onClick={toggleForm} className="mt-8 p-3 border border-white text-white w-full max-w-xs text-xl rounded hover:bg-white hover:text-gray-800 transition-all">Sign In</button>
                        </div>
                    </div>

                    <div className={`absolute inset-0 w-1/2 h-full flex items-center justify-center text-white transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-full' : 'hidden'}`}
                        style={{ backgroundImage: "url('/images/background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="absolute inset-0 bg-black opacity-65" />
                        <div className='relative z-10 flex flex-col items-center justify-center'>
                            <h1 className="text-5xl text-center font-bold">Welcome Back!</h1>
                            <p className="mt-4 text-center text-2xl">To keep connected with us, please login with your personal info</p>
                            <button onClick={toggleForm} className="mt-8 p-3 border border-white text-white w-full max-w-xs text-xl rounded hover:bg-white hover:text-gray-800 transition-all">Sign In</button>
                        </div>
                    </div>

                    <div className={`absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 w-1/2 h-full flex items-center justify-center text-white transition-transform duration-700 ease-in-out ${isSignUp ? 'hidden' : 'translate-x-full'}`}
                        style={{ backgroundImage: "url('/images/background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="absolute inset-0 bg-black opacity-65" />
                        <div className='relative z-10 flex flex-col items-center justify-center'>
                            <h1 className="text-5xl text-center font-bold">Welcome Back!</h1>
                            <p className="mt-4 text-center text-2xl">To keep connected with us, please login with your personal info</p>
                            <button onClick={toggleForm} className="mt-8 p-3 border border-white text-white w-full max-w-xs text-xl rounded hover:bg-white hover:text-gray-800 transition-all">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
