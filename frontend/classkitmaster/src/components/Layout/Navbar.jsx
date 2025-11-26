import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <header className="bg-purple-900 text-gray-200 pt-1 pb-8 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center">

        {/* Logo + Title */}
        <div className="flex items-center space-x-3 mb-6 lg:mb-0">
          <img
            src="/logo.png"
            alt="ClassKit Logo"
            className="w-12 h-12 rounded-full shadow-lg hover:scale-110 duration-300"
          />
          <h2 className="text-2xl font-bold text-white">ClassKit Master</h2>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {["Home", "Products", "Cart"].map((item, i) => (
            <Link
              key={i}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-white hover:translate-x-1 duration-300"
            >
              {item}
            </Link>
          ))}

          {localStorage.getItem("role") === "admin" && (
            <Link
              to="/admin"
              className="hover:text-white hover:translate-x-1 duration-300"
            >
              Admin
            </Link>
          )}

          {localStorage.getItem("token") ? (
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-500 duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-500 duration-300"
            >
              Login
            </Link>
          )}

          {/* Social Icons like Footer */}
          <div className="flex space-x-3 ml-4">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 bg-purple-700 rounded-full hover:bg-purple-500 hover:scale-125 duration-300 shadow-md"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <div className="lg:hidden">
          <button onClick={() => setOpenLinks(!openLinks)}>
            <FaChevronDown
              size={20}
              className={`transition-transform duration-300 ${openLinks ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {openLinks && (
        <div className="lg:hidden mt-4 px-6 flex flex-col space-y-2">
          {["Home", "Products", "Cart"].map((item, i) => (
            <Link
              key={i}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-white"
            >
              {item}
            </Link>
          ))}
          {localStorage.getItem("role") === "admin" && (
            <Link to="/admin" className="hover:text-white">
              Admin
            </Link>
          )}
          {localStorage.getItem("token") ? (
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-500 duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-500 duration-300"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
