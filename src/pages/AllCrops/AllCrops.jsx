import axios from 'axios';
import  { useEffect, useState } from 'react';
import CorpCard from '../../components/CorpCard';
import { Link, useNavigate } from 'react-router';

const AllCrops = () => {
     const [crops,setCrops]=useState([])
     const navigate = useNavigate()


       useEffect(() => {
    
      axios.get("http://localhost:3000/all-crops")
      .then((res) => {
        // console.log(res.data);
            setCrops(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);



const handleSearch=(e)=>{
  e.preventDefault();
  const search = e.target.search.value;
  axios(`http://localhost:3000/search?search=${search}`)
  .then(res=>{
    setCrops(res.data)
    
  })
  // console.log(search);
  
}





     return (
      <div data-aos="fade-up">
        <div className='text-center my-6'>
          <h1 className='text-5xl text-green-700'>
            Explore All Available Crops
          </h1>
          <p className='text-xl mt-3 mb-8 text-orange-500'>
            Find fresh, authentic, and locally grown crops posted by trusted farmers and sellers.
          </p>
        </div>
        <div className='flex flex-col-reverse md:flex-row  items-center justify-between my-4' >
          <p className=' text-2xl'><span className='font-semibold'>
           {crops.length} 
            </span> Crops available</p>
          <form onSubmit={handleSearch} className='text-right my-4 flex items-center justify-end'>
               <div className="flex items-center justify-center p-5">
      <div className="rounded-lg bg-green-100 p-5">
        <div className="flex">
          
          {/* Icon Box */}
          <div className="flex w-15 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white relative">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="pointer-events-none w-5 fill-gray-500"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
            </svg>
          </div>

          {/* Search Input */}
          <input
            type="text"
            name='search'
            className="w-full max-w-[180px] bg-white pl-3 text-gray-700 font-semibold outline-none"
            placeholder="Search..."
          />

          {/* Green Search Button */}
          <button type='submit' className="bg-green-500 px-4 py-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-green-700 transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  
        </form> 
        </div>
        
       

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
               crops.map(crop=><CorpCard key={crop?._id} crop={crop}/>
               )
              }
          </div>

          <Link className='btn bg-purple-500 text-white text-lg flex justify-center' onClick={()=>{
            navigate(0)
          }}>View all Available Crops</Link>
      </div>
     );
};

export default AllCrops;