import React, { useState } from "react";
import AddTaskImage from "../assets/AddTaskImage.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"

export default function Body() {
    const navigate = useNavigate();

    const [ imageLoaded, setImageLoaded ] = useState(false);

const handleGoToTasks = () => {
  const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must login first");

      setTimeout(() => {
      navigate("/login");
      }, 2000); 

      return;
    }
    navigate("/mytask");
  };

  return (
    <div className="flex flex-col md:flex container mx-auto my-7 md:my-15 items-center">
      <div className="md:hidden pb-5 relative">
        {!imageLoaded && (
          <div className="w-80 h-60 bg-gray-200 animate-pulse rounded-lg"></div>
        )}

          <img
            loading="lazy"
            src={AddTaskImage}
            alt="Task illustration"
            onLoad={() => setImageLoaded(true)}
            className={`px-5 w-80 container mx-auto transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
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
        <button
          onClick={handleGoToTasks}
          className="bg-[#974FD0] hover:bg-[#46146e] rounded-md font-medium text-[20px] text-center px-2 py-2 text-[#FAF9FB] w-45 cursor-pointer ">
          Go to My Tasks
        </button>
      </div>

      <div className="hidden md:block relative">
        {!imageLoaded && (
          <div className="absolute inset-0 w-350 h-85 bg-gray-200 animate-pulse rounded-lg"></div>
        )}

          <img
            loading="lazy"
            src={AddTaskImage}
            alt="Task illustration"
            onLoad={() => setImageLoaded(true)}
            className={`w-350 h-85 transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
      </div>
     </div>
    </div>
  );
}
