import React from "react";
import moment from "moment-jalaali";
import { deleteCourse } from "../services/apiCourses";

function CourseCard({ course, onDelete }) {
  const formattedDate = moment(course?.created_at).format("jYYYY/jMM/jDD");
  const price = course?.price === 0 ? "رایگان " : course?.price;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmed) {
      await deleteCourse(course.id);
      onDelete(course.id); // Notify the parent component to remove the deleted course
    }
  };

  return (
    <div className="flex items-center w-full justify-between my-3 px-3 border-b py-1">
      <img className="w-14 h-14 rounded-md" src={course?.img} alt="" />
      <h1 className="font-semibold w-[250px]">{course?.name}</h1>
      <p className="w-[100px] text-center">{course?.teacher}</p>
      <p>{formattedDate}</p>
      <div className="text-sm flex gap-1 w-[120px]">
        <p>{price}</p>
        {course?.price !== 0 && <p>تومان</p>}
      </div>

      <button onClick={handleDelete}>
        <svg
          className="w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 11V17"
            stroke="#ff0000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M14 11V17"
            stroke="#ff0000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4 7H20"
            stroke="#ff0000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
            stroke="#ff0000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
            stroke="#ff0000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default CourseCard;
