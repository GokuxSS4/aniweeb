"use client";

import { useState } from "react";

function Input({ title, values }: { title: string; values: string[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(values[0]);
  
    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
    };
  
    return (
      <div className="flex flex-col gap-2 text-white">
        <h4 className="title font-semibold text-gray-300">{title}</h4>
        <div className="relative">
          <button
            className="w-full p-3 bg-gray-800 text-gray-200 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedValue}
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-gray-900 mt-2 rounded-md shadow-lg z-10">
              <div className="flex flex-col">
                {values.map((value, index) => (
                  <div
                    className="w-full py-2 text-center text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white"
                    key={index}
                    onClick={() => handleSelect(value)}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
export function Filter() {
  return (
    <div className="w-full h-full">
      <h1>Filter</h1>
      <div>
        <Input title="Format" values={["any", "tv", "movie", "ova", "ona"]} />
      </div>
    </div>
  );
}
