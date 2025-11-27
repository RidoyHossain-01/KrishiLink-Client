import axios from "axios";
import React, { use, useEffect, useState } from "react";
import InterestCard from "./InterestCard";
import AuthContext from "../../context/AuthContext";

const MyInterests = () => {
  const [myInterests, setMyInterests] = useState([]);
  const [sort,setSort]= useState('newest')
  const {user} = use(AuthContext)

  useEffect(() => {
  if (!user?.email) return;

  if (sort === "newest") {
    axios(`http://localhost:3000/my-interests/newest?email=${user.email}`).then((res) => {
      setMyInterests(res.data);
    });
  } else if (sort === "oldest") {
    axios(`http://localhost:3000/my-interests/oldest?email=${user.email}`).then((res) => {
      setMyInterests(res.data);
    });
  } else if (sort === "priceLow") {
    axios(`http://localhost:3000/my-interests/price-low-to-high?email=${user.email}`).then((res) => {
      setMyInterests(res.data);
    });
  } else if (sort === "priceHigh") {
    axios(`http://localhost:3000/my-interests/price-high-to-low?email=${user.email}`).then((res) => {
      setMyInterests(res.data);
    });
  }
}, [sort, user?.email]);

 
  return (
    <div>
      {!myInterests.length ? (
        <p>No interests here</p>
      ) : 
      <div>


        <div>
          <h1 className="text-4xl text-center font-bold text-primary">My Interests</h1>
        </div>

      {/* sorting  */}

       <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn m-1">
        Sort
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button onClick={() => setSort("priceHigh")}>
            Price: High to Low
          </button>
        </li>
        <li>
          <button onClick={() => setSort("priceLow")}>
            Price: Low to High
          </button>
        </li>
        <li>
          <button onClick={() => setSort("newest")}>Newest</button>
        </li>
        <li>
          <button onClick={() => setSort("oldest")}>Oldest</button>
        </li>
      </ul>
    </div>




{/* interest table */}


               <div className="overflow-x-auto ">
  <table className="table ">
    {/* head */}
    <thead>
      <tr>
        <th>Crop Name</th>
        <th className="hidden md:block">Owner</th>
        <th>Quantity</th>
        <th className="hidden md:block">Your Message</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
         (
        myInterests.map((interest) =>  <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{interest.cropName}</div>
              <div className="text-sm opacity-50">{interest.location}</div>
            </div>
          </div>
        </td>
        <td className=" hidden md:block">
          {interest.ownerName}
          <br />
          <span>{interest.ownerEmail}
          </span>
        </td>
        <td>
          {interest.quantity}
          <br />
          <span>
               total:{interest.totalPrice} ৳
          </span>
          

        </td>
        <td className="hidden md:block ">
          {interest.message}
        </td>
        <th>
          <button className="btn btn-sm btn-ghost">{interest.status}</button>
        </th>
      </tr>
        ))
     }
    
    </tbody>
    {/* foot */}
   
  </table>
</div>
        </div>
     
     }
    </div>
  );
};

export default MyInterests;
