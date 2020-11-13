import React, { useState } from "react";
import cn from "classnames";

const Pagenator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  let i = 1;
  while (i <= pagesCount) {
    pages.push(i);
    i++;
  }
  let PortionCount = Math.ceil(pagesCount / portionSize);
  let [PortionNumber, SetPortionNumber] = useState(1);
  let LeftPortionHorizon = (PortionNumber - 1) * portionSize;
  let RightPortionHorizon = PortionNumber * portionSize;
  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={() => SetPortionNumber(PortionNumber - 1)}
        disabled={PortionNumber === 1}
        className="left-portion"
      >
        left
      </button>
      <div className="page-numbers">
        {pages
          .filter((p) => p >= LeftPortionHorizon && p <= RightPortionHorizon)
          .map((p) => (
            <span
              // className={currentPage === p ? "activePage" : "page"}
              className={cn(
                { [`page`]: currentPage !== p },
                { [`activePage`]: currentPage === p },
                { [`del2`]: Number.isInteger(p / 2) },
              )}
              key={p}
              onClick={() => {
                onPageChanged(p);
              }}
            >
              {p < 10 ? <span> {p}  </span> : p}
            </span>
          ))}
      </div>
      <button
        onClick={() => SetPortionNumber(PortionNumber + 1)}
        disabled={PortionCount === PortionNumber}
        className="right-portion"
      >
        right
      </button>
    </div>
  );
};

export default Pagenator;
