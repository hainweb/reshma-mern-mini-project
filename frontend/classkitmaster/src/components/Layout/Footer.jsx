import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaChevronDown,
} from "react-icons/fa";

function Footer() {
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <footer className="bg-purple-900 text-gray-200 pt-14 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + About */}
          <div>
            {/* School-Themed Logo */}
            <div className="flex items-center space-x-3">
              <img
                src="/logo.jpg"
                alt="ClassKit Logo"
                className="w-12 h-12 rounded-full shadow-lg hover:scale-110 duration-300"
              />
              <h2 className="text-2xl font-bold text-white">ClassKit Master</h2>
            </div>

            <p className="mt-4 text-gray-300 leading-relaxed">
              ClassKit Master by ESO provides school study materials, uniforms,
              and essential learning supplies backed by years of trusted
              service.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 bg-purple-700 rounded-full hover:bg-purple-500 hover:scale-125 duration-300 shadow-md"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Navigation with Dropdown (Mobile) */}
          <div>
            <div className="flex justify-between items-center lg:block">
              <h3 className="text-xl font-semibold">Quick Links</h3>

              {/* Dropdown Button (Mobile Only) */}
              <button
                className="lg:hidden p-2"
                onClick={() => setOpenLinks(!openLinks)}
              >
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openLinks ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            {/* Links */}
            <ul
              className={`mt-4 space-y-3 lg:block ${
                openLinks ? "block" : "hidden lg:block"
              }`}
            >
              {["Home", "About", "Products", "Contact"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-white hover:translate-x-1 inline-block duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="mt-4 text-gray-300 space-y-3">
              <li>Email: support@classkitmaster.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Kerala, India</li>
            </ul>
          </div>

          {/* Educational Categories (Dropdown) */}
          <div>
            <div className="flex justify-between items-center lg:block">
              <h3 className="text-xl font-semibold">School Supplies</h3>

              {/* Dropdown for mobile */}
              <button
                className="lg:hidden p-2"
                onClick={() => setOpenLinks(!openLinks)}
              >
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openLinks ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            <ul
              className={`mt-4 space-y-3 lg:block ${
                openLinks ? "block" : "hidden lg:block"
              }`}
            >
              {["Books", "Uniforms", "Bags", "Stationery"].map((c, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-white hover:translate-x-1 inline-block duration-300"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-purple-300 text-sm mt-12 pt-6 border-t border-purple-700">
          © 2025 ClassKit Master by Reshma Rajendran. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
