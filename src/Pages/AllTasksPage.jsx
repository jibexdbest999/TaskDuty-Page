import React, {useState, useEffect} from "react";
import NavBar from "../Components/NavBar";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { HashLoader } from "react-spinners"

export default function AllTasksPage({ tasks, deleteTask }) {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [pageIsLoading, setPageIsLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setPageIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);
  
    if (pageIsLoading) return <div className='flex flex-col mx-auto items-center justify-center h-screen'>
        <HashLoader color="#974FD0" size={55} />
        <p className='text-[18px] lg:text-[30px] pt-2 font-semibold text-[#974FD0]'>Loading...</p>
      </div>

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
      className="border border-purple-600 w-[123px] py-1 px-0.5 rounded text-gray-500 mt-5 shadow-md"
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
          task.tag === "Urgent"
            ? "b text-red-700"
            : task.tag === "Work"
            ? "bg-blue-100 text-blue-700"
            : "bg-emerald-100 text-emerald-700"
        }`}
        >
          {task.tag}
        </span>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/edittask/${task._id}`)}
          className="bg-[#974FD0] text-white text-[14px] font-medium px-4 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#8a45bd]"
        >
          <FaRegEdit /> <span>Edit</span>
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              deleteTask(task._id);
            }
          }}
          className="border border-[#974FD0] text-[#974FD0] text-[14px] font-medium px-4 py-1.5 rounded-lg flex items-center gap-1 hover:bg-gray-50"
        >
          <RiDeleteBinLine /> <span>Delete</span>
        </button>
      </div>
    </div>

    <hr className="text-[#B8B6B6] my-3" />

    <div className="px-3">
      <h3 className="font-semibold text-[20px]">{task.title}</h3>
      <p className="text-[#887f7f] text-[16px] mt-1">{task.description}</p>
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
