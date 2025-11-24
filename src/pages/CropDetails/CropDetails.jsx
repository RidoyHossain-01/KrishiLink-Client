import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AuthContext from '../../context/AuthContext';

const CropDetails = () => {
     const {id} =useParams()
     // const {user}= use(AuthContext)
     // console.log(user);
     // console.log(user?.email);
     
     
     const [cropDetails,setCropDetails]=useState([])
     // const [checkOwner,setCheckOwner]=useState(false)
     // console.log(cropDetails);
     
     useEffect(()=>{
          axios(`http://localhost:3000/crops/${id}`)
          .then(res=>{
               
               setCropDetails(res.data)
               
          })
     },[id])
     console.log(cropDetails);
     

     // console.log(cropDetails.owner.ownerEmail);
     
     // if(user?.email===cropDetails?.owner.ownerEmail){
     //      console.log('owner');
          
     // }
     // else{
     //      console.log('not owner');
          
     // }
     
     return (
          <div>
               
          </div>
     );
};

export default CropDetails;