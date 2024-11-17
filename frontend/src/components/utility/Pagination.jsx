import React from "react";
import {number} from "prop-types";

function Pagination({totalPosts, postPerPage, setCurrentPage, currentPage}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <section className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </section>
  );
}
Pagination.propTypes = {
  totalPosts: number,
  postPerPage: number,
  currentPage: number,
  setCurrentPage: number,
};
export default Pagination;
