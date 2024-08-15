import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { addBook } from "../services/apiBooks"; // Ensure this service function is implemented

const initialValues = {
  name: "",
  img: "",
  category: "",
  summary: "",
  introduction: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("نام کتاب الزامی است"),
  img: yup.string().required("عکس کتاب الزامی است"),
  category: yup.string().required("دسته بندی کتاب الزامی است"),
  summary: yup.string().required("خلاصه کتاب الزامی است"),
  introduction: yup.string().required("معرفی کتاب الزامی است"),
});

const AddBookModal = ({ onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addBook(values);
      toast.success("کتاب با موفقیت افزوده شد", {
        position: "top-center",
      });
      resetForm();
      onClose(); // Close the modal after adding the book
    } catch (error) {
      toast.error("خطا در افزودن کتاب", {
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
        <p className="text-xl font-bold mt-8">افزودن کتاب</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Book Name */}
            <div className="flex items-center gap-3 mt-4">
              <label htmlFor="name">نام کتاب:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="name"
                id="name"
                placeholder="نام کتاب"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Image URL */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="img">عکس کتاب:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="img"
                id="img"
                placeholder="عکس کتاب"
              />
              <ErrorMessage
                name="img"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Category */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="category">دسته بندی کتاب:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                type="text"
                name="category"
                id="category"
                placeholder="دسته بندی کتاب"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Summary */}
            <div className="flex items-start gap-3 mt-2">
              <label htmlFor="summary">خلاصه کتاب:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[600px] h-[100px]"
                as="textarea"
                name="summary"
                id="summary"
                placeholder="خلاصه کتاب"
              />
              <ErrorMessage
                name="summary"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Introduction */}
            <div className="flex items-start gap-3 mt-2">
              <label htmlFor="introduction">معرفی کتاب:</label>
              <Field
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[600px] h-[200px]"
                as="textarea"
                name="introduction"
                id="introduction"
                placeholder="معرفی کتاب"
              />
              <ErrorMessage
                name="introduction"
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
                افزودن کتاب
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddBookModal;
