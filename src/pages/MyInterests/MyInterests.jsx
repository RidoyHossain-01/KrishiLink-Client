import axios from "axios";
import React, { use, useEffect, useState } from "react";
import InterestCard from "./InterestCard";
import AuthContext from "../../context/AuthContext";

const MyInterests = () => {
  const [myInterests, setMyInterests] = useState([]);
  const {user} = use(AuthContext)

  useEffect(() => {
    axios(`http://localhost:3000/my-interests?email=${user.email}`).then((res) => {
      setMyInterests(res.data);
    });
  }, []);
 
  return (
    <div>
      {!myInterests.length ? (
        <p>No interests here</p>
      ) : 
      
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
     }
    </div>
  );
};

export default MyInterests;
