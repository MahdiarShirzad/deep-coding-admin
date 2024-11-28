import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { addCourse } from "../services/apiCourses";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const initialValues = {
  name: "",
  img: "",
  category: "",
  price: "",
  level: "",
  time: "",
  star: "",
  teacher: "",
  video: "",
};

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
});

const AddCourseModal = ({ onClose }) => {
  const [quillValues, setQuillValues] = useState({
    introduction: "",
    desc: "",
    willLearn: "",
    requirements: "",
    topics: "",
  });

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  const handleQuillChange = (field, value) => {
    setQuillValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (values, { resetForm }) => {
    let formattedTopics = [];

    try {
      if (values.topics && values.topics.trim() !== "") {
        formattedTopics = JSON.parse(values.topics);
        if (!Array.isArray(formattedTopics)) {
          throw new Error("Topics must be a JSON array.");
        }
      }
    } catch (error) {
      console.error("Error parsing topics JSON:", error);
      formattedTopics = [];
    }

    const courseData = {
      ...values,
      topics: formattedTopics,
      introduction: quillValues.introduction,
      desc: quillValues.desc,
      willLearn: quillValues.willLearn,
      requirements: quillValues.requirements,
    };

    try {
      await addCourse(courseData);
      toast.success("دوره با موفقیت افزوده شد", {
        position: "top-center",
      });
      resetForm();
      onClose();
    } catch (error) {
      toast.error("خطا در افزودن دوره", {
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
        <p className="text-xl font-bold mt-8">افزودن دوره</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {[
              { label: "نام دوره:", name: "name", type: "text" },
              { label: "عکس دوره:", name: "img", type: "text" },
              { label: "دسته بندی دوره:", name: "category", type: "text" },
              { label: "قیمت دوره:", name: "price", type: "number" },
              { label: "زمان دوره:", name: "time", type: "text" },
              { label: "نمره دوره:", name: "star", type: "number" },
              { label: "استاد دوره:", name: "teacher", type: "text" },
              { label: "ویدیو معرفی دوره:", name: "video", type: "text" },
            ].map(({ label, name, type }) => (
              <div className="flex items-center gap-3 mt-2" key={name}>
                <label htmlFor={name}>{label}</label>
                <Field
                  className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                  type={type}
                  name={name}
                  id={name}
                  placeholder={label}
                />
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-500"
                />
              </div>
            ))}

            {/* Dropdown for Course Level */}
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="level">سطح دوره:</label>
              <Field
                as="select"
                className="border-2 px-2 py-1 rounded-lg text-gray-800 w-[300px]"
                name="level"
                id="level"
              >
                <option value="">انتخاب کنید</option>
                <option value="مقدماتی">مقدماتی</option>
                <option value="متوسط">متوسط</option>
                <option value="پیشرفته">پیشرفته</option>
                <option value="همه سطوح">همه سطوح</option>
              </Field>
              <ErrorMessage
                name="level"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Rich Text Editors */}
            {[
              { label: "متن معرفی دوره:", field: "introduction" },
              { label: "توضیحات دوره:", field: "desc" },
              { label: "موارد آموزشی:", field: "willLearn" },
              { label: "پیش‌نیازها:", field: "requirements" },
              { label: "عناوین دوره:", field: "topics" },
            ].map(({ label, field }) => (
              <div className="mt-4" key={field}>
                <label>{label}</label>
                <ReactQuill
                  value={quillValues[field]}
                  onChange={(value) => handleQuillChange(field, value)}
                  className="mt-2 border rounded-lg min-h-[200px]"
                />
              </div>
            ))}

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-sky-200 px-3 py-2 text-blue-900 font-semibold rounded-lg hover:bg-sky-300"
              >
                افزودن دوره
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddCourseModal;
