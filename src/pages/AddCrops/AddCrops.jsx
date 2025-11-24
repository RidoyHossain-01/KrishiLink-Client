import React, { use, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddCrops = () => {
const {user} = use(AuthContext)
const [dbUserData,setDbUserData]=useState(null)
const navigate = useNavigate();
// console.log(dbUserData);

// console.log(user);
useEffect(()=>{
     axios(`http://localhost:3000/users?email=${user.email}`)
     .then(res=>{
          setDbUserData(res.data)
          
     })
},[user])
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newCrop = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: form.pricePerUnit.value,
      unit: form.unit.value,
      quantity: form.quantity.value,
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
      createdAt: new Date(),
      interests:[],
      owner:{
          _id:dbUserData?._id,
           ownerEmail: user?.email,
            ownerName: user?.displayName,
      }
    };
     axios.post('http://localhost:3000/crops',newCrop)
     .then(res=>{
          console.log(res.data);
          if(res.data.acknowledged){
               toast.success('Crop added successfully')
               form.reset()
               navigate('/')  
          }
     })
     .catch(err=>{
          console.error(err);
     })
//     console.log(newCrop);
    // Send newCrop to backend using axios or fetch
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl card bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Crop Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Name */}
          <div className="form-control">
            <label className="label font-semibold">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Crop Name"
              className="input input-bordered"
              required
            />
          </div>

          {/* Type */}
          <div className="form-control">
            <label className="label font-semibold ">Type</label>
            <select name="type" className="select select-bordered" required>
              <option value="" disabled selected>
                Select type
              </option>
              <option>Vegetable</option>
              <option>Fruit</option>
              <option>Grain</option>
              <option>Herb</option>
              <option>Others</option>
            </select>
          </div>

          {/* Price per unit */}
          <div className="form-control">
            <label className="label font-semibold">Price per unit (৳)</label>
            <input
              name="pricePerUnit"
              type="number"
              placeholder="Price"
              className="input input-bordered"
              required
            />
          </div>

          {/* Unit */}
          <div className="form-control">
            <label className="label font-semibold">Unit</label>
            <select name="unit" className="select select-bordered" required>
              <option value="" disabled selected>
                Select unit
              </option>
              <option>kg</option>
              <option>ton</option>
              <option>bag</option>
            </select>
          </div>

          {/* Estimated quantity */}
          <div className="form-control">
            <label className="label font-semibold">Estimated Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              className="input input-bordered"
              required
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label font-semibold">Location</label>
            <input
              name="location"
              type="text"
              placeholder="Ex: Rajshahi"
              className="input input-bordered"
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control md:col-span-2">
            <label className="label font-semibold">Image URL</label>
            <input
              name="image"
              type="text"
              placeholder="https://example.com/crop.jpg"
              className="input input-bordered"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label font-semibold">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-28"
              placeholder="Short details about the crop..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCrops;
