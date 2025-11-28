import React from "react";
import { Link } from "react-router";

const CorpCard = ({ crop }) => {
  const {
    _id,
    name,
    image,
    description,
    quantity,
    pricePerUnit,
    unit,
    location,
  } = crop;
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all rounded-lg">
      {/* Image */}
      <figure className="w-full h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </figure>

      {/* Content */}
      <div className="card-body">
        <h2 className="card-title text-xl font-bold">{name}</h2>

        <p className="text-sm text-gray-600">{description}</p>

        <div className="mt-2 flex flex-col gap-1 text-sm">
          <span>
            <strong>Quantity:</strong> {quantity} {unit}
          </span>
          <span>
            <strong>Price:</strong> ৳{pricePerUnit} / {unit}
          </span>
          <span>
            <strong>Location:</strong> {location}
          </span>
        </div>

        <div className="card-actions mt-4">
          <Link
            className="btn w-full bg-green-600 text-white"
            to={`/all-crops/${_id}`}
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CorpCard;
