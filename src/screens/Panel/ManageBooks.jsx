import React, { useEffect, useState } from "react";
import BooksNav from "../../components/BooksNav";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../services/apiBooks";
import Pagination from "../../components/Pagination";
import BookCard from "../../components/BookCard";
import AddBookModal from "../../components/AddBookModal";

const ManageBooks = () => {
  const {
    data: books,
    isPending: booksLoading,
    isError: booksError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const [posts, setPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    if (books) {
      setPosts(books);
    }
  }, [books]);

  const modalVisibilityHandler = () => {
    setModalIsVisible(!modalIsVisible);
  };

  return (
    <>
      <div className="h-full bg-white rounded-lg shadow-md px-8 py-4 relative">
        <BooksNav books={books} posts={posts} setPosts={setPosts} />
        <div className="min-h-[500px] mt-5 flex flex-wrap justify-between items-center gap-y-3 px-4">
          {currentPosts.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <button
            onClick={modalVisibilityHandler}
            className="bg-sky-200 flex items-center justify-center gap-1 px-5 py-3 text-blue-800 font-bold rounded-lg"
          >
            افزودن کتاب
            <svg
              className="w-3"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>plus</title> <desc>Created with Sketch Beta.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                  sketchType="MSPage"
                >
                  {" "}
                  <g
                    id="Icon-Set-Filled"
                    sketchType="MSLayerGroup"
                    transform="translate(-362.000000, -1037.000000)"
                    fill="#2d1daa"
                  >
                    {" "}
                    <path
                      d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049"
                      id="plus"
                      sketchType="MSShapeGroup"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>

          {posts && posts.length > 0 && (
            <div className="">
              <Pagination
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
                totalPosts={posts?.length}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
      {modalIsVisible && <AddBookModal onClose={modalVisibilityHandler} />}
    </>
  );
};

export default ManageBooks;
