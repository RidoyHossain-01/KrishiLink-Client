import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {/* Logo + About */}
          <div>
            <h2 className="text-2xl font-bold text-green-400">KrishiLink</h2>
            <p className="text-gray-400 mt-3">
              Connecting farmers and buyers across Bangladesh with fresh,
              trusted agricultural products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={"/"} className="hover:text-green-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/all-crops"} className="hover:text-green-400">
                  All Crops
                </Link>
              </li>
              <li>
                <Link to={"/profile"} className="hover:text-green-400">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to={"/add-crops"} className="hover:text-green-400">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@krishilink.com</li>
              <li>Phone: +880 1234 567890</li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} KrishiLink. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
