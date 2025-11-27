import React, { use, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import CropRow from '../../components/CropRow';
import { Link } from 'react-router';

const MyPosts = () => {
     const {user} = use(AuthContext);
     // console.log(user);

     const [myposts, setMyposts]=useState([])

     // console.log(myposts);
     
     
     
     useEffect(()=>{
          axios(`http://localhost:3000/all-crops?email=${user?.email}`)
          .then(res=>{
               setMyposts(res.data)
               
          })
     },[user.email])
     return (
          <div>

               {
                    !myposts.length?(<div className='flex flex-col justify-center min-h-svh items-center'>
                         <img className='w-52' src="https://i.ibb.co.com/q3pMjf0N/Gemini-Generated-Image-t8my2zt8my2zt8my.png" alt="" />
                    <p className=' font-bold text-4xl'>No posts available</p><Link className='btn bg-purple-500 text-base my-10' to={"/add-crops"}>Add your First Crop</Link>
                    </div>):
                    myposts.map(crop=><CropRow key={crop._id} crop={crop}/>)

               }
               
          </div>
     );
};

export default MyPosts;