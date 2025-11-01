import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { searchUser } from "../features/userDetailsSlice";


const Navber = () => {

const dispatch =useDispatch()
const allusers = useSelector((state)=>state.app.users)
const [searchData,setSearchData] = useState("")

useEffect(() => {
  dispatch(searchUser(searchData));
}, [searchData, dispatch]);



  return (
    <div className="bg-slate-400 ">
      <div className="navbar bg-lime-500 shadow-sm">
        <div className="flex-1 flex ">
          <Link to ="/create" className="btn btn-ghost text-3xl text-white font-bold ">My App</Link>
         <div className="flex-1">
           <Link to ="/create" className="btn btn-ghost text-1xl text-white font-bold ">Create Post</Link>
          <Link to ="/read" className="btn btn-ghost text-1xl text-white font-bold ">All Post {(allusers.length)} </Link>
         </div>
        </div>
        <div className="flex gap-2">
          <input type="text"
           placeholder="Search"
           className="input input-bordered w-24 md:w-auto"
           onChange={(e)=>setSearchData(e.target.value)}
           
           
           
           />


          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navber;