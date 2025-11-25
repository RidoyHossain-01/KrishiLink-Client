import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const CropRow = ({ crop }) => {
  const [cropData, setCropData] = useState(crop);
  const {
    name,
    type,
    pricePerUnit,
    unit,
    quantity,
    location,
    image,
    description,
  } = cropData;
  // console.log(name,type,pricePerUnit,unit,quantity,location,image,description);
  const navigate = useNavigate();

  const cropModalRef = useRef(null);
  const handleCropModalOpen = () => {
    cropModalRef.current.showModal();
  };

  const handleEditCrop = (e) => {
    e.preventDefault();
    // console.log(e.target.name.value );

    const form = e.target;
    const name = form.name.value;

    const type = form.type.value;
    const pricePerUnit = form.pricePerUnit.value;
    const unit = form.unit.value;
    const quantity = form.quantity.value;
    const location = form.location.value;
    const image = form.image.value;
    const description = form.description.value;

    // console.log(name);

    const updatedCrop = {
      name,
      type,
      pricePerUnit,
      unit,
      quantity,
      location,
      image,
      description,
    };
    cropModalRef.current.close();

    Swal.fire({
      title: "Confirm Edit?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:3000/crops/${crop._id}`, updatedCrop)
          .then((res) => {
            console.log(res);
            setCropData(updatedCrop);
            navigate(0);
          });

        Swal.fire({
          title: "Updated",
          text: "Your Crop has been updated",
          icon: "success",
        });
      }
    });

  };
  return (
    <div>
      <div className="w-full bg-base-100 rounded-xl shadow-md p-4 mb-4 flex flex-col sm:flex-row items-center gap-4">
        {/* Image */}
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full md:w-28 md:h-28 object-cover rounded-lg"
        />

        {/* Crop Info */}
        <div className="flex-1 w-full">
          <h2 className="text-xl font-semibold">{crop.name}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Created by:{" "}
            <span className="font-medium">{crop.owner?.ownerName}</span>
          </p>
          <p className="text-sm text-gray-500">
            Email: {crop.owner?.ownerEmail}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
          <button
            onClick={handleCropModalOpen}
            className="btn btn-sm btn-primary"
          >
            Edit
          </button>

          <button className="btn btn-sm btn-error">Delete</button>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={cropModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="w-full max-w-2xl card bg-base-100 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create New Crop Post
            </h2>

            <form
              onSubmit={handleEditCrop}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Name */}
              <div className="form-control">
                <label className="label font-semibold">Name</label>
                <input
                  defaultValue={name}
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
                <select
                  defaultValue={type}
                  name="type"
                  className="select select-bordered"
                  required
                >
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
                <label className="label font-semibold">
                  Price per unit (৳)
                </label>
                <input
                  defaultValue={pricePerUnit}
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
                <select
                  defaultValue={unit}
                  name="unit"
                  className="select select-bordered"
                  required
                >
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
                <label className="label font-semibold">
                  Estimated Quantity
                </label>
                <input
                  defaultValue={quantity}
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
                  defaultValue={location}
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
                  defaultValue={image}
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
                  defaultValue={description}
                  name="description"
                  className="textarea textarea-bordered h-28"
                  placeholder="Short details about the crop..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  Confirm Edit
                </button>
              </div>
            </form>
          </div>
          <div className="">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn w-full ">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CropRow;
