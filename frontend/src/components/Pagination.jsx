import React from "react";

const Pagination = ({
  totalLength,
  setCurrentPage,
  currentPage,
  postPerPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLength / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex gap-4 mt-4">
      {pageNumbers.map((numbers, index) => (
        <span
          onClick={setCurrentPage.bind(this, index + 1)}
          key={index}
          className={`bg-white h-[32px] w-[32px] gap-4 text-center pt-1 cursor-pointer ${
            currentPage == index + 1 && "!bg-blue-500 text-white"
          }`}>
          {numbers}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
