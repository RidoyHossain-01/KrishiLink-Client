import React, { use, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import CropRow from "../../components/CropRow";
import { Link } from "react-router";
import Loader from "../../components/Loader";

const MyPosts = () => {
  const { user } = use(AuthContext);
  // console.log(user);

  const [myposts, setMyposts] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(myposts);

  useEffect(() => {
    axios(
      `https://krishi-link-server-omega.vercel.app/all-crops?email=${user?.email}`
    ).then((res) => {
      setLoading(false);
      setMyposts(res.data);
    });
  }, [user.email]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {!myposts.length ? (
        <div className="flex flex-col justify-center min-h-svh items-center">
          <img
            className="w-52"
            src="https://i.ibb.co.com/q3pMjf0N/Gemini-Generated-Image-t8my2zt8my2zt8my.png"
            alt=""
          />
          <p className=" font-bold text-4xl">No posts available</p>
          <Link className="btn bg-purple-500 text-base my-10" to={"/add-crops"}>
            Add your First Crop
          </Link>
        </div>
      ) : (
        myposts.map((crop) => <CropRow key={crop._id} crop={crop} />)
      )}
    </div>
  );
};

export default MyPosts;
