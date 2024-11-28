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
  willLearn: yup.string().required("موارد آموزشی الزامی است"),
  requirements: yup.string().required("پیش‌نیازها الزامی است"),
  topics: yup.string().required("عناوین دوره الزامی است"),
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
            willLearn: course.willLearn || "",
            requirements: course.requirements || "",
            topics: course.topics || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* Regular Inputs */}
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

              {/* Textareas for Long Inputs */}
              {[
                { label: "متن معرفی دوره:", name: "introduction" },
                { label: "توضیحات دوره:", name: "desc" },
                { label: "موارد آموزشی:", name: "willLearn" },
                { label: "پیش‌نیازها:", name: "requirements" },
                { label: "عناوین دوره:", name: "topics" },
              ].map(({ label, name }) => (
                <div className="mt-4" key={name}>
                  <label htmlFor={name}>{label}</label>
                  <Field
                    as="textarea"
                    className="border-2 px-2 py-1 rounded-lg text-gray-800 w-full min-h-[100px]"
                    name={name}
                    id={name}
                    placeholder={label}
                  />
                  {/* <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-500"
                  /> */}
                </div>
              ))}

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-sky-200 px-3 py-2 text-blue-900 font-semibold rounded-lg hover:bg-sky-300"
                >
                  تغییر دوره
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCourseModal;
