import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {

  const [allUsers, setAllUsers] = useState([]);
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(() => {
    axios.get("http://localhost:3001/auth/allusers")
    .then((response) => {
      setAllUsers(response.data.map((user) => {return user.username}));
    });
  },[]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    if (allUsers.indexOf(data.username) > -1){
      alert("Username already exists!!");
    }else{
      axios.post("http://localhost:3001/auth", data).then(() => {
        console.log("Success!!");
        navigate("/");
      });
    }
  };

  return (
    <div>
      <h1 className='headerRegistration'> Please Register </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
       >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;