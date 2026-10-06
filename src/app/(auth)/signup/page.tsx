'use client'
import React, { useState } from 'react';
// import { signUp } from "../../../lib/auth-client"; // তোমার প্রজেক্ট অনুযায়ী পাথ ঠিক করে নিও

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Better-Auth দিয়ে সাইন আপ করার জন্য এভাবে লিখতে পারো:
    /*
    try {
      const result = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    */

    console.log("Signup Data:", formData);
    
    // সাবমিট হওয়ার পর ফর্ম এবং স্টেট খালি করার জন্য
    setFormData({
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

        {/* Right Side: Signup Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">রেজিস্ট্রেশন করুন</h2>
            <p className="text-sm text-gray-500 mt-1">নতুন অ্যাকাউন্ট তৈরি করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার নাম লিখুন" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a1c2e]"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a1c2e]"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
              <input 
                type="password" 
                name="password"
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
              সাইন আপ / রেজিস্টার করুন
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}