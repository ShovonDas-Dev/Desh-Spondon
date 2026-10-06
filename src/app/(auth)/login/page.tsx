'use client'
import React, { useState } from 'react';

export default function LoginPage() {
  const [formData , setFormdata ] = useState ( {
    name : "",
    email : "",
    password : ""
  })
  
  const handleChange = async (e) => {
    setFormdata ({
      ...formData,
      [e.target.name]: e.target.value,
    })
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // data share to batterauth 
    console.log(formData);
    
    setFormdata({
      name: "",
      email: "",
      password: ""
    });
    
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-[#eae3d2]">
        
        {/* Left Side: Logo + Title */}
        <div className="bg-[#f7f2e4] p-8 md:p-12 flex flex-col items-center justify-center text-center border-r border-[#eae3d2]">
          <div className="w-20 h-20 bg-[#7a1c2e] text-white rounded-xl flex items-center justify-center text-3xl font-bold shadow-md mb-4">
            দে
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">দেশস্পন্দন</h1>
          <p className="text-gray-600 text-sm italic">সত্যের সঙ্গে, দেশের স্পন্দনে</p>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">লগইন করুন</h2>
            <p className="text-sm text-gray-500 mt-1">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল বা ফোন নম্বর</label>
              <input 
                type="text" 
                name = "name"
                value={formData.name}
                onChange={handleChange}
                placeholder="example@gmail.com" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a1c2e]"
                required
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল বা ফোন নম্বর</label>
              <input 
                type="text" 
                name = "email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a1c2e]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
              <input 
                type="password" 
                name= "password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a1c2e]"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#7a1c2e] hover:bg-[#631624] text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-md"
            >
              লগইন / সেভ করুন
            </button>
          </form>

          {/* স্টেটে কি কি অবজেক্ট জমা হলো তা নিচে দেখতে পাবে */}
          
        </div>

      </div>
    </div>
  );
}