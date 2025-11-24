import React, { use, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const MyPosts = () => {
     const {user} = use(AuthContext);
     
     
     useEffect(()=>{
          axios(`http://localhost:3000/all-crops?email=${user?.email}`)
          .then(res=>{
               console.log(res.data);
               
          })
     },[])
     return (
          <div>
               My Posts Page
          </div>
     );
};

export default MyPosts;