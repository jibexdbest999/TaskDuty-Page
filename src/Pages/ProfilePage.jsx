import React, {useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { FaUserCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { HashLoader } from "react-spinners"
import { updateProfile } from "../api/authApi";
import { toast } from "react-hot-toast"

export default function ProfilePage() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [showEdit, setShowEdit] = useState(false);
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");

    const [pageIsLoading, setPageIsLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setPageIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);
  
    if (pageIsLoading) return <div className='flex flex-col mx-auto items-center justify-center h-screen'>
        <HashLoader color="#974FD0" size={55} />
        <p className='text-[18px] lg:text-[30px] pt-2 font-semibold text-[#974FD0]'>Loading...</p>
      </div>

    const handleUpdate = async () => {
        try {
            const res = await updateProfile({
                firstName,
                lastName,
            });

            localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
            );
            toast.success("Profile updated successfully");
            setShowEdit(false);
        } catch (error) {
            toast.error(
            error.response?.data?.message ||
            "Update failed"
            );
        }
    };

    return(
        <div>
            <NavBar/>

            <div className="mt-3">
            <h1 className="px-5 text-[20px] font-medium text-[#974FD0] text-[25px] mb-2">My Profile</h1>
            <hr className="text-gray-400 border-2 border-gray-400" />

            <div className="flex flex-col py-4 md:px-4 px-2">
                 <span className="border-2 border-black rounded-full w-fit text-[#974FD0]"><FaUserCircle size={150}/></span>
                 <div className="flex flex-col gap-2 px-2 py-2 text-[18px]">
                    <div className="flex items-center justify-between">
                    <p className="flex flex-col md:flex-row md:gap-1"><span className="font-medium">Name:</span> { user?.firstName } {user?.lastName}</p>
                    <button 
                        onClick={() => setShowEdit(!showEdit)}
                        className="border-2 border-[red-500] mr-5 text-red-500 text-[14px] font-medium px-2 py-1 rounded-lg flex items-center hover:bg-red-500 hover:text-white"><FaRegEdit /> <span>Edit</span></button>
                    </div>
                    <hr />
                    {showEdit && (
                        <div className="bg-gray-50 border rounded-lg p-4 my-3 flex flex-col gap-3">

                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="border rounded-md px-3 py-2 outline-none focus:border-[#974FD0]"
                            />

                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="border rounded-md px-3 py-2 outline-none focus:border-[#974FD0]"
                        />

                        <button
                            onClick={handleUpdate}
                            className="bg-[#974FD0] text-white py-2 rounded-md hover:bg-[#7f3fc0]"
                        >
                            Update
                        </button>

                        </div>
                    )}
                    <p className="flex flex-col md:flex-row md:gap-1"><span className="font-medium">Username:</span> {user?.username}</p>
                    <hr />
                    <p className="flex flex-col md:flex-row md:gap-1"><span className="font-medium">Email address:</span> {user?.email}</p>
                    <hr />
                    <div className="flex items-center justify-between">
                    <p className="flex flex-col md:flex-row md:gap-1"><span className="font-medium">Password:</span> { user?.password}</p>
                    <button className="mr-5 text-red-500 text-[14px] font-medium px-2 py-1 rounded-lg flex items-center cursor-pointer"> change password? </button>
                    </div>
                    <hr />
                 </div>
            </div>
        </div>
        </div>
    )
}