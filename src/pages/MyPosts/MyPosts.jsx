import React, { use, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import CropRow from '../../components/CropRow';

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
                    !myposts.length?(<p>no posts here</p>):
                    myposts.map(crop=><CropRow key={crop._id} crop={crop}/>)

               }
               
          </div>
     );
};

export default MyPosts;