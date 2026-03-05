import React from "react";
import AddTaskImage from "../assets/AddTaskImage.png";
import { Link } from "react-router-dom";

export default function Body() {
  return (
    <div className="flex flex-col md:flex container mx-auto my-7 md:my-15 items-center">
      <div className="md:hidden pb-5">
        <img className="px-5 w-80 container mx-auto" src={AddTaskImage} alt="" />
      </div>
     
     <div className="flex gap-5 px-3 md:px-10">
         <div className="flex text-center items-center md:items-start md:text-left flex-col gap-3 md:gap-5 lg:px-20 ">
        <h1 className="text-[24px] md:text-[30px] lg:text-[45px] font-extrabold md:font-medium">
          Manage your Tasks on <span className="text-[#974FD0]">TaskDuty</span>
        </h1>
        <p className="md:text-[17px] lg:text-[20px] lg:pr-30">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
          sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
          tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
          semper porttitor. Nec accumsan.
        </p>
        <Link to="/mytask" className="bg-[#974FD0] hover:bg-[#46146e] rounded-md font-medium text-[20px] text-center px-2 py-2 text-[#FAF9FB] w-45 cursor-pointer ">
          Go to My Tasks
        </Link>
      </div>

      <div className="hidden md:block">
        <img className="w-350 h-100" src={AddTaskImage} alt="" />
      </div>
     </div>
    </div>
  );
}
