import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import {withFormik, Form, Field } from 'formik';

const AddUserForm = ({values}) => {
  return (
    <div>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <Field type="email" name="email" placeholder="Email" />
        <Field type="password" name="password" placeholder="Password" />
        <Field type="checkbox" name="tos" />
        <button>Submit!</button>
      </Form>
    </div>
  )
}

const FormikForm = withFormik({
  mapPropsToValues({name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || "false",
    };
  },
  handleSubmit(values) {
    console.log(values);
  }
})(AddUserForm);

//   validationSchema: Yup.object().shape({

//   }),
//   handleSubmit(values)
// })

export default FormikForm