import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: ""
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate('/login')
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a valid Title!"),
    postText: Yup.string().required()
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    })
    .then((response) => {
      if (response.data.error) {
        navigate('/login');
      }else {
        navigate('/');
      }
    });
  };

  return (
    <div>
    <h1 className='header'> Create Post </h1>
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
      </div>
    </div>
  );
}

export default CreatePost;