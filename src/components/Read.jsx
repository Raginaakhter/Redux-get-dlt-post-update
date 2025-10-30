import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../features/userDetailsSlice";


const Read = () => {

const dispatch = useDispatch()

const {users,loading} = useSelector((state)=>state.app)

useEffect(()=>{
  dispatch(showUser())
},[dispatch])

if(loading){
  return (<h2 className="text-2xl text-lime-500 text-center font-bold mt-10">Loading..</h2>)
}

  return (
    <div>
   { users && users.map((ele)=>( <div className="card bg-white shadow-lg text-black w-96 h-60 mx-auto mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{ele.name}</h2>
          <p>{ele.email}</p>
          <p>{ele.gender}</p>
          <div className="card-actions justify-end">
              <button className="btn bg-lime-500 text-white w-24">view</button>
            <button className="btn bg-lime-500 text-white w-24">Edit</button>
            <button className="btn bg-lime-500 text-white w-24">Delete</button>
          
          </div>
        </div>
      </div>))}
    </div>
  );
};

export default Read;