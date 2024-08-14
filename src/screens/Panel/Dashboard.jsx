import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCourses } from "../../services/apiCourses";
import { getTeachers } from "../../services/apiTeachers";
import { getBlogs } from "../../services/apiBlogs";
import { getBooks } from "../../services/apiBooks";
import { SiteStatics } from "../../components/SiteStatics";
import Chart from "../../components/Chart";

const Dashboard = () => {
  const {
    data: courses,
    isPending: coursesLoading,
    isError: courseError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const {
    data: teachers,
    isPending: teacherLoading,
    isError: teacherError,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  const {
    data: blogs,
    isPending: blogLoading,
    isError: blogError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const {
    data: books,
    isPending: booksLoading,
    isError: booksError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  return (
    <div className="h-[90vh] bg-white rounded-lg shadow-md px-8 py-4">
      <SiteStatics
        teachers={teachers}
        books={books}
        blogs={blogs}
        courses={courses}
      />
      <div className=" flex items-start justify-between mt-12">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
