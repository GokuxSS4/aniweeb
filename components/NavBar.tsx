import Link from "next/link";

import { CiSearch } from "react-icons/ci";

export function NavBar() {
  return (
    <nav className="w-full bg-transparent h-16 absolute z-50">
      <div className="mx-auto flex items-center justify-between py-4 px-12">
        <h1 className="">Aniweeb.tv</h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search anime..."
            className="bg-slate-200 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  );
}
