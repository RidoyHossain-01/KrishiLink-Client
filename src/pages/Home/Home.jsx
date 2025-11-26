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
          <h1 className="text-center font-bold text-5xl mt-32 mb-5">Explore our latest <br /> <span className="text-primary">
            Products
            </span> </h1>
        <p className="text-center text-xl mb-14">Explore all the fresh products we have to offer, fresh from the farm to your doorsteps</p>




          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {
        latest?.map(crop=><CorpCard key={crop._id} crop={crop}/>)
      }
    </div>

      <Link className="btn btn-primary flex my-16" to={'/all-crops'}>View all Crops</Link>
        </section>

        <section className="mx-auto">
          <div className="py-12 bg-base-100">
  <h2 className="text-5xl font-bold text-center mb-10 text-primary">How It Works</h2>

  <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
    <div className="card bg-base-200 p-6 text-center shadow-lg">
      <h3 className="text-xl font-semibold text-primary">1. Post Your Crop</h3>
      <p className="mt-2">Upload crop details and reach thousands of buyers.</p>
    </div>

    <div className="card bg-base-200 p-6 text-center shadow-lg">
      <h3 className="text-xl font-semibold text-primary">2. Get Buyer Interests</h3>
      <p className="mt-2">Buyers send offers with their desired quantity.</p>
    </div>

    <div className="card bg-base-200 p-6 text-center shadow-lg">
      <h3 className="text-xl font-semibold text-primary">3. Negotiate</h3>
      <p className="mt-2">Review offers, accept, decline, or negotiate easily.</p>
    </div>

    <div className="card bg-base-200 p-6 text-center shadow-lg">
      <h3 className="text-xl font-semibold text-primary">4. Complete the Deal</h3>
      <p className="mt-2">Finalize the trade and deliver the crop.</p>
    </div>
  </div>
</div>

        </section>
      
    </div>


    

  )

  
}
  


export default Home;
