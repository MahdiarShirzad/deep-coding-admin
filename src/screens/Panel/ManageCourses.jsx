import { useQuery } from "@tanstack/react-query";
import CourseNav from "../../components/CourseNav";
import { getCourses } from "../../services/apiCourses";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import Pagination from "../../components/Pagination";

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

  useEffect(() => {
    if (courses) {
      setPosts(courses);
    }
  }, [courses]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="h-[90vh] bg-white rounded-lg shadow-md px-8 py-4 relative">
      <CourseNav courses={courses} posts={posts} setPosts={setPosts} />

      <div className="mt-3">
        <div className="bg-zinc-900 text-white h-12 w-full rounded-lg flex items-center justify-between font-semibold px-3 text-sm">
          <p className="w-[450px]">نام دوره</p>
          <p className="w-[100px]">استاد دوره</p>
          <p className="w-[100px]">تاریخ انتشار</p>
          <p className="w-[100px]">قیمت دوره</p>
          <p className="w-[100px]">حذف دوره</p>
        </div>
        <div>
          {currentPosts.map((post) => (
            <CourseCard course={post} key={post.id} />
          ))}
        </div>
      </div>

      {posts && posts.length > 0 && (
        <div className="absolute flex items-center justify-center left-3 bottom-2">
          <Pagination
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            totalPosts={posts?.length}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}

export default ManageCourses;
