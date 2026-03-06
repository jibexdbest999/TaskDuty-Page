import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import { HashLoader } from "react-spinners";

export default function EditTaskPage({ tasks, updateTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const options = ["Urgent", "Important"];
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState(null);

  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!tasks) return;
    const taskToEdit = tasks.find((task) => task.id.toString() === id);

    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setSelected(taskToEdit.tag);
    }
  }, [id, tasks]);

  const toggleTag = (tag) => {
    setSelected(tag);
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !selected) return;

    const updatedTask = {
      id: Number(id),
      title,
      description,
      tag: selected,
    };

    updateTask(updatedTask);

    navigate("/mytask");
  };

  if (pageIsLoading)
    return (
      <div className="flex flex-col mx-auto items-center justify-center h-screen">
        <HashLoader color="#974FD0" size={55} />
        <p className="text-[18px] lg:text-[30px] pt-2 font-semibold text-[#974FD0]">
          Loading...
        </p>
      </div>
    );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <NavBar />

      <div className="flex flex-col container mx-auto my-5 px-5">
        <div className="flex items-center ml-[-8px] md:ml-[-7px] mb-3">
          <Link to="/mytask">
            <MdOutlineKeyboardArrowLeft size={25} />
          </Link>
          <h2 className="text-[20px] font-medium">Edit Task</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="relative w-full">
            <fieldset className="border border-[#d1d5db] focus-within:border-[#974FD0] rounded-md px-3 pt-2 pb-3">
              <legend className="text-[#6b7280] text-[15px] px-1">
                Task Title
              </legend>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full outline-none text-sm bg-transparent"
              />
            </fieldset>
          </div>

          <div className="w-full">
            <fieldset className="border border-[#d1d5db] focus-within:border-[#974FD0] rounded-md px-3 pt-2 pb-3">
              <legend className="text-[#6b7280] text-[15px] px-1">
                Description
              </legend>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full outline-none text-[17px] bg-transparent"
              />
            </fieldset>
          </div>

          <div className="relative w-full">
            <fieldset
              onClick={() => setOpen(!open)}
              className="border border-[#d1d5db] rounded-md px-3 pt-2 pb-3 cursor-pointer focus-within:border-[#974FD0] transition"
            >
              <legend className="text-[#6b7280] text-[14px] px-1">Tags</legend>

              <div className="flex flex-wrap gap-2 items-center">
                {selected && (
                  <span className="bg-gray-200 text-gray-700 text-[12px] px-2 py-1 rounded">
                    {selected}
                  </span>
                )}
                <IoChevronDown className="ml-auto text-[#6b7280]" />
              </div>
            </fieldset>

            {open && (
              <div className="absolute w-full mt-1 bg-white border border-[#e5e7eb] rounded-md shadow-md z-10">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => toggleTag(option)}
                    className={`px-3 py-2 text-sm hover:bg-[#f3f4f6] cursor-pointer ${
                      selected === option ? "bg-[#f3f4f6]" : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#974FD0] rounded-md font-medium py-3 text-[#FAF9FB]"
          >
            Done
          </button>
        </form>

        <button onClick={scrollToTop} className="text-[#974FD0] mt-5">
          Back To Top
        </button>
      </div>
    </div>
  );
}
