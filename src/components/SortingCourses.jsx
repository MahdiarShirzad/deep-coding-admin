import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortingCourses = ({ setPosts, posts, items }) => {
  const [defaultCourses, setDefaultCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortingOptionFromParams = searchParams.get("sortBy") || "پیش فرض";
  const [sortingOption, setSortingOption] = useState(sortingOptionFromParams);

  const sortPosts = (sortBy) => {
    let sortedPosts = [...posts];

    if (sortedPosts.length === 0) return; // Prevent sorting on an empty array

    console.log("Before sorting:", sortedPosts); // Debugging log

    switch (sortBy) {
      case "A-Z":
        sortedPosts.sort((a, b) => {
          const titleA = a.title || "";
          const titleB = b.title || "";
          return titleA.localeCompare(titleB, "fa");
        });
        break;
      case "Z-A":
        sortedPosts.sort((a, b) => {
          const titleA = a.title || "";
          const titleB = b.title || "";
          return titleB.localeCompare(titleA, "fa");
        });
        break;
      case "جدید ترین":
        sortedPosts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      case "قدیمی ترین":
        sortedPosts.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;
      default:
        sortedPosts = [...defaultCourses];
        break;
    }

    console.log("After sorting:", sortedPosts); // Debugging log
    setPosts(sortedPosts);
  };

  const resetToDefault = () => {
    setPosts(defaultCourses);
    setSortingOption("پیش فرض");
    setSearchParams((params) => {
      params.delete("sortBy");
      return params;
    });
    setIsOpen(false);
  };

  useEffect(() => {
    if (items) {
      setDefaultCourses(items);
      setPosts(items);
    }
  }, [items, setPosts]);

  useEffect(() => {
    if (sortingOption) {
      sortPosts(sortingOption);
    }
  }, [sortingOption]);

  const handleSort = (sortBy) => {
    setSortingOption(sortBy);
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), sortBy });
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!posts) {
    return null;
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex justify-end gap-2 outline-none focus:outline-none rounded-md border border-gray-300 shadow-sm bg-gray-200 w-40 text-right px-4 py-2 text-sm font-medium focus:border-blue-300 focus:ring-0"
        id="options-menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        {sortingOption}
        <svg
          className="w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12 14.586 6.293-6.293a1 1 0 1 1 1.414 1.414l-6.646 6.647a1.5 1.5 0 0 1-2.122 0L4.293 9.707a1 1 0 0 1 1.414-1.414L12 14.586z"
            fill="#000"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute z-40 right-0 mt-2 text-right w-44 rounded-lg shadow-lg bg-gray-200 text-black ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul
            className="py-1 flex flex-col gap-1 px-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <li
              onClick={resetToDefault}
              className={`block px-4 py-2 text-sm cursor-pointer rounded-lg hover:bg-gray-500 ${
                sortingOption === "پیش فرض" ? "bg-gray-600 text-white" : ""
              }`}
            >
              پیش فرض
            </li>

            <li
              onClick={() => handleSort("جدید ترین")}
              className={`block px-4 py-2 text-sm hover:bg-gray-500 rounded-lg cursor-pointer ${
                sortingOption === "جدید ترین" ? "bg-gray-600 text-white" : ""
              }`}
            >
              جدید ترین
            </li>
            <li
              onClick={() => handleSort("قدیمی ترین")}
              className={`block px-4 py-2 text-sm hover:bg-gray-500 rounded-lg cursor-pointer ${
                sortingOption === "قدیمی ترین" ? "bg-gray-600 text-white" : ""
              }`}
            >
              قدیمی ترین
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortingCourses;
