import axios from "axios";
import React, { useEffect, useState } from "react";

import CorpCard from "../../components/CorpCard";
import HeroSlider from "../../components/HeroSliders";
import { Link } from "react-router";
import { MdPostAdd } from "react-icons/md";
import { GiBuyCard } from "react-icons/gi";
import { IoMdChatbubbles } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";

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
      <span className="text-5xl text-accent mx-auto"><MdPostAdd /></span>
      <h3 className="text-xl font-semibold text-primary">1. Post Your Crop</h3>
      <p className="mt-2">Upload crop details and reach thousands of buyers.</p>
    </div>

    <div className="card bg-base-200 p-6 text-center shadow-lg">
      <span className="text-5xl text-accent mx-auto"><GiBuyCard /></span>
      <h3 className="text-xl font-semibold text-primary">2. Get Buyer Interests</h3>
      <p className="mt-2">Buyers send offers with their desired quantity.</p>
    </div>

    <div className="card bg-base-200 p-6 text-center shadow-lg">
      <span className="text-5xl text-accent mx-auto"><IoMdChatbubbles /></span>
      <h3 className="text-xl font-semibold text-primary">3. Negotiate</h3>
      <p className="mt-2">Review offers, accept, decline, or negotiate easily.</p>
    </div>

    <div className="card bg-base-200 p-6 text-center shadow-lg">
      <span className="text-5xl text-accent mx-auto"><CiDeliveryTruck /></span>
      <h3 className="text-xl font-semibold text-primary">4. Complete the Deal</h3>
      <p className="mt-2">Finalize the trade and deliver the crop.</p>
    </div>
  </div>
</div>

        </section>


        {/* agro blog */}
        <section>
            <div className="py-12 bg-base-100">
  <h2 className="text-5xl font-bold text-center mb-10 text-primary">Latest Agro News</h2>

  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
    
    <div className="card bg-base-200 shadow-lg">
      <figure>
        <img className="h-52" src="https://i.ibb.co.com/pjbydV4F/winter-crops.jpg" alt="Agro News"/>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-primary">Best Winter Crops to Grow</h3>
        <p>Learn which crops can give the highest profit this season.</p>
        <button className="btn btn-primary btn-sm mt-3">Read More</button>
      </div>
    </div>

    <div className="card bg-base-200 shadow-lg">
      <figure>
        <img className="h-52" src="https://i.ibb.co.com/Q7nKGVjQ/Modern-Farming-Techniques-Boosting-Productivity-with-Innovation-2-scaled.jpg" alt="Tech News"/>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-primary">Modern Farming Techniques</h3>
        <p>Discover smart ways to boost your farm productivity.</p>
        <button className="btn btn-primary btn-sm mt-3">Read More</button>
      </div>
    </div>

    <div className="card bg-base-200 shadow-lg">
      <figure>
        <img className="h-52" src="https://i.ibb.co.com/hFKKxrKx/farm-fresh-vegetables-market-organic-natural-healthy-food-creative-price-list-design-concept-agricul.webp" alt="Market"/>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-primary">Market Price Updates</h3>
        <p>Stay updated with the latest prices of essential crops.</p>
        <button className="btn btn-primary btn-sm mt-3">Read More</button>
      </div>
    </div>

  </div>
</div>
        </section>


        

        <section className="my-15">
          <h1 className="text-4xl font-bold text-primary text-center">Frequently Asked Questions</h1>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title font-semibold">How do I create an account?</div>
  <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
  <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">How do I update my profile information?</div>
  <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>
        </section>
      

      
    </div>


    

  )

  
}
  


export default Home;
