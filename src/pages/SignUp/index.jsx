import React, { useState } from 'react';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import registerUser from './api';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastContext'; 

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cnfPasswordError, setCnfPasswordError] = useState('');

  const { addToast } = useToast(); 


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      signUpUser();
    }
  };
  // save
  async function signUpUser() {
    const result = await registerUser(name, email, password);

    if (result.isSuccess) {
      addToast('Account created successfully!', 'success');
      navigate('/login');
    } else {
      addToast(result.message || 'Sign up failed. Please try again.', 'error');
    }
  }
  
  
  const signup = async (event) => {
    event.preventDefault();

  
    //clear previous error message
    cleanFields();

  
    // Frontend validation
    if (!name.trim()) {
      setNameError("Name is required.");
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Please enter a valid email.");
      return;
    }
    if (!password.trim()) {
      setPasswordError("Password is required.");
      return;
    }
    if (password !== repeatPassword) {
      setCnfPasswordError("Passwords do not match.");
      return;
    }
    
    // Check if passwords match
    if (password !== repeatPassword) {
      addToast('Passwords do not match', 'error'); 
      return;
    }

    function cleanFields() {
      setError('');
      setNameError('');
      setEmailError('');
      setCnfPasswordError('');
      setPasswordError('');
    }
    // Take this function ouside thunfctio
    

    try {
      await signUpUser();
    } catch (error) {
      console.error(error);
      addToast('An unexpected error occurred. Please try again.', 'error'); 
    }

  
  };
  
  const handleFocus = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setCnfPasswordError('');
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 w-screen h-screen text-white">
      {/* Icon Section */}
      <div className="mb-6">
        <MovieCreationIcon style={{ color: '#ff5252', height: '70px', width: '70px' }} />
      </div>
  
      {/* Form Container */}
      <div action="" className="bg-gray-800 shadow-lg p-6 rounded-xl w-80" onKeyDown={handleKeyDown}>
        <h1 className="mb-6 font-semibold text-2xl">Sign Up</h1>

        {/* Form */}
        <div className="flex flex-col gap-2 w-full">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
             
              className="border-gray-600 bg-transparent px-1 py-2 focus:border-red-500 border-b-2 w-full text-sm focus:outline-none"
            />
            {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
          </div>
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
           
              className="border-gray-600 bg-transparent px-1 py-2 focus:border-red-500 border-b-2 w-full text-sm focus:outline-none"
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>
          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
             
              className="border-gray-600 bg-transparent px-1 py-2 focus:border-red-500 border-b-2 w-full text-sm focus:outline-none"
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>
          {/* Repeat Password */}
          <div className="relative">
            <input
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              required
              onChange={(event) => setRepeatPassword(event.target.value)}
              placeholder="Repeat password"
             
              className="border-gray-600 bg-transparent px-1 py-2 focus:border-red-500 border-b-2 w-full text-sm focus:outline-none"
            />
            {cnfPasswordError && <p className="text-red-500 text-xs mt-1">{cnfPasswordError}</p>}
          </div>
          {/* Sign up */}
          <button
            type="submit"
            onClick={(event) => signup(event)}
            id="signUp"
            className="gap-4 bg-red-500 hover:bg-red-600 mt-2 py-2 rounded-lg font-medium text-sm text-white transition-all"
          >
            Create an account
          </button>
        </div>
        {/* Additional Links */}
        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-red-500 hover:underline cursor-pointer">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;