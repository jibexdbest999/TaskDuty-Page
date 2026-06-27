import React from "react";

export default function SkeletonTask() {
  return (
    <div>
       <div className="border border-[#B8B6B6] rounded-xl py-4 px-4 bg-white shadow-sm animate-pulse">
        <div className="flex justify-between items-start px-3">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>

        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
        </div>
        </div>

        <hr className="my-3" />

        <div className="px-3">
            <div className="h-6 w-2/3 bg-gray-200 rounded mb-3"></div>

            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>

            <div className="h-4 w-4/5 bg-gray-200 rounded mb-3"></div>

            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>
  );
}