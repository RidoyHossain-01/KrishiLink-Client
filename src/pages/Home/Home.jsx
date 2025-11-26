import axios from "axios";
import React, { useEffect, useState } from "react";

import CorpCard from "../../components/CorpCard";
import HeroSlider from "../../components/HeroSliders";
import { Link } from "react-router";

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
    <div>

      <div className="w-full ">
            <HeroSlider/>
      </div>

        <section className="mx-auto ">
          <h1 className="text-center font-bold text-5xl mt-32 mb-5">Explore our latest <br /> Products</h1>
        <p className="text-center text-xl mb-14">Explore all the fresh products we have to offer, fresh from the farm to your doorsteps</p>




          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {
        latest?.map(crop=><CorpCard key={crop._id} crop={crop}/>)
      }
    </div>

      <Link className="btn btn-primary flex my-16" to={'/all-crops'}>View all Crops</Link>
        </section>
      
    </div>


    

  )

  
}
  


export default Home;
