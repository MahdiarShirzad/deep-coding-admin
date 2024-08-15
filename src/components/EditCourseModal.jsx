import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { updateCourses } from "../services/apiCourses";

const validationSchema = yup.object().shape({
  name: yup.string().required("نام دوره الزامی است"),
  img: yup.string().required("عکس دوره الزامی است"),
  category: yup.string().required("دسته بندی دوره الزامی است"),
  price: yup.number().required("قیمت دوره الزامی است"),
  level: yup.string().required("سطح دوره الزامی است"),
  time: yup.string().required("زمان دوره الزامی است"),
  star: yup.number().required("نمره دوره الزامی است"),
  teacher: yup.string().required("استاد دوره الزامی است"),
  video: yup.string().required("ویدیو معرفی دوره الزامی است"),
  introduction: yup.string().required("متن معرفی دوره الزامی است"),
  desc: yup.string().required("توضیحات دوره الزامی است"),
});

const EditCourseModal = ({ course, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await updateCourses(course.id, values);
      toast.success("دوره با موفقیت ویرایش شد", {
        position: "top-center",
      });
      resetForm();
      onClose(); // Close the modal after updating the course
    } catch (error) {
      toast.error("خطا در ویرایش دوره", {
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
        <p className="text-xl font-bold mt-8">ویرایش دوره</p>

        <Formik
          initialValues={{
            name: course.name || "",
            img: course.img || "",
            category: course.category || "",
            price: course.price || 0,
            level: course.level || "",
            time: course.time || "",
            star: course.star || "",
            teacher: course.teacher || "",
            video: course.video || "",
            introduction: course.introduction || "",
            desc: course.desc || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Course Name */}
            <div className="flex items-center gap-3 mt-4">
              <label htmlFor="name">نام دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="name"
                id="name"
                placeholder="نام دوره"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Image URL */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="img">عکس دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="img"
                id="img"
                placeholder="عکس دوره"
              />
              <ErrorMessage
                name="img"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Category */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="category">دسته بندی دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="category"
                id="category"
                placeholder="دسته بندی دوره"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Price */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="price">قیمت دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="number"
                name="price"
                id="price"
                placeholder="قیمت دوره"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Level */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="level">سطح دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="level"
                id="level"
                placeholder="سطح دوره"
              />
              <ErrorMessage
                name="level"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Time */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="time">زمان دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="time"
                id="time"
                placeholder="زمان دوره"
              />
              <ErrorMessage
                name="time"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Star Rating */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="star">نمره دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="number"
                name="star"
                id="star"
                placeholder="نمره دوره"
              />
              <ErrorMessage
                name="star"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Teacher */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="teacher">استاد دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="teacher"
                id="teacher"
                placeholder="استاد دوره"
              />
              <ErrorMessage
                name="teacher"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Video URL */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="video">ویدیو معرفی دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="video"
                id="video"
                placeholder="ویدیو معرفی دوره"
              />
              <ErrorMessage
                name="video"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Introduction */}
            <div className="flex items-start gap-3 mt-2">
              <label htmlFor="introduction">متن معرفی دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[600px] h-[200px]"
                as="textarea"
                name="introduction"
                id="introduction"
                placeholder="متن معرفی دوره"
              />
            </div>
            <div className="px-28 mt-2">
              <ErrorMessage
                name="introduction"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Description */}
            <div className="flex items-start gap-3 mt-2">
              <label htmlFor="desc">توضیحات دوره:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[600px] h-[200px]"
                as="textarea"
                name="desc"
                id="desc"
                placeholder="توضیحات دوره"
              />
            </div>
            <div className="px-28 mt-2">
              <ErrorMessage
                name="desc"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
            >
              ذخیره تغییرات
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditCourseModal;
