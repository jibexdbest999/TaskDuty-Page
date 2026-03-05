import React from "react";
import NavBar from "../Components/NavBar";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

export default function AllTasksPage({ tasks, deleteTask }) {
  const navigate = useNavigate();
  
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

        <div className="mt-6 flex flex-col gap-6">
          {tasks.length === 0 && (
            <p className="text-[#B8B6B6] text-center text-[25px] md:text-[35px]">No tasks yet.</p>
          )}

          {tasks.map((task) => (
            <div
              key={task.id}
              className="border border-[#B8B6B6] rounded-md py-3"
            >
              <div className="flex justify-between items-start px-3">
                <div>
                  <p
                    className={`text-[12px] font-medium px-2 py-1 rounded w-fit ${
                      task.tag === "Urgent"
                        ? "bg-[#ffff] text-[#F38383]"
                        : "bg-[#ffff] text-[#73C3A6]"
                    }`}
                  >
                    {task.tag}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/edittask/${task.id}`)}
                    className="bg-[#974FD0] text-white text-[14px] font-medium px-3 py-1 rounded flex items-center gap-1"
                  >
                    <FaRegEdit /> <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this task?")) {
                        deleteTask(task.id);
                      }
                    }}
                    className="border border-[#974FD0] text-[#974FD0] text-[14px] font-medium px-3 py-1 rounded flex items-center gap-1 cursor-pointer"
                  >
                    <RiDeleteBinLine /> <span>Delete</span>
                  </button>
                </div>
              </div>
              <hr className="text-[#B8B6B6] mt-3" />
              <div className="px-3 py-2">
                <h3 className="font-semibold text-[20px]">{task.title}</h3>
                <p className="text-[#887f7f] text-[16px]">{task.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
        onClick={scrollToTop}
        className="text-[#974FD0] mt-5">Back To Top</button>
      </div>
    </div>
  );
}
