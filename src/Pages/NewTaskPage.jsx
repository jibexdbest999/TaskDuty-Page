import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners"

export default function NewTaskPage({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState(null);

  const [pageIsLoading, setPageIsLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setPageIsLoading(false), 3000);
      return () => clearTimeout(timer);
    }, []);

  const options = ["Urgent", "Important"];
  const [open, setOpen] = useState(false);

  const toggleTag = (tag) => {
    setSelected(tag);
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !selected) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      tag: selected,
    };

    addTask(newTask);

    navigate("/mytask");
  };

  if (pageIsLoading) return <div className='flex flex-col mx-auto items-center justify-center h-screen'>
        <HashLoader color="#974FD0" size={55} />
        <p className='text-[18px] lg:text-[30px] pt-2 font-semibold text-[#974FD0]'>Loading...</p>
      </div>

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <NavBar />

      <div className="flex flex-col container mx-auto my-5 px-5">
        <div className="flex items-center ml-[-8px] md:ml-[-7px] mb-3">
          <Link to="/">
            <MdOutlineKeyboardArrowLeft size={25} />{" "}
          </Link>
          <h2 className="text-[20px] font-medium">New Task</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="relative w-full">
            <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 pt-2 pb-3">
              <legend className="text-gray-500 text-[15px] px-1">
                Task Title
              </legend>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g Project Defense, Assignment ..."
                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
              />
            </fieldset>
          </div>

          <div className="w-full">
            <fieldset className="border border-gray-300 focus-within:border-[#974FD0] rounded-md px-3 pt-2 pb-3">
              <legend className="text-gray-500 text-[15px] px-1">
                Description
              </legend>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe your task..."
                className="w-full outline-none text-[17px] placeholder-gray-400 bg-transparent"
              />
            </fieldset>
          </div>

          <div className="relative w-full">
            <fieldset
              onClick={() => setOpen(!open)}
              className="border border-gray-300 rounded-md px-3 pt-2 pb-3 cursor-pointer focus-within:border-[#974FD0] transition"
            >
              <legend className="text-gray-500 text-sm px-1">Tags</legend>

              <div className="flex flex-wrap gap-2 items-center">
                {selected && (
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                    {selected}{" "}
                  </span>
                )}

                <IoChevronDown className="ml-auto text-gray-500" />
              </div>
            </fieldset>

            {open && (
              <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => toggleTag(option)}
                    className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                      selected === option ? "bg-gray-100" : ""
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
