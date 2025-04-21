import React from "react";
import "./Pagination.css";

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const goToPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className="page-btn"
      >
        ⬅ Prev
      </button>
      <span className="page-number">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className="page-btn"
      >
        Next ➡
      </button>
    </div>
  );
}

export default Pagination;
