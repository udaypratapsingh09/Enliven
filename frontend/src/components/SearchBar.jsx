import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, ref }) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex gap-2 mb-4 items-center border border-gray-300 rounded-md p-2 w-80 bg-white">
      <input
        ref={ref}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search athletes..."
        className="flex-1 outline-none"
      />
      <button onClick={onSearch} className="text-blue-500">
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
