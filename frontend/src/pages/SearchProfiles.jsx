import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState, useRef } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchProfiles = () => {
  const [searchResults, setSearchResults] = useState(null);
  const searchRef = useRef();

  const searchUsers = async () => {
    const searchString = searchRef.current.value;
    if (!searchString || searchString.length === 0) {
      const { data } = await axios.post(`${API_BASE_URL}/search`);
      const { success, message, results } = data;

      if (!success)
        toast.error(message, {
          position: "top-right",
        });
      else {
        toast.success(message, {
          position: "top-right",
        });
        setSearchResults(results);
      }
    } else {
      const { data } = await axios.post(`${API_BASE_URL}/search/filter`, {
        searchString,
      });
      const { success, message, results } = data;

      if (!success)
        toast.error(message, {
          position: "top-right",
        });
      else {
        toast.success(message, {
          position: "top-right",
        });
        setSearchResults(results);
        console.log(searchResults);
      }
      return data;
    }
  };
  return (
    <div className="p-6">
      <SearchBar onSearch={searchUsers} ref={searchRef} />
      <div className=" searchContainer flex flex-row flex-wrap justify-around">
        {searchResults !== null && searchResults.length
          ? searchResults.map((profile) => {
              const { fullname, sport, role, state } = profile;
              const id = profile._id;
              console.log(id);
              return (
                <ProfileCard
                  key={id}
                  fullname={fullname}
                  sport={sport}
                  role={role}
                  state={state}
                />
              );
            })
          : undefined}
      </div>
      <ToastContainer />
    </div>
  );
};
export default SearchProfiles;
