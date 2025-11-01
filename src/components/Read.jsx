import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailsSlice";
import CustomModel from "./CustomModel";
import { Link } from "react-router";

const Read = () => {
  const [id, setId] = useState();
  const [radioData, setRadioData] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return (
      <h2 className="text-2xl text-lime-500 text-center font-bold mt-10">
        Loading..
      </h2>
    );
  }

  //  delete handler
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId)).then(() => {

      dispatch(showUser());
    });
  };

  return (
    <div>
      {/* Gender Filter */}
      <div className="w-fit mx-auto flex items-center gap-3 mt-5">
        <label className="label font-bold flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            checked={radioData === ""}
            name="gender"
            onChange={() => setRadioData("")}
            className="radio radio-xs"
          />
          <span>All</span>
        </label>

        <label className="label font-bold flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={radioData === "male"}
            onChange={(e) => setRadioData(e.target.value)}
            className="radio radio-xs"
          />
          <span>Male</span>
        </label>

        <label className="label font-bold flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={radioData === "female"}
            onChange={(e) => setRadioData(e.target.value)}
            className="radio radio-xs"
          />
          <span>Female</span>
        </label>
      </div>

      {/* Popup */}
      {showPopup && (
        <CustomModel id={id} showPopup={showPopup} setShowPopup={setShowPopup} />
      )}

      {/* User List */}
      {users &&
        users
          .filter((ele) => {
            //  Search Filter
            if (searchData.length === 0) {
              return ele;
            } else {
              return ele.name.toLowerCase().includes(searchData.toLowerCase());
            }
          })
          .filter((ele) => {
            //  Gender Filter (All / Male / Female)
            if (radioData === "") {
              return ele; // All
            } else if (radioData === "male") {
              return ele.gender.toLowerCase() === "male";
            } else if (radioData === "female") {
              return ele.gender.toLowerCase() === "female";
            }
          })
          .map((ele) => (
            <div
              key={ele.id}
              className="card bg-white shadow-lg text-black w-96 h-60 mx-auto mt-10"
            >
              <div className="card-body items-center text-center ">
                <h2 className="card-title">{ele.name}</h2>
                <p>{ele.email}</p>
                <p>{ele.gender}</p>
                 
                <div className="card-actions justify-end">
                  <button
                    className="btn bg-lime-500 text-white w-24"
                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                  >
                    View
                  </button>
                 {/* Delete button ............................... */}
                  <button
                    className="btn bg-lime-500 text-white w-24"
                    onClick={() => handleDelete(ele.id)}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>

                  <Link to={`/edit/${ele.id}`}>
                  {/* view button .....................................*/}
                    <button className="btn bg-lime-500 text-white w-24">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Read;
