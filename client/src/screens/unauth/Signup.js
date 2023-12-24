import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import FileBase64 from "react-file-base64";
import { signupSchema } from "../../validation/validationSchema";
import Input from "../../components/input";
import ButtonContained from "../../components/button";
import { handleShowAlert } from "../../utils/commonHelper";
import AppContext from "../../context";
import { setCredentials } from "../../slices/authSlice";
//auth
// import { fakeAuth } from "../../../components/protected";
// import AppContext from '../../store/context/context'

export default function Signup(props) {
  //misc
  const dispatch = useDispatch();
  const { state, userData } = useContext(AppContext);

  //image
  const [fileName, setFileName] = useState("");
  const [base64, setBase64] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getFiles = (files) => {
    const baseData = files[0].base64.split(",");
    setBase64(baseData[1]);
    setFileName(files[0].name);
  };

  //async
  useEffect((_) => {
    const token = localStorage.getItem("jwt");
    // if(localStorage.getItem("jwt") && localStorage.getItem("jwt").length){
    if (token && token.length) {
      // fakeAuth.authenticate();
      // props.history.push("/");
    }
  }, []);
  // console.log(localStorage.getItem('user'))
  return (
    <Formik
      validationSchema={signupSchema}
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={(values, { resetForm }) => {
        const formBody = {
          name: values.name,
          email: values.email,
          password: values.password,
          pic: base64,
        };
        axios
          .post("http://localhost:8080/signup", formBody)
          .then((res) => {
            if (res.status === 201) {
              console.log(res, " resss");
              userData(res.data.user);
              localStorage.setItem("jwtToken", res?.data?.token);
              resetForm();
              setBase64("");
              setFileName("");
              dispatch(setCredentials({ ...res }));
            }
          })
          .catch((err) => {
            if (err) {
              handleShowAlert(dispatch, "error", err?.response?.data?.message);
              console.log(err, " errr");
              // resetForm();
            }
          });
        // resetForm()
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        isSubmitting,
        setFieldValue,
      }) => {
        return (
          <div className="unauth_container">
            {/* <button onClick={() => console.log(state, ' sss')}>USER</button> */}
            <div
              className="card mx-auto"
              style={{ width: "60%", margin: "20px auto", padding: "20px" }}
            >
              <h2
                style={{ fontFamily: `Grand Hotel, cursive` }}
                className="center"
                onClick={() => console.log(state, " state from context")}
              >
                SIGN UP
              </h2>

              {/* form */}
              <div
                className="row mx-auto col-sm-12"
                style={{ border: "", width: "80%" }}
              >
                <Form className="col-sm-12 col-md-12" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label
                      style={{ top: "26px" }}
                      className="col-sm-3 col-form-label"
                    >
                      <b>Name : </b>
                    </label>
                    <div className="form-group col-md-7">
                      <Input
                        id="name"
                        name="name"
                        placeholder="Name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && errors.name}
                        errorText={errors.name}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label
                      style={{ top: "26px" }}
                      className="col-sm-3 col-form-label"
                    >
                      <b>Email : </b>
                    </label>
                    <div className="form-group col-md-7">
                      <Input
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && errors.email}
                        errorText={errors.email}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label
                      style={{ top: "26px" }}
                      className="col-sm-3 col-form-label"
                    >
                      <b>Password : </b>
                    </label>
                    <div className="form-group col-md-7">
                      <Input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="text"
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && errors.password}
                        errorText={errors.password}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="file-field input-field">
                    <div
                      className="btn orange darken-1"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span>
                        {fileName && fileName.length
                          ? fileName
                          : "Upload Image"}
                      </span>
                      <FileBase64 multiple={true} onDone={getFiles} />
                    </div>

                    <div
                      style={{ visibility: "hidden" }}
                      className="file-path-wrapper"
                    >
                      <input
                        onChange={(e) => e.target.value}
                        type="text"
                        className="file-path validate"
                        value={fileName}
                      />
                    </div>
                  </div>

                  <ButtonContained
                    buttonName="Sign Up"
                    disabled={isSubmitting}
                  />
                </Form>
              </div>

              <Link
                to="/login"
                className="center"
                style={{ display: "block", color: "#FF3F6C" }}
              >
                Existing user ? Please signIn
              </Link>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
