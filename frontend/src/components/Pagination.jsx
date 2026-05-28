import React from "react";

const Pagination = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8 pb-8">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          page === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-emerald-600 shadow-sm hover:shadow-md border border-emerald-100"
        }`}
      >
        Trước
      </button>

      <span className="text-gray-600 font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
        Trang {page} / {totalPages}
      </span>

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          page === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-emerald-600 shadow-sm hover:shadow-md border border-emerald-100"
        }`}
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination;
