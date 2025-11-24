import axios from "axios";
import React, { useEffect, useState } from "react";

import CorpCard from "../../components/CorpCard";

const Home = () => {
  const [latest,setLatest]=useState(null)
  console.log(latest);
  
  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => {
        setLatest(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {
        latest?.map(crop=><CorpCard key={crop._id} crop={crop}/>)
      }
    </div>

  )

  
}
  


export default Home;
