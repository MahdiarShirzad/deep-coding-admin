import React from "react";
import moment from "moment-jalaali";
import { deleteCourse } from "../services/apiCourses";

function CourseCard({ course, onDelete, onEdit }) {
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

      <div className="flex gap-2">
        {/* Edit Button */}
        <button onClick={() => onEdit(course)}>
          <svg
            className="w-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.3785 8.44975L11.4637 15.3647C11.1845 15.6439 10.8289 15.8342 10.4417 15.9117L7.49994 16.5L8.08829 13.5582C8.16572 13.1711 8.35603 12.8155 8.63522 12.5363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132"
              stroke="#585555"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M5 20H19"
              stroke="#585555"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>

        {/* Delete Button */}
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
    </div>
  );
}

export default CourseCard;
