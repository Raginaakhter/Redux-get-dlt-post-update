import React from 'react';
import { useSelector } from 'react-redux';

const CustomModel = ({ id,  setShowPopup }) => {

    const allusers = useSelector((state) => state.app.users)

    const singleUser = allusers.filter((ele) => ele.id === id)

    return (
        <div>
            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        bg-white shadow-2xl rounded-xl p-6 w-96 z-50 h-64"
            >
                <h2 className="text-xl font-semibold mb-3 text-center"> Name:
                    {singleUser[0].name}</h2>
                <h2 className="text-xl  mb-3 text-center"> Email:
                    {singleUser[0].email}</h2>
                <h2 className="text-xl  mb-3 text-center"> Gender:
                    {singleUser[0].gender}</h2>
                <h2 className="text-xl  mb-3 text-center"> Age:
                    {singleUser[0].age}</h2>

                <div className="flex justify-center mt-4">
                    <button className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-500" onClick={()=>setShowPopup(false)}>
                        close
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CustomModel;
