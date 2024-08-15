import React from "react";
import toast from "react-hot-toast";
import { deleteTeacher } from "../services/apiTeachers";

const TeachersCard = ({ teacher, onEditClick }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("آیا از حذف این استاد مطمئن هستید؟");
    if (confirmed) {
      try {
        await deleteTeacher(teacher.id);
        toast.success("استاد با موفقیت حذف شد", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("خطا در حذف استاد", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <div className="w-[300px] h-[130px] border rounded-md py-1 px-3 my-3">
        <div className="flex border-b pb-2 items-center justify-between">
          <div className="flex gap-3 items-start">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={teacher?.avatar}
              alt=""
            />
            <div className="mt-2">
              <p className="font-semibold">{teacher?.name}</p>
              <p className="text-xs text-gray-500 max-w-[130px]">
                {teacher?.speciality}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <button onClick={onEditClick}>
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
                  d="M5 7H19"
                  stroke="#ff0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 7V4H16V7"
                  stroke="#ff0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M19 7V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V7"
                  stroke="#ff0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 p-2 rounded-full bg-sky-200">
              <svg
                fill="#000C7B"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 6.28a1.23 1.23 0 0 0-.62-1.07l-6.74-4a1.27 1.27 0 0 0-1.28 0l-6.75 4a1.25 1.25 0 0 0 0 2.15l1.92 1.12v2.81a1.28 1.28 0 0 0 .62 1.09l4.25 2.45a1.28 1.28 0 0 0 1.24 0l4.25-2.45a1.28 1.28 0 0 0 .62-1.09V8.45l1.24-.73v2.72H16V6.28zm-3.73 5L8 13.74l-4.22-2.45V9.22l3.58 2.13a1.29 1.29 0 0 0 1.28 0l3.62-2.16zM8 10.27l-6.75-4L8 2.26l6.75 4z"></path>
              </svg>
            </div>
            <p>دوره ها</p>
          </div>
          <p>{teacher?.courses?.length > 0 ? teacher?.courses?.length : "0"}</p>
        </div>
      </div>
    </>
  );
};

export default TeachersCard;
