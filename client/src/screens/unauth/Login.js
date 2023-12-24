import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import M from "materialize-css";

import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

import Input from "../../components/input";
import ButtonContained from "../../components/button";
import { loginSchema } from "../../validation/validationSchema";
import AppContext from "../../context";

// import AppContext from '../../../store/context/context'
//auth
// import { fakeAuth } from '../../../components/protected'

const Login = (props) => {
  // const history = useHistory();
  const { state, userData } = useContext(AppContext);

  //async
  useEffect((_) => {
    const token = localStorage.getItem("jwt");
    // if(localStorage.getItem("jwt") && localStorage.getItem("jwt").length){
    // if(token && token.length){
    //     fakeAuth.authenticate()
    //     props.history.push('/')
    // }
  }, []);

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { resetForm }) => {
        const formBody = {
          email: values.email,
          password: values.password,
        };
        // console.log(formBody, ' fff')
        axios
          .post("http://localhost:5000/signin", formBody)
          .then((res) => {
            if (res.status === 200) {
              // console.log(res, ' ress')
              userData(res.data.user);
              // fakeAuth.authenticate()
              localStorage.setItem("jwt", res.data.token);
              localStorage.setItem("user", JSON.stringify(res.data.user));
              // fakeAuth.authenticate()
              // M.toast({
              //   html: res.data.message,
              //   classes: "#43a047 green darken-1",
              // });
              // history.push("/");
            }
          })
          //  .catch(err => console.log(err.response, ' err'))
          .catch(
            (err) => err && "errror"
            // M.toast({
            //   html: err.response.data.error,
            //   classes: "#c62828 red darken",
            // })
          );
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
              >
                SIGN IN
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

                  <ButtonContained
                    buttonName="Sign In"
                    disabled={isSubmitting}
                  />
                </Form>
              </div>

              <Link
                to="/signup"
                className="center"
                style={{ display: "block", color: "#FF3F6C" }}
              >
                New user ? Please signUp
              </Link>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};
export default Login;
