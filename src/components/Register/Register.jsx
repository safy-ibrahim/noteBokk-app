import { setNestedObjectValues, useFormik } from "formik";
import signImg from "../../assets/signup-image.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  let [userError, setError] = useState();

  let schema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min length is 3")
      .max(25, "Max is 25")
      .required("Name is required"),
    email: Yup.string().email("Invalid format").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{8,20}$/,
        "Password at least 8 characters & at most 20"
      )
      .required("Password is required"),
    age: Yup.number()
      .min(16, "too young")
      .max(62, "too old")
      .required("Age is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "It must be egyptian number")
      .required("Phone is required"),
  });

  async function handleRegister(values) {
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
      .then((res) => {
        if (res?.data?.msg == "done") {
          navigate("/login");
        }
      })
      .catch((err) => {
        setError(err?.response.data.msg);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="row justify-content-around">
        <div className="col-md-5 ">
          <img src={signImg} className="w-100" alt="" />
        </div>
        <div className="col-md-5 text-start">
          {userError ? <h3 className="text-primary"> {userError}</h3> : ""}

          <h3 className="my-2">Register Now : </h3>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <p className="bg-primary rounded-3 text-white my-2 p-2">
                  {formik.errors.name}
                </p>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                name="age"
                value={formik.values.age}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.age && formik.touched.age ? (
                <p className="bg-primary rounded-3 text-white my-2 p-2">
                  {formik.errors.age}
                </p>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Phone"
                name="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <p className="bg-primary rounded-3 text-white my-2 p-2">
                  {formik.errors.phone}
                </p>
              ) : (
                ""
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

            <p className="mt-2">
              Already have account ?{" "}
              <Link to="/login">
                {" "}
                <span>Login</span>
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
