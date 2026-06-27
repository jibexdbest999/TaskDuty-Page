import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import SkeletonTask from "../Components/SkeletonTask";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";

export default function AllTasksPage({ tasks, deleteTask, pageIsLoading }) {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("");
  
    if (pageIsLoading)
      return (
        <div>
          <NavBar />

          <div className="container mx-auto px-5 mt-6 flex flex-col gap-6">
            {[...Array(5)].map((_, index) => (
              <SkeletonTask key={index} />
            ))}
          </div>
        </div>
    );

  const filteredTasks = tasks.filter((task) => {
    if (!categoryFilter) return true;

  return task.category === categoryFilter;
  });
  
  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <div>
      <NavBar />
      <div className="flex flex-col container mx-auto my-5 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[25px] font-medium">My Task</h2>
          <Link
            to="/newtask"
            className="text-[#974FD0] font-medium flex items-center gap-2 text-[15px]"
          >
            <IoMdAdd size={20} />
            <span>Add New Task</span>
          </Link>
        </div>

    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="border border-purple-600 w-[120px] py-1 px-0.5 rounded text-gray-500 mt-5 shadow-md"
    >
    <option>Filter by:</option>
    <option value="">All categories</option>
    <option value="Work">Work</option>
    <option value="Personal">Personal</option>
    <option value="Urgent">Urgent</option>
  </select>

        <div className="mt-6 flex flex-col gap-6">
          {tasks.length === 0 && (
            <p className="text-[#B8B6B6] text-center text-[25px] md:text-[35px]">No tasks yet.</p>
          )}

        {filteredTasks.map((task) => (
        <div
          key={task._id}
          className="border border-[#B8B6B6] rounded-xl py-4 px-4 bg-white shadow-sm"
        >
        <div className="flex justify-between items-start px-3">
        <span
          className={`inline-block text-[13px] font-semibold px-3 py-1.5 rounded-full w-fit ${
          task.category === "Urgent"
            ? "bg-red-100 text-red-700"
            : task.category === "Work"
            ? "bg-blue-100 text-blue-700"
            : task.category === "Personal"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-gray-100 text-gray-700"
        }`}
        >
          {task.category}
        </span>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/edittask/${task._id}`)}
          className="bg-[#974FD0] text-white text-[14px] font-medium px-3 py-1.5 ml-1 rounded-lg flex items-center gap-1 hover:bg-[#8a45bd]"
        >
          <FaRegEdit /> <span>Edit</span>
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to move task to trash?")) {
              deleteTask(task._id);
            }
          }}
          className="border border-[#974FD0] text-[#974FD0] text-[14px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-gray-50"
        >
          <RiDeleteBinLine /> <span>Delete</span>
        </button>
      </div>
    </div>

    <hr className="text-[#B8B6B6] my-3" />

    <div className="px-3">
      <h3 className="font-semibold text-[20px]">{task.title}</h3>
      <p className="text-[#887f7f] text-[16px] mt-1">{task.description}</p>
      <p className="text-gray-500 text-sm mt-2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      </div>
    </div>
    ))}
        </div>

        <Link
          to="/trash"
          className="hidden md:flex ml-auto mr-1 items-center border-2 border-red-500 w-fit px-2 py-1.5 rounded-md text-red-500 font-medium my-3"
        >
          <span><BsFillTrash3Fill/></span> Trash
        </Link>

        <button 
        onClick={scrollToTop}
        className="text-[#974FD0] my-3">Back To Top</button>
      </div>
    </div>
  );
}
