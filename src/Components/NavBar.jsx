import React from "react";
import TaskDutyLogo from "../assets/TaskDutyLogo.png";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import TaskDutyDp from "../assets/TaskDutyDp.jpg"

export default function NavBar() {
  return (
    <div className="bg-[#F3F4F6] border-b-4 border-b-[#E5E7EB] rounded-b-md py-3 md:px-13 px-3 flex justify-between items-center">
      <div>
        <Link to="/"><img className="w-25 md:w-35" src={TaskDutyLogo} alt="" /></Link>
      </div>

      <div className="flex gap-3 md:gap-5 items-center text-[13px] font-medium">
        <Link to="/newtask">New Task</Link>
        <Link to="/mytask">All Tasks</Link>
        <button className="border-2 rounded-full">
          <img className="w-8 h-8 rounded-full" src={TaskDutyDp}  alt="" />
        </button>
      </div>
    </div>
  );
}
