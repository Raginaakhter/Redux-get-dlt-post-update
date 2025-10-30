import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { updateUser } from '../features/userDetailsSlice';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { users, loading } = useSelector((state) => state.app);

  console.log(id, "id in update component");

  const [updateData, setUpdateData] = useState({}); 

  const dispatch = useDispatch();

  useEffect(() => {
    if (id && users?.length) {
      const singleUser = users.find((ele) => ele.id === id);
      console.log(singleUser, "single user in update component");
      setUpdateData(singleUser);
    }
  }, [id, users]);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  }; 
console.log(updateData);
  return (
    <div>
      <h1 className="text-lime-500 font-bold text-2xl text-center mt-5">Fillup The Form</h1>
      <form className='' onSubmit={handleSubmit}>
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
                value={updateData?.name || ""}
                onChange={newData}
              />

              {/* Email */}
              <label className="label font-bold">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                placeholder="email"
                value={updateData?.email || ""}
                onChange={newData}
              />

              {/* Age */}
              <label className="label font-bold">Age</label>
              <input
                type="text"
                name="age"
                className="input input-bordered"
                placeholder="age"
                value={updateData?.age || ""}
                onChange={newData}
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
                    checked={updateData?.gender === "male"}
                    onChange={newData}
                  />
                  <span className="ml-1">Male</span>
                </label>

                <label className="label font-bold">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="radio radio-xs"
                    checked={updateData?.gender === "female"}
                    onChange={newData}
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

export default Update;
