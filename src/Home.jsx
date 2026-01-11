import { useEffect, useState } from "react";
import { useUser } from "./context/UserContext";

const Home = () => {
  const { users, getUsers, addUser } = useUser();

  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill all fields");
      return;
    }

    addUser(formData);
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md font-sans">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        User List
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        users.map((user, idx) => (
          <div
            key={idx}
            className="bg-blue-50 rounded-md p-4 mb-4 shadow-sm border border-blue-200"
          >
            <p className="text-lg font-semibold text-blue-900">{user.name}</p>
            <p className="text-sm text-blue-700">{user.email}</p>
          </div>
        ))
      )}

      <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-5">
        Add New User
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default Home;
