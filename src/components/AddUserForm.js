import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import {withFormik, Form, Field } from 'formik';

const AddUserForm = ({values, errors, touched, status}) => {
  const [userSubmission, setUserSubmission] = useState([]);
  useEffect(() => {
    status && setUserSubmission(userSubmission => [...userSubmission, status])
  }, [status])
  
  return (
    <div>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (<p>{errors.name}</p>)}
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && (<p>{errors.email}</p>)}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (<p>{errors.password}</p>)}
        <span>I agree to the Terms of Service</span><Field type="checkbox" name="tos" />
        {touched.tos && errors.tos && (<p>{errors.tos}</p>)}
        <button>Submit</button>
      </Form>
      {userSubmission.map(entry => (
        <ul key={entry.id}>
          <li>Name: {entry.name}</li>
          <li>Email: {entry.email}</li>
          <li>Password: {entry.password}</li>
        </ul>
      ))}
    </div>
  )
}

const FormikForm = withFormik({
  mapPropsToValues({name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("You must enter a name")
      .min(2, "Name must be 2 or more characters"),
    email: Yup.string()
      .required("You must enter an email")
      .email("email is not valid"),
    password: Yup.string()
      .required("You must enter a password")
      .min(8, "Your password must be at least 8 characters"),
    tos: Yup.boolean()
      .oneOf([true], "You must agree to the Terms of Service"),
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(AddUserForm);

export default FormikForm