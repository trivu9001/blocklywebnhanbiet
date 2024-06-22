import React, { useState, useEffect } from "react";
import "./pagination.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [pages, setPages] = useState([]);
  const pageRangeDisplayed = 5; // Số lượng trang hiển thị

  // Hàm để tạo danh sách các trang cần hiển thị
  const createPageNumbers = () => {
    let startPage = Math.max(
      currentPage - Math.floor(pageRangeDisplayed / 2),
      1
    );
    let endPage = Math.min(startPage + pageRangeDisplayed - 1, totalPages);

    if (endPage - startPage + 1 < pageRangeDisplayed) {
      startPage = Math.max(endPage - pageRangeDisplayed + 1, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      pageNumbers.unshift("prev");
      pageNumbers.unshift(1);
    }

    if (endPage < totalPages) {
      pageNumbers.push("next");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  useEffect(() => {
    setPages(createPageNumbers());
  }, [currentPage, totalPages]);

  const handlePageClick = (page) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    } else if (page === "prev") {
      setCurrentPage(Math.max(currentPage - pageRangeDisplayed, 1));
    } else if (page === "next") {
      setCurrentPage(Math.min(currentPage + pageRangeDisplayed, totalPages));
    }
  };

  return (
    <div className="pagination-container">
      {pages.map((page, index) => (
        <button
          className={page === currentPage ? "active" : ""}
          onClick={() => handlePageClick(page)}
          key={index}
        >
          {typeof page === "number" ? page : "..."}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
