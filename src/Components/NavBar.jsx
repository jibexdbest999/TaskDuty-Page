import React from "react";
import TaskDutyLogo from "../assets/TaskDutyLogo.png";
import {  NavLink, useLocation } from "react-router-dom";
import TaskDutyDp from "../assets/TaskDutyDp.jpg"

export default function NavBar() {
  const location = useLocation()

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  return (
    <div className="bg-[#F3F4F6] border-b-4 border-b-[#E5E7EB] rounded-b-md py-3 md:px-13 px-3 flex justify-between items-center">
      <div>
        <NavLink to="/"><img className="w-25 md:w-35" src={TaskDutyLogo} alt="" /></NavLink>
      </div>

      <div className="flex gap-3 sm:gap-5 md:gap-7 items-center text-[13px] font-medium">

        {token ? (
          <>
            {location.pathname !== "/newtask" && (
              <NavLink
                className="text-[#292929] text-[14px] md:text-[16px] font-medium"
                to="/newtask"
              >
                New Task
              </NavLink>
            )}

            {location.pathname !== "/mytask" && (
              <NavLink
                className="text-[#292929] text-[14px] md:text-[16px] font-medium"
                to="/mytask"
              >
                All Tasks
              </NavLink>
            )}

            <div className="flex flex-col items-center">

              <button className="border-2 w-8 rounded-full">
                <img
                  className="w-8 h-8 rounded-full"
                  src={TaskDutyDp}
                  alt=""
                />
              </button>

              <span >
                Hi👋 {user?.firstName}
              </span>

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
