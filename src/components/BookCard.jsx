import React from "react";
import { deleteBook } from "../services/apiBooks";
import toast from "react-hot-toast";

const BookCard = ({ book }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("آیا از حذف این کتاب مطمئن هستید؟");
    if (confirmed) {
      try {
        await deleteBook(book.id);
        toast.success("کتاب با موفقیت حذف شد", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("خطا در حذف کتاب", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className=" border flex justify-between items-center w-[400px] gap-2 h-[100px] px-3 py-2 rounded-lg">
      <img className="w-[70px] h-[70px] rounded-xl" src={book?.img} alt="" />
      <div className=" w-full">
        <h2 className="text-sm font-bold mb-2">{book.name}</h2>
        <p className=" text-sm text-gray-700">{book.category}</p>
      </div>
      <button onClick={handleDelete}>
        <svg
          class="w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 11V17"
            stroke="#ff0000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M14 11V17"
            stroke="#ff0000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M5 7H19"
            stroke="#ff0000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M8 7V4H16V7"
            stroke="#ff0000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M19 7V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V7"
            stroke="#ff0000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default BookCard;
