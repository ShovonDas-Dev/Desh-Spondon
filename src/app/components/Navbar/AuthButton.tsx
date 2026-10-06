
import Link from "next/link";
import React from "react";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

const AuthButton = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end sm:gap-3">
      {/* Login Button */}
      <Link
        href="/login"
        className="group flex h-10 items-center justify-center gap-1.5 border border-[#222] bg-white px-3 text-xs font-semibold text-[#1a1a1a] transition-all duration-200 hover:bg-[#f0ece1] sm:h-11 sm:gap-2 sm:px-5 sm:text-sm"
      >
        <FiLogIn
          size={16}
          className="transition-transform duration-200 group-hover:-translate-x-0.5 sm:h-[18px] sm:w-[18px]"
        />

        <span>লগইন</span>
      </Link>

      {/* Sign Up Button */}
      <Link
        href="/signup"
        className="group flex h-10 items-center justify-center gap-1.5 bg-[#7B1C32] px-3 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#5f1527] hover:shadow-md sm:h-11 sm:gap-2 sm:px-5 sm:text-sm"
      >
        <FiUserPlus
          size={16}
          className="transition-transform duration-200 group-hover:scale-110 sm:h-[18px] sm:w-[18px]"
        />

        <span className="whitespace-nowrap">
          সাইন ইন / রেজিস্ট্রেশন
        </span>
      </Link>
    </div>
  );
};

export default AuthButton;
