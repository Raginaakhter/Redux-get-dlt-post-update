import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailsSlice";
import { useNavigate } from "react-router";

const Create = () => {
  const [users, setUsers] = useState();


  const dispatch = useDispatch();

// Navigate

const navigate = useNavigate();

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })

  }


  const handleSubmit = (e) => {

    e.preventDefault();
    console.log("users :", users);
dispatch(createUser(users))
navigate("/read")


  };

  return (
 <div> 
  <h1 className="text-lime-500 font-bold text-2xl text-center mt-5">Fillup The Form</h1>
     <form onSubmit={handleSubmit}>
      <div className="card bg-base-100 w-full max-w-sm mx-auto mt-10 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label font-bold">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              placeholder="name"
              onChange={getUserData}
            />

            {/* Email */}
            <label className="label font-bold">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered"
              placeholder="email"
              onChange={getUserData}
            />

            {/* Age */}
            <label className="label font-bold">Age</label>
            <input
              type="text"
              name="age"
              className="input input-bordered"
              placeholder="age"
              onChange={getUserData}
            />

            {/* Gender */}
            <label className="label font-bold mt-2">Gender</label>
            <div className="flex items-center gap-3">
              <label className="label font-bold">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="radio radio-xs"
                  onChange={getUserData}
                />
                <span className="ml-1">Male</span>
              </label>

              <label className="label font-bold">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="radio radio-xs"
                  onChange={getUserData}
                />
                <span className="ml-1">Female</span>
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="btn bg-lime-500 text-white mt-4">
              Submit
            </button>
          </fieldset>
        </div>
      </div>
    </form>
 </div>
  );
};

export default Create;
