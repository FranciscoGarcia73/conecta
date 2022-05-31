import React from "react";

import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import "../styles/login.css";

export const Login = ({ setToken }) => {
  const [onBlurUsername, setOnBlurUsername] = useState(false);
  const [onBlurPassword, setOnBlurPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            "https://dev.gescae.online/api/auth",
            {
              username: values.email,
              password: values.password,
            }
          );
          console.log(response);
          setToken(response.data.token);
          navigate("/dashboard", { replace: true });
        } catch (error) {
          setError(error.response.data.message);
        }
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Requerido")
          .email("Email no tiene formato valido"),
        password: Yup.string()
          .required("Requerido")
          .min(6, "Minimo 6 caracteres"),
      })}
    >
      {(formik) => (
        <div className="d-flex flex-column align-items-center justify-content-evenly">
          <div className="d-flex logo justify-content-center">
            <h1>Logo Conecta</h1>
          </div>
          <div className="container-login">
            <Form className="login">
              <div>
                <label
                  className={onBlurUsername ? " focus" : null}
                  htmlFor="email"
                >
                  <span className={onBlurUsername ? " focus top" : " top"}>
                    Email
                  </span>
                  <Field
                    className="input"
                    type="text"
                    name="email"
                    onFocus={(e) => {
                      setOnBlurUsername(true);
                    }}
                    onBlur={(e) => setOnBlurUsername(!onBlurUsername)}
                  />
                </label>
                <ErrorMessage name="email" component={"span"} />
              </div>
              <div>
                <label
                  className={onBlurPassword ? " focus" : null}
                  htmlFor="password"
                >
                  <span className={onBlurPassword ? " focus top" : " top"}>
                    Contraseña
                  </span>
                  <Field
                    className="input"
                    type="password"
                    name="password"
                    autoComplete="off"
                    onFocus={(e) => {
                      setOnBlurPassword(true);
                    }}
                    onBlur={(e) => setOnBlurPassword(!onBlurPassword)}
                  />
                </label>
                <ErrorMessage name="password" component={"span"} />
              </div>
              <div>
                <button className="button" type="submit">
                  Login
                </button>
              </div>
            </Form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}
    </Formik>
  );
};
