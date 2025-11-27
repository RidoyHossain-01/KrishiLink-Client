import axios from "axios";
import React, { use, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AuthContext from "../../context/AuthContext";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ErrorElement from "../../components/ErrorElement";

const CropDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  // console.log(user);
  // console.log(user?.email);

  const [cropDetails, setCropDetails] = useState([]);
  const [checkOwner, setCheckOwner] = useState(false);
  const [interests, setInterests] = useState(null);
//   const [checkState,setCheckState] = useState('pending')
  //   const [pending,setPending] = useState(true)
  //   console.log(interests);

    // console.log(cropDetails);

  const {image,name,type, pricePerUnit,unit,quantity,description,location,owner } = cropDetails;
  

  useEffect(() => {
    axios(`http://localhost:3000/crops/${id}`).then((res) => {
      setCropDetails(res.data);
      const checkOwnerEmail = res.data.owner.ownerEmail;
      const myEmail = user?.email;
      const cropInterests = res.data.interests;
      setInterests(cropInterests);
      if (myEmail === checkOwnerEmail) {
        setCheckOwner(true);
      } else {
        setCheckOwner(false);
      }
    });
  }, [id, user?.email]);

  const [quantity2, setQuantity2] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const totalPrice = quantity2 * pricePerUnit;

  const interestModalRef = useRef(null);
  const handleInterestModalOpen = () => {
    interestModalRef.current.showModal();
  };






  //interest submit handler
  const handleInterest = (e) => {
    e.preventDefault();
    setError("");

    if (quantity2 >quantity) {
      setError("Quantity exceeds available stock");
      return;
    }

    if (quantity2 < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    const newInterest = {
      userEmail: user?.email,
      userName: user?.displayName,
      quantity:quantity2,
      message,
      totalPrice,
    };
    try {
      axios
        .post(`http://localhost:3000/crops/${id}/interests`, newInterest)
        .then((res) => {
          console.log(res);

          if (res.status === 200) {
            interestModalRef.current.close();
            toast("Interest submitted successfully");
            navigate("/my-interests");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };






//accept an interest

  const handleAcceptInterest = (interestId) => {
    const accept = {
      status: "accepted",
    };
    Swal.fire({
      title: "Do you want to accept",
      text: "This will be marked as accepted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.patch(
              `http://localhost:3000/corps/${id}/interest/${interestId}`,
              accept
            )
            .then(() => {
              navigate(0);
              Swal.fire({
                title: "Congrats!",
                text: "You have accepted this interest",
                icon: "success",
              });
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };


  
//reject an interest
  const handleRejectInterest = (interestId) => {
    const reject = {
      status: "rejected",
    };
    Swal.fire({
      title: "Do you want to reject it",
      text: "This will be marked as rejected",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.patch(
              `http://localhost:3000/corps/${id}/interest/${interestId}`,
              reject
            )
            .then(() => {
              navigate(0);
              Swal.fire({
                title: "Congrats!",
                text: "You have rejected this interest",
                icon: "success",
              });
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
  <div>
    {
      cropDetails.name && <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">

        {/* Image */}
        <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700">
            {name}
          </h1>

          <p className="text-gray-600 mt-2 text-lg">{type}</p>

          {/* Price & Quantity */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="p-4 bg-base-200 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Price per Unit</p>
              <p className="text-xl font-semibold text-orange-500">
                {pricePerUnit}৳ / {unit}
              </p>
            </div>

            <div className="p-4 bg-base-200 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Available Quantity</p>
              <p className="text-xl font-semibold text-secondary">
                {quantity} {unit}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-primary">Description</h2>
            <p className="mt-2 text-gray-700">{description}</p>
          </div>

          {/* Location */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-primary">Location</h2>
            <p className="mt-2 text-gray-700">{location}</p>
          </div>

          {/* Owner Info */}
          <div className="mt-6 p-4 bg-base-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Seller Information
            </h2>

            <p className="text-gray-700 font-medium">{owner?.ownerName}</p>
            <p className="text-gray-600 text-sm">{owner?.ownerEmail}</p>
          </div>

          {/* CTA Buttons */}
          
        </div>
      </div>
    </div>
    }

   
    
{
  !cropDetails.name && <ErrorElement/>
}








    {/* this one is for the owner */}
    {checkOwner && (
      <>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Interests for Your Product
        </h1>

        <div className="flex justify-center mb-4"></div>

        {!interests.length ? (
          <p className="text-center text-gray-500">No interests yet</p>
        ) : (
          <div className="overflow-x-auto w-full shadow-md rounded-lg border border-base-300 bg-base-100">
            <table className="table w-full">
              {/* head */}
              <thead className="bg-base-200">
                <tr>
                  <th className="font-semibold text-sm">Name</th>
                  <th className="font-semibold text-sm">Email</th>
                  <th className="font-semibold text-sm">Quantity</th>
                  <th className="font-semibold text-sm">Message</th>
                  <th className="font-semibold text-sm">Actions</th>
                </tr>
              </thead>

              <tbody>
                {interests?.map((interest) => (
                  <tr key={interest._id} className="hover:bg-base-200">
                    <td className="py-3">{interest.userName}</td>
                    <td className="py-3">{interest.userEmail}</td>
                    <td className="py-3">{interest.quantity}</td>

                    {/* Truncated message with hover expand */}
                    <td className="py-3">
                      <div className="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis hover:whitespace-normal hover:max-w-full hover:bg-base-300 p-2 rounded transition-all cursor-pointer">
                        {interest.message}
                      </div>
                    </td>

                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {interest.status === "pending" && (
                          <>
                            <button
                              onClick={() => {
                                handleAcceptInterest(interest._id);
                              }}
                              className="btn btn-success btn-sm text-white min-w-[80px]"
                            >
                              Accept
                            </button>

                            <button
                              className="btn btn-error btn-sm text-white min-w-[80px]"
                              onClick={() => {
                                handleRejectInterest(interest._id);
                              }}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {interest.status === "accepted" && (
                          <p className="btn bg-green-500 text-white btn-sm cursor-default">
                            Accepted
                          </p>
                        )}

                        {interest.status === "rejected" && (
                          <p className="btn bg-red-500 text-white btn-sm cursor-default">
                            Rejected
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}



    {/* this one is for the non Owners */}
    {!checkOwner && cropDetails.name && (
      <>
        <div className="flex justify-center">
          <button
            onClick={handleInterestModalOpen}
            className="btn bg-purple-500 text-white text-lg flex w-full"
          >
            Interest request
          </button>

          {/* Modal */}
          <dialog
            ref={interestModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              {/* crop interest form */}
              <h2 className="text-xl font-bold mb-4">Submit Your Interest</h2>

              <form onSubmit={handleInterest} className="space-y-4">
                {/* Quantity */}
                <div className="form-control">
                  <label className="label font-semibold">Quantity:</label>
                  <input
                    type="number"
                    className="input input-bordered"
                    min="1"
                    value={quantity2}
                    onChange={(e) => setQuantity2(Number(e.target.value))}
                    required
                  />
                </div>

                {/* Message */}
                <div className="form-control">
                  <label className="label font-semibold">Message:</label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Write a short message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Total Price */}
                <div className="form-control">
                  <label className="label font-semibold">Total Price</label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={`${totalPrice} ৳`}
                    disabled
                  />
                </div>

                {/* error */}
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                {/* Submit Button */}
                <button className="btn btn-primary w-full" type="submit">
                  Submit Interest
                </button>
              </form>

              <div>
                <form method="dialog">
                  <button className="btn w-full mt-1">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </>
    )}

  </div>
)}
export default CropDetails;