import { useQuery } from "@tanstack/react-query";
import CourseNav from "../../components/CourseNav";
import { getCourses } from "../../services/apiCourses";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import Pagination from "../../components/Pagination";
import AddCourseModal from "../../components/AddCourseModal";

function ManageCourses() {
  const {
    data: courses,
    isPending: coursesLoading,
    isError: courseError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const [posts, setPosts] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const modalVisibilityHandler = () => {
    setModalIsVisible(!modalIsVisible);
  };

  useEffect(() => {
    if (courses) {
      setPosts(courses);
    }
  }, [courses]);

  return (
    <>
      <div className="h-full bg-white rounded-lg shadow-md px-8 py-4 relative">
        <CourseNav courses={courses} posts={posts} setPosts={setPosts} />

        <div className="mt-3">
          <div className="bg-zinc-900 text-white h-12 w-full rounded-lg flex items-center justify-between font-semibold px-3 text-sm">
            <p className="w-[450px]">نام دوره</p>
            <p className="w-[100px]">استاد دوره</p>
            <p className="w-[100px]">تاریخ انتشار</p>
            <p className="w-[100px]">قیمت دوره</p>
            <p className="w-[100px]">حذف دوره</p>
          </div>
          <div className="min-h-[452px]">
            {currentPosts.map((post) => (
              <CourseCard course={post} key={post.id} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={modalVisibilityHandler}
            className="bg-sky-200 flex items-center justify-center gap-1 px-5 py-3 text-blue-800 font-bold rounded-lg"
          >
            افزودن دوره
            <svg
              className="w-3"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>plus</title> <desc>Created with Sketch Beta.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                  sketch:type="MSPage"
                >
                  {" "}
                  <g
                    id="Icon-Set-Filled"
                    sketch:type="MSLayerGroup"
                    transform="translate(-362.000000, -1037.000000)"
                    fill="#2d1daa"
                  >
                    {" "}
                    <path
                      d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049"
                      id="plus"
                      sketch:type="MSShapeGroup"
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
      {modalIsVisible && <AddCourseModal onClose={modalVisibilityHandler} />}
    </>
  );
}

export default ManageCourses;
