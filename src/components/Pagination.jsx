import React from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  setCurrentPage,
  currentPage,
}) => {
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    scrollToTop();
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    scrollToTop();
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container flex font-yekanReg flex-col items-center ">
      <ul className="flex gap-2 mt-">
        <li
          onClick={scrollToTop}
          className="border-1 w-5 h-8 bg-blue-200 hover:bg-cyan-700 text-sm font-bold flex items-center justify-center rounded-md"
        >
          <button
            className="w-full h-full"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            {`<`}
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            className={`border-1 w-5 h-8 bg-blue-200 flex hover:bg-cyan-700 rounded-md items-center justify-center  cursor-pointer ${
              currentPage === number ? " bg-cyan-700 text-white" : ""
            }`}
            key={number}
          >
            <button
              className="w-full h-full block "
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li className="border-1 w-5 h-8 bg-blue-200 hover:bg-cyan-700 text-sm font-bold flex items-center justify-center rounded-md">
          <button
            className="w-full h-full"
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
          >
            {`>`}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
