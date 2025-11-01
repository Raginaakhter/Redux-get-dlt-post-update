import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailsSlice";
import CustomModel from "./CustomModel";
import { Link } from "react-router";


const Read = () => {

  const [id, setId] = useState();

  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch()

  const { users, loading,searchData } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(showUser())
  }, [dispatch])

  if (loading) {
    return (<h2 className="text-2xl text-lime-500 text-center font-bold mt-10">Loading..</h2>)
  }

  return (
    <div>
      {showPopup && <CustomModel id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
      {users && 
      
      users.filter((ele)=>{
        if(searchData.length ===0){
          return ele 
        }else{
          return ele.name.toLowerCase().includes(searchData.toLowerCase())
        }
      })
      
      .map((ele) => (<div key={ele.id} className="card bg-white shadow-lg text-black w-96 h-60 mx-auto mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{ele.name}</h2>
          <p>{ele.email}</p>
          <p>{ele.gender}</p>
          <div className="card-actions justify-end">
            <Link> <button className="btn bg-lime-500 text-white w-24" onClick={() => [setId(ele.id), setShowPopup(true)]}>view</button></Link>
            <Link to ="/delete">    <button className="btn bg-lime-500 text-white w-24" onClick={()=>dispatch(deleteUser(ele.id)) }>Delete</button></Link>
            <Link to ={`/edit/${ele.id}`}> <button className="btn bg-lime-500 text-white w-24">Edit</button></Link>

          </div>
        </div>
      </div>))}
    </div>
  );
};

export default Read;