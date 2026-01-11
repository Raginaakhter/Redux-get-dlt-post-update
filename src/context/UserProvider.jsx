import { useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // GET DATA
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // POST DATA (and show immediately)
  const addUser = async (userData) => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        userData
      );

      // ⭐ SAME DATA UI তে দেখানোর magic
      setUsers((prevUsers) => [...prevUsers, res.data]);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ users, getUsers, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
