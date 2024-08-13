import React from "react";
import * as yup from "yup";

import logo from "../../assets/images/general/logo.png";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useLogin } from "./useLogin";

const Login = () => {
  const { login, isPending, isError } = useLogin();

  const validation = yup.object().shape({
    email: yup
      .string()
      .required("لطفاً ایمیل را وارد کنید.")
      .email("فرمت ایمیل صحیح نیست."),
    password: yup.string().required("لطفاً رمز عبور را وارد کنید."),
  });

  const onSubmit = (values) => {
    const { email, password } = values;

    if (!email || !password) {
      return;
    }

    login({ email, password });

    if (!isError) {
      toast.success("با موفقیت وارد شدید !", {
        position: "top-center",
      });
    } else {
      toast.error("خطا در ورود !", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="bg-gray-100 h-[100vh] flex items-center justify-center">
      <div className=" w-[400px] h-[500px] py-2 px-10 rounded-xl shadow-lg shadow-gray-400 bg-white">
        <img className=" w-40 mx-auto" src={logo} alt="logo" />
        <Formik
          initialValues={{
            email: "",
            passwod: "",
          }}
          validationSchema={validation}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form></Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
