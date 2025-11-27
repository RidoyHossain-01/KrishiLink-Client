// Testimonials.jsx
import React from "react";

const testimonials = [
  {
    name: "Farmer Ali",
    role: "Organic Farmer",
    image: "https://i.ibb.co.com/6cH5zT1R/farmer.webp",
    feedback: "KrishiLink helped me sell my crops directly to buyers. Very easy and convenient!"
  },
  {
    name: "Farmer Samir",
    role: "Vegetable Grower",
    image: "https://i.ibb.co.com/C3LBLCsH/farmer2.jpg",
    feedback: "I love how quickly I get buyer interests. The platform is very user-friendly."
  },
  {
    name: "Farmer Imran",
    role: "Fruit Farmer",
    image: "https://i.ibb.co.com/C4QvjDs/farmer3.jpg",
    feedback: "KrishiLink made my selling process smooth and stress-free. Highly recommended!"
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-green-700 mb-6">What Our Farmers Say</h2>
        <p className="text-gray-600 mb-12">
          Hear directly from our farmers who have benefited from KrishiLink.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <img
                className="w-16 h-16 rounded-full mx-auto mb-4"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <p className="text-gray-700 mb-4">"{testimonial.feedback}"</p>
              <h3 className="text-lg font-semibold text-green-700">{testimonial.name}</h3>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
