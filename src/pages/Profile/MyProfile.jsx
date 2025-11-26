import React, { use, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router";
import axios from "axios";


const MyProfile = () => {

  const [length,setLength] = useState(0)
  // console.log(length);
  
  const {user} = use (AuthContext)
  // console.log(user);
   useEffect(()=>{
          axios(`http://localhost:3000/all-crops?email=${user?.email}`)
          .then(res=>{
              
             setLength(res.data.length)
              
               
          })
     },[user.email])

    //  console.log(user);
     
  
  
  return (
    <div className="min-h-screen bg-green-50 p-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 border border-green-200">
        {/* Top – Profile Section */}
        <div className="flex flex-col items-center text-center">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
              <img src={user.photoURL} alt="profile" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-green-700 mt-4">
            {user.displayName}
          </h1>

          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>

          <div className="badge  mt-3">
            Joined: {user.metadata.creationTime}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <div className="stat bg-green-100 rounded-xl p-4 text-center shadow-sm">
            <div className="stat-title text-green-700 font-semibold">Posts</div>
            <div className="stat-value text-green-600">{length}</div>
          </div>

          <div className="stat bg-green-100 rounded-xl p-4 text-center shadow-sm">
            <div className="stat-title text-green-700 font-semibold">
              Followers
            </div>
            <div className="stat-value text-green-600">230</div>
          </div>

          <div className="stat bg-green-100 rounded-xl p-4 text-center shadow-sm">
            <div className="stat-title text-green-700 font-semibold">
              Following
            </div>
            <div className="stat-value text-green-600">148</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
          <Link to={'/my-posts'} className="btn btn-success btn-lg text-white w-full md:w-1/2">
            View Posted Crops
          </Link>

          <button className="btn btn-outline btn-success btn-lg w-full md:w-1/2">
            Edit Profile
          </button>
        </div>

        {/* About Section */}
        <div className="mt-10 bg-green-100 p-5 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-green-700">About Me</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Hello! I'm {user.displayName}, a passionate farmer and seller on KrishiLink. I
            aim to connect buyers with the freshest, best-quality crops grown
            locally.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
