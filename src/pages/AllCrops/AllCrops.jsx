import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CorpCard from '../../components/CorpCard';

const AllCrops = () => {
     const [crops,setCrops]=useState([])


       useEffect(() => {
    
      axios.get("http://localhost:3000/all-crops")
      .then((res) => {
        console.log(res.data);
            setCrops(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
               crops.map(crop=><CorpCard key={crop?._id} crop={crop}/>
               )
              }
          </div>
     );
};

export default AllCrops;