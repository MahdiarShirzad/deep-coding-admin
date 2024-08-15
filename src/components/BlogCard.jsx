import React from "react";
import { deleteBlog } from "../services/apiBlogs";
import toast from "react-hot-toast";

const BlogCard = ({ blog }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("آیا از حذف این بلاگ مطمئن هستید؟");
    if (confirmed) {
      try {
        await deleteBlog(blog.id);
        toast.success("بلاگ با موفقیت حذف شد", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("خطا در حذف بلاگ", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="font-iransans w-[190px]  border-2 border-gray-400 rounded-lg py-2 px-3">
      <img
        className="w-[100px] h-[100px] mx-auto rounded-lg"
        src={blog?.img}
        alt={blog.name}
      />
      <div className=" mt-2">
        <p className="  text-zinc-700 text-sm font-semibold">{blog?.name}</p>
        <p className="mt-1 text-xs text-zinc-500">{blog?.category}</p>
      </div>
      <button
        onClick={handleDelete}
        className=" bg-red-300 text-red-700 mt-3 text-sm px-3 py-1 rounded-lg"
      >
        حذف دوره
      </button>
    </div>
  );
};

export default BlogCard;
