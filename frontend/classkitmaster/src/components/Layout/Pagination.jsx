import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-2 justify-center mt-4 ">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            currentPage === p ? " bg-purple-700 text-white" : "bg-gray-200"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
