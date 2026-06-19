import React, { useState } from "react";
import TaskDutyLogo from "../assets/TaskDutyLogo.png";
import {  NavLink, useLocation, useNavigate } from "react-router-dom";
import TaskDutyDp from "../assets/TaskDutyDp.jpg"
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast"
import { MdOutlineLogout } from "react-icons/md";

export default function NavBar() {
  const location = useLocation()

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toast.success("Logged out successfully");

  navigate("/login");
  };

  return (
    <div className="bg-[#F3F4F6] border-b-4 border-b-[#E5E7EB] rounded-b-md py-3 md:px-13 px-3 flex justify-between items-center">
      <div>
        <NavLink to="/"><img className="w-25 md:w-35" src={TaskDutyLogo} alt="" /></NavLink>
      </div>

      <div className="flex gap-3 sm:gap-5 md:gap-7 items-center text-[13px] font-medium">

        {token ? (
  <>
    {/* ------------------------------------------------------------------- */}
    <div className="hidden md:flex gap-10 items-center">

      {location.pathname !== "/newtask" && (
        <NavLink
          className="text-[#292929] text-[16px] font-medium"
          to="/newtask"
        >
          New Task
        </NavLink>
      )}

      {location.pathname !== "/mytask" && (
        <NavLink
          className="text-[#292929] text-[16px] font-medium"
          to="/mytask"
        >
          All Tasks
        </NavLink>
      )}

      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            className="w-8 h-8 rounded-full border-2"
            src={TaskDutyDp}
            alt=""
          />

          <span className="text-sm">
            Hi👋 {user?.firstName}
          </span>
        </button>

        {showDropdown && (
          <div className="absolute mt-2 bg-white shadow-md rounded-md border border-[#974FD0] w-30 z-50">
            <button
              onClick={handleLogout}
              className="flex border border-[#974FD0] items-center rounded-md w-full text-red-600 text-[15px] text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span><MdOutlineLogout size={25}/></span>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>

    {/* ---------------------------------------------------------- */}
    <div className="md:hidden text-[#974FD0]">
      <button
        onClick={() => setShowMobileMenu(true)}
      >
        <HiOutlineMenuAlt3 size={28} />
      </button>
    </div>

    {/* --------------------------------------------------------- */}
    <div
      className={`fixed top-0 right-0 h-screen w-50 bg-white shadow-xl z-50 transition-transform duration-300 ${
        showMobileMenu
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      <div className="p-5">

        <div className="flex justify-end">
          <button
            onClick={() => setShowMobileMenu(false)}
          >
            <IoClose size={28} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4 mb-4">
          <img
            className="w-10 h-10 rounded-full border-2"
            src={TaskDutyDp}
            alt=""
          />

          <span className="font-medium text-[15px]">
            Hi👋 {user?.firstName}
          </span>
        </div>

        <div className="flex flex-col gap-5">

          <NavLink
            to="/newtask"
            onClick={() => setShowMobileMenu(false)}
          >
            New Task
          </NavLink>

          <NavLink
            to="/mytask"
            onClick={() => setShowMobileMenu(false)}
          >
            All Tasks
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center text-left text-red-600"
          >
            <span><MdOutlineLogout size={25}/></span>
            Logout
          </button>

        </div>
      </div>
    </div>
  </>
) : (
          <>
            <NavLink
              to="/login"
              className="border-2 border-[#974FD0] px-3 py-1.5 rounded-md text-[#974FD0] text-[14px] md:text-[16px] font-medium"
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className="bg-[#974FD0] text-white px-3 py-2 rounded-md"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
