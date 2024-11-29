import React, { useEffect, useState } from "react";
import BlogNav from "../../components/BlogNav";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../services/apiBlogs";
import BlogCard from "../../components/BlogCard";
import Pagination from "../../components/Pagination";
import AddBlogModal from "../../components/AddBlogModal";
import EditBlogModal from "../../components/EditBlogModal"; // Ensure you import the EditBlogModal

function ManageBlogs() {
  const {
    data: blogs,
    isPending: blogLoading,
    isError: blogError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const [posts, setPosts] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); // To track the blog being edited

  useEffect(() => {
    if (blogs) {
      setPosts(blogs);
    }
  }, [blogs]);

  // Handlers
  const modalVisibilityHandler = () => {
    setModalIsVisible(!modalIsVisible);
  };

  const editModalHandler = (blog) => {
    setSelectedBlog(blog);
    setEditModalVisible(true);

    console.log("modal is visible");
  };

  const closeEditModal = () => {
    setEditModalVisible(false); // Close the edit modal
    setSelectedBlog(null); // Clear the selected blog
  };

  return (
    <>
      <div className="h-full bg-white rounded-lg shadow-md px-8 py-4 relative">
        <BlogNav blogs={blogs} posts={posts} setPosts={setPosts} />
        <div className="min-h-[500px] mt-5 flex flex-wrap gap-3">
          {currentPosts.map((blog) => (
            <BlogCard
              blog={blog}
              key={blog.id}
              onDelete={() =>
                setPosts((prev) => prev.filter((b) => b.id !== blog.id))
              }
              onEdit={editModalHandler} // Pass the edit handler
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <button
            onClick={modalVisibilityHandler}
            className="bg-sky-200 w-[130px] flex items-center justify-center gap-1 px-5 py-3 text-blue-800 font-bold rounded-lg"
          >
            افزودن بلاگ
            {/* SVG Code */}
          </button>

          {posts && posts.length > 0 && (
            <Pagination
              setCurrentPage={setCurrentPage}
              postsPerPage={postsPerPage}
              totalPosts={posts?.length}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>

      {modalIsVisible && <AddBlogModal onClose={modalVisibilityHandler} />}
      {editModalVisible && selectedBlog && (
        <EditBlogModal blog={selectedBlog} onClose={closeEditModal} />
      )}
    </>
  );
}

export default ManageBlogs;
