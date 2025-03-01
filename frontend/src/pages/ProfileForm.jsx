const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// List of popular sports in India
const sportsList = [
  "Cricket",
  "Football",
  "Badminton",
  "Hockey",
  "Tennis",
  "Table Tennis",
  "Kabaddi",
  "Athletics",
  "Wrestling",
  "Boxing",
  "Shooting",
  "Archery",
  "Weightlifting",
  "Basketball",
  "Volleyball",
  "Swimming",
  "Cycling",
  "Gymnastics",
  "Golf",
  "Chess",
];

// List of Indian States and Union Territories
const statesList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];

const ProfileForm = () => {
  const navigate = useNavigate();
  const { username, userId } = useAuth();
  const [formData, setFormData] = useState({
    fullname: username,
    dob: "",
    sport: "",
    state: "",
    role: "player",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`${API_BASE_URL}/${formData.role}/create`);
      const { data } = await axios.post(
        `${API_BASE_URL}/${formData.role}/create`,
        {
          ...formData,
          userId,
        }
      );
      const { success, message } = data;
      console.log(data);
      if (success) {
        toast.success(message, { position: "top-right" });
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(message, {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="flex gap-4">
            <label
              className={`flex items-center px-4 py-2 rounded-md  ${
                formData.role === "player"
                  ? "bg-blue-500 text-white"
                  : undefined
              }`}>
              <input
                type="radio"
                name="role"
                value="player"
                checked={formData.role === "player"}
                onChange={handleChange}
                className="mr-2 hidden"
              />
              Player
            </label>
            <label
              className={`flex items-center px-4 py-2 rounded-md  ${
                formData.role === "coach" ? "bg-blue-500 text-white" : undefined
              }`}>
              <input
                type="radio"
                name="role"
                value="coach"
                checked={formData.role === "coach"}
                onChange={handleChange}
                className="mr-2 hidden"
              />
              Coach
            </label>
          </div>
        </div>

        {/* Sport Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sport
          </label>
          <select
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="">Select Sport</option>
            {sportsList.map((sport, index) => (
              <option key={index} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="">Select State</option>
            {statesList.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Save Profile
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProfileForm;
