import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { updateTeacher } from "../services/apiTeachers";

// Validation schema for Formik
const validationSchema = yup.object().shape({
  name: yup.string().required("نام استاد الزامی است"),
  avatar: yup.string().required("آواتار استاد الزامی است"),
  speciality: yup.string().required("تخصص استاد الزامی است"),
  courses: yup.string(), // Optional, not required
  about: yup.string().required("بیوگرافی استاد الزامی است"),
});

const EditTeacherModal = ({ onClose, teacher }) => {
  // Initial values for Formik, populated with teacher's existing data
  const initialValues = {
    name: teacher?.name || "",
    avatar: teacher?.avatar || "",
    speciality: teacher?.speciality || "",
    courses: teacher?.courses?.join(", ") || "", // Convert array to comma-separated string
    about: teacher?.about || "",
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Convert courses from a comma-separated string to an array
      const coursesArray = values.courses
        ? values.courses.split(",").map((id) => id.trim())
        : [];

      const teacherData = { ...values, courses: coursesArray };

      await updateTeacher(teacher.id, teacherData); // Assume `updateTeacher` accepts ID and updated data
      toast.success("اطلاعات استاد با موفقیت ویرایش شد", {
        position: "top-center",
      });
      resetForm();
      onClose(); // Close the modal after updating the teacher
    } catch (error) {
      toast.error("خطا در ویرایش استاد", {
        position: "top-center",
      });
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[10000] font-iransans flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="w-[800px] h-[600px] bg-white rounded-lg shadow-lg relative p-5 overflow-y-scroll">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <p className="text-xl font-bold mt-8">ویرایش استاد</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Teacher Name */}
            <div className="flex items-center gap-3 mt-4">
              <label htmlFor="name">نام استاد:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="name"
                id="name"
                placeholder="نام استاد"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Avatar URL */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="avatar">آواتار استاد:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="avatar"
                id="avatar"
                placeholder="آواتار استاد"
              />
              <ErrorMessage
                name="avatar"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Speciality */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="speciality">تخصص استاد:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="speciality"
                id="speciality"
                placeholder="تخصص استاد"
              />
              <ErrorMessage
                name="speciality"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Courses (comma-separated) */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="courses">آی‌دی دوره‌ها (اختیاری):</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="courses"
                id="courses"
                placeholder="مثال: 10, 11, 12"
              />
              <ErrorMessage
                name="courses"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* About */}
            <div className="flex items-start gap-3 mt-2">
              <label htmlFor="about">بیوگرافی استاد:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[600px] h-[200px]"
                as="textarea"
                name="about"
                id="about"
                placeholder="بیوگرافی استاد"
              />
              <ErrorMessage
                name="about"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-sky-200 px-3 py-2 text-blue-900 font-semibold rounded-lg hover:bg-sky-300"
              >
                ویرایش استاد
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditTeacherModal;
