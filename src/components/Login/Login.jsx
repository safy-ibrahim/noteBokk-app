import React, { useEffect, useState } from "react";
import loginImg from "../../assets/signin-image.jpg";
import style from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function Login() {
  let navigate = useNavigate();
  let [userError, setError] = useState();

  let schema = Yup.object().shape({
    email: Yup.string().email("Invalid format").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{8,20}$/,
        "Password at least 8 characters & at most 20"
      )
      .required("Password is required"),
  });

  async function handleLogin(values) {
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
      .then((res) => {
        if(res?.data?.msg == "done"){
          localStorage.setItem("userToken",res?.data?.token)
          navigate("/")
        }
      })
      .catch((err) => {
        setError(err?.response.data.msg);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className="row justify-content-around ">
        <div className="col-md-5 text-start order-lg-0 order-1">
          {userError ? <h3 className="text-primary"> {userError}</h3> : ""}

          <h3 className="my-4">Login Now : </h3>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="bg-primary rounded-3 text-white my-2 p-2">
                  {formik.errors.email}
                </p>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="bg-primary rounded-3 text-white my-2 p-2">
                  {formik.errors.password}
                </p>
              ) : (
                ""
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <p className="my-3">
              Don't have account ?{" "}
              <Link to={"register"}>
                <span>Register</span>
              </Link>
            </p>
          </Form>
        </div>
        <div className="col-md-5">
          <img src={loginImg} className="w-100  " alt="" />
        </div>
      </div>
    </>
  );
}
