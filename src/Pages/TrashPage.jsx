import React, { useState, useEffect } from "react"
import NavBar from "../Components/NavBar";
import { HashLoader } from "react-spinners";
import { MdOutlineRestore } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsFillTrash3Fill } from "react-icons/bs";

export default function TrashPage({
  trashedTasks = [],
  restoreTask,
  deleteTaskPermanent
}) {

    const [pageIsLoading, setPageIsLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState("");
    
        useEffect(() => {
            const timer = setTimeout(() => setPageIsLoading(false), 2000);
            return () => clearTimeout(timer);
          }, []);

        if (pageIsLoading)
              return (
                <div className="flex flex-col mx-auto items-center justify-center h-screen">
                  <HashLoader color="#974FD0" size={55} />
                  <p className="text-[18px] lg:text-[30px] pt-2 font-semibold text-[#974FD0]">
                    Loading...
                  </p>
                </div>
        );

    const filteredTasks = trashedTasks.filter((task) => {
        if (!categoryFilter) return true;
        return task.category === categoryFilter;
    });

    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    };    

    return(
        <div>
          <NavBar/>

            <div className="flex flex-col container mx-auto my-5 px-5">
                  <h2 className="text-[25px] font-medium">
                  <span><BsFillTrash3Fill /></span>
                    Trashed Tasks
                  </h2>
               

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
                    {trashedTasks.length === 0 && (
                    <p className="text-[#B8B6B6] text-center text-[25px] md:text-[35px]">
                        Trash is empty.
                    </p>
                    )}

                    {filteredTasks.map((task) => (
                <div
                    key={task._id}
                    className="border border-[#B8B6B6] rounded-xl py-4 px-4 bg-white shadow-sm"
                >
                <div className="flex justify-between gap-1 items-start px-3">
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
                    onClick={() => restoreTask(task._id)}
                    className="bg-green-600 w-fit h-fit text-white text-[14px] font-medium px-1.5 md:px-3 py-1.5 rounded-lg flex items-center md:gap-1 hover:bg-green-700"
                  >
                    <MdOutlineRestore />
                    <span>Restore</span>
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to permanently delete this task?"
                        )
                      ) {
                        deleteTaskPermanent(task._id);
                      }
                    }}
                    className="bg-red-600 w-fit h-fit text-white text-[14px] font-medium px-1.5 md:px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-red-700"
                  >
                    <RiDeleteBinLine />
                  <span>Delete</span>
                  </button>
                </div>
              </div>

              <hr className="text-[#B8B6B6] my-3" />

              <div className="px-3">
                <h3 className="font-semibold text-[20px]">
                  {task.title}
                </h3>

                <p className="text-[#887f7f] text-[16px] mt-1">
                  {task.description}
                </p>
              </div>
              </div>
              ))}
              </div>

                <button
                    onClick={scrollToTop}
                    className="text-[#974FD0] mt-5"
                >
                    Back To Top
                </button>              
            </div>
        </div>
    )
}