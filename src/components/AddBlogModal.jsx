import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactQuill from "react-quill";
import * as yup from "yup";
import toast from "react-hot-toast";
import { addBlog } from "../services/apiBlogs";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles

const initialValues = {
  name: "",
  category: "",
  img: "",
  summary: "",
  star: "",
  text: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("نام بلاگ الزامی است"),
  category: yup.string().required("دسته‌بندی بلاگ الزامی است"),
  img: yup
    .string()
    .url("لینک تصویر معتبر نیست")
    .required("لینک تصویر الزامی است"),
  summary: yup.string().required("خلاصه بلاگ الزامی است"),
  star: yup
    .number()
    .nullable()
    .min(0, "نمره باید بزرگتر یا مساوی 0 باشد")
    .max(5, "نمره باید کوچکتر یا مساوی 5 باشد"),
  // text: yup.string().test("not-empty", "متن بلاگ الزامی است", (value) => {
  //   return value && value.replace(/<(.|\n)*?>/g, "").trim().length > 0;
  // }),
});

const AddBlogModal = ({ onClose }) => {
  const [editorValue, setEditorValue] = useState("");

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const blogData = { ...values, text: editorValue }; // Include editor content
      await addBlog(blogData);
      toast.success("بلاگ با موفقیت افزوده شد", {
        position: "top-center",
      });
      resetForm();
      onClose();
    } catch (error) {
      toast.error("خطا در افزودن بلاگ", {
        position: "top-center",
      });
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm "
    >
      <div className="w-[800px] h-[600px] bg-white rounded-lg shadow-lg relative p-5 overflow-y-auto px-11">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <p className="text-xl font-bold mb-4">افزودن بلاگ</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              {/* Blog Name */}
              <div className="flex items-center gap-3 mt-4">
                <label htmlFor="name">نام بلاگ:</label>
                <Field
                  className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="نام بلاگ"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Category */}
              <div className="flex items-center gap-3 mt-2">
                <label htmlFor="category">دسته‌بندی:</label>
                <Field
                  className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                  type="text"
                  name="category"
                  id="category"
                  placeholder="دسته‌بندی"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Image URL */}
              <div className="flex items-center gap-3 mt-2">
                <label htmlFor="img">لینک تصویر:</label>
                <Field
                  className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                  type="text"
                  name="img"
                  id="img"
                  placeholder="لینک تصویر"
                />
                <ErrorMessage
                  name="img"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Summary */}
              <div className="flex items-start gap-3 mt-2">
                <label htmlFor="summary">خلاصه بلاگ:</label>
                <Field
                  className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[600px] h-[100px]"
                  as="textarea"
                  name="summary"
                  id="summary"
                  placeholder="خلاصه بلاگ"
                />
                <ErrorMessage
                  name="summary"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-3 mt-2">
                <label htmlFor="star">نمره بلاگ:</label>
                <Field
                  className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                  type="number"
                  name="star"
                  id="star"
                  placeholder="نمره بلاگ"
                />
                <ErrorMessage
                  name="star"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Text Field (React Quill) */}
              <div className="flex items-start gap-3 mt-2">
                <label htmlFor="text">متن بلاگ:</label>
                <div className="border-2 rounded-lg text-gray-800 w-[600px] min-h-[200px]">
                  <ReactQuill
                    value={editorValue}
                    onChange={(content) => {
                      setEditorValue(content);
                      setFieldValue("text", content);
                    }}
                  />
                </div>
              </div>
              <div className="px-28 mt-2">
                <ErrorMessage
                  name="text"
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
                  افزودن بلاگ
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBlogModal;
