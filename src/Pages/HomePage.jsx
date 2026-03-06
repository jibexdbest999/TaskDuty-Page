import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Body from "../Components/Body";
import { HashLoader } from "react-spinners";

export default function HomePage() {
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageIsLoading(false), 3000);
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
  return (
    <div>
      <NavBar />
      <Body />
    </div>
  );
}
