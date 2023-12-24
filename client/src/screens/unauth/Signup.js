import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
//

// import M from "materialize-css";
import FileBase64 from "react-file-base64";
import { signupSchema } from "../../validation/validationSchema";
import Input from "../../components/input";
import ButtonContained from "../../components/button";
//auth
// import { fakeAuth } from "../../../components/protected";
// import AppContext from '../../store/context/context'

export default function Signup(props) {
  // const { state, userData } = useContext(AppContext)

  // console.log(state, ' sttaaaa')

  // const history = useHistory();
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

  const handleSu = (e) => {
    e.preventDefault();
    // console.log(data, ' ddd')
    setData({
      name: "",
      email: "",
      password: "",
    });

    const { name, email, password } = data;
    const formBody = { name, email, password, pic: base64 };
    const resetFormBody = { name: "", email: "", password: "" };

    // console.log(formBody, ' fff')
    // setBase64('')
    // setFileName('')
    axios
      .post("http://localhost:5000/signup", formBody)
      .then((res) => {
        if (res.status === 200) {
          // M.toast({
          //   html: res.data.message,
          //   classes: "#43a047 green darken-1",
          // });
          // setTimeout(history.push("/signin"), 3000);
          setData(resetFormBody);
          setBase64("");
          setFileName("");
        }
        // console.log(res, ' ress')
        // console.log(res.data.decode.user, ' user')
        // userData(res.data.decode.user)
        // localStorage.setItem('jwt', res.data.token)
        // localStorage.setItem('user', JSON.stringify(res.data.decode.user))
      })
      .catch((err) => {
        if (err) {
          // M.toast({
          //   html: err.response.data.error,
          //   classes: "#c62828 red darken",
          // }),
          setData(resetFormBody);
        }
      });
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
        // console.log(formBody, ' fff')
        axios
          .post("http://localhost:5000/signup", formBody)
          .then((res) => {
            if (res.status == 200) {
              // M.toast({
              //   html: res.data.message,
              //   classes: "#43a047 green darken-1",
              // });
              // setTimeout(history.push("/signin"), 3000);
              resetForm();
              setBase64("");
              setFileName("");
            }
          })
          .catch((err) => {
            if (err) {
              // M.toast({
              //   html: err.response.data.error,
              //   classes: "#c62828 red darken",
              // }),
              resetForm();
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
