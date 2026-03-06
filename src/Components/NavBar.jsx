import React from "react";
import TaskDutyLogo from "../assets/TaskDutyLogo.png";
import {  NavLink, useLocation } from "react-router-dom";
import TaskDutyDp from "../assets/TaskDutyDp.jpg"

export default function NavBar() {
  const location = useLocation()

  return (
    <div className="bg-[#F3F4F6] border-b-4 border-b-[#E5E7EB] rounded-b-md py-3 md:px-13 px-3 flex justify-between items-center">
      <div>
        <NavLink to="/"><img className="w-25 md:w-35" src={TaskDutyLogo} alt="" /></NavLink>
      </div>

      <div className="flex gap-3 sm:gap-5 md:gap-7 items-center text-[13px] font-medium">
        {location.pathname !== "/newtask" && (
          <NavLink className="text-[#292929] text-[14px] md:text-[16px] font-medium" to="/newtask">New Task</NavLink>
        )}
        {location.pathname !== "/mytask" && (
        <NavLink className="text-[#292929] text-[14px] md:text-[16px] font-medium" to="/mytask">All Tasks</NavLink>
        )}
        <button className="border-2 rounded-full">
          <img className="w-8 h-8 rounded-full" src={TaskDutyDp}  alt="" />
        </button>
      </div>
    </div>
  );
}
