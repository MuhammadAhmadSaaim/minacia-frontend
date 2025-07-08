import React, { useState } from 'react';
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setId } from '../redux/jwtSlice';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AuthForm = () => {
  const location = useLocation();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // Login form states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form states
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(null);
  const redirectTo = location.state?.from || "/";
  console.log("Redirecting to:", redirectTo);

  // Clear login messages after 3 seconds
  React.useEffect(() => {
    if (loginSuccess || loginError) {
      const timer = setTimeout(() => {
        setLoginSuccess(null);
        setLoginError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, loginError]);

  // Clear signup messages after 3 seconds
  React.useEffect(() => {
    if (signupSuccess || signupError) {
      const timer = setTimeout(() => {
        setSignupSuccess(null);
        setSignupError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [signupSuccess, signupError]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login/`, {
        username: loginUsername,
        password: loginPassword,
      });
      dispatch(setToken(response.data));
      dispatch(setId(response.data.id));
      setLoginSuccess('Login successfully');
      setSignupUsername('');
      setLoginError(null);
      navigate(redirectTo);

    } catch (err) {
      setLoginError('Invalid username or password');
      setLoginSuccess(null);
      setLoginUsername('');
      setLoginPassword('');

    }
  };


  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/api/auth/register/`, {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });
      setSignupSuccess('Registration successful!');
      setSignupError(null);
      setSignupEmail('');
      setSignupPassword('');
      toggleForm();
    } catch (err) {
      if (err.response?.data?.username) {
        setSignupError('Username already exists');
      } else if (err.response?.data?.email) {
        setSignupError('Email already exists');
      } else {
        setSignupError('Registration failed. Please try again.');
      }
      setSignupSuccess(null);
    }
  };


  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="mt-16 min-h-screen w-full flex items-center justify-center font-cormorant px-2">

      {/* Main Container */}
      <div className="w-full max-w-[900px] bg-white rounded-lg overflow-hidden flex flex-col-reverse md:flex-row shadow-lg">
        {/* Form Container (holds both login and signup forms) */}

        <div className="relative w-full md:w-1/2 h-[450px]">
          {/* Login Panel */}
          <div
            className={`absolute top-0 left-0 w-full h-full p-6 flex flex-col items-center justify-center transition-transform duration-700 ${isSignUp ? '-translate-x-full' : 'translate-x-0'
              } z-10`}
          >
            <form onSubmit={handleSubmit} className="w-full px-4">
              {loginError && (
                <div className="mb-2 bg-red-100 text-red-700 px-4 py-2 rounded text-center">
                  {loginError}
                </div>
              )}
              {loginSuccess && (
                <div className="mb-2 bg-green-100 text-green-700 px-4 py-2 rounded text-center">
                  {loginSuccess}
                </div>
              )}

              <h1 className="text-4xl md:text-6xl font-bold text-center">Login</h1>
              <div className="relative mt-4">
                <UserIcon className="absolute top-10 left-3 text-gray-500 h-5 w-5" />
                <label className="block text-gray-700 text-md font-bold mb-2">User Name</label>
                <input
                  className="text-gray-700 border border-purple-200 py-2 pl-10 w-full"
                  type="text"
                  placeholder="Username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4 relative">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">Password</label>
                </div>
                <LockClosedIcon className="absolute top-10 left-3 text-gray-500 h-5 w-5" />
                <input
                  className="text-gray-700 border border-purple-200 py-2 pl-10 pr-10 w-full"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-10 right-3 cursor-pointer"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <button className="mt-8 p-2 text-lg text-white w-full rounded bg-black">Login</button>
            </form>
          </div>

          {/* SignUp Panel */}
          <div
            className={`absolute top-0 left-0 w-full h-full p-6 flex flex-col items-center justify-center transition-transform duration-700 ${isSignUp ? 'translate-x-0' : '-translate-x-full'
              } z-10`}
          >
            <form onSubmit={handleSubmitSignUp} className="w-full px-4">
              {signupError && (
                <div className="mb-2 bg-red-100 text-red-700 px-4 py-2 rounded text-center">
                  {signupError}
                </div>
              )}
              {signupSuccess && (
                <div className="mb-2 bg-green-100 text-green-700 px-4 py-2 rounded text-center">
                  {signupSuccess}
                </div>
              )}

              <h1 className="text-4xl md:text-6xl font-bold text-center">SignUp</h1>
              <div className="relative mt-4">
                <UserIcon className="absolute top-10 left-3 text-gray-500 h-5 w-5" />
                <label className="block text-gray-700 text-md font-bold mb-2">User Name</label>
                <input
                  className="text-gray-700 border border-purple-200 py-2 pl-10 w-full"
                  type="text"
                  placeholder="Username"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  required
                />
              </div>
              <div className="relative mt-4">
                <EnvelopeIcon className="absolute top-10 left-3 text-gray-500 h-5 w-5" />
                <label className="block text-gray-700 text-md font-bold mb-2">Email Address</label>
                <input
                  className="text-gray-700 border border-purple-200 py-2 pl-10 w-full"
                  type="email"
                  placeholder="mail@gmail.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4 relative">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-md font-bold mb-2">Password</label>
                </div>
                <LockClosedIcon className="absolute top-10 left-3 text-gray-500 h-5 w-5" />
                <input
                  className="text-gray-700 border border-purple-200 py-2 pl-10 pr-10 w-full"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-10 right-3 cursor-pointer"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>

              <button className="mt-8 p-2 text-lg text-white w-full rounded bg-black">SignUp</button>
            </form>
          </div>
        </div>
        {/* Right Panel (image background) */}
        <div
          className="relative w-full md:w-1/2 h-[250px] md:h-[450px] flex items-center justify-center text-white z-20 mt-20 md:mt-0 overflow-hidden mb-0"
          style={{
            backgroundImage: "url('/images/category.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-65" />
          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold">
              {isSignUp ? 'Sign Up!' : `Welcome ${signupUsername}!`}
            </h1>
            <p className="mt-2 md:mt-4 text-lg md:text-2xl">
              {isSignUp
                ? 'Stay up to date with Minacia.'
                : 'Enter your details and become apart of the society.'}
            </p>
            <button
              onClick={toggleForm}
              className="mt-4 md:mt-8 p-2 md:p-3 border border-white text-white w-full max-w-xs text-lg md:text-xl rounded hover:bg-white hover:text-gray-800 transition-all"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;
