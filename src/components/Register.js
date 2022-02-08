import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "./ParticleBackground";
import "./styles/Register.css";
import { Link} from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import logo from "./images/logo.png";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Register() {
  const navigate = useNavigate();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarStatus({ open: false, severity: "", message: "" });
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let { name, username, email, password } = credentials;
    name = name.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    if (
      email.length === 0 ||
      password.length === 0 ||
      name.length === 0 ||
      username.length === 0
    ) {
      setSnackbarStatus({
        open: true,
        severity: "warning",
        message: "Fields cannot be empty",
      });
      return;
    }
    setLoading(true);
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    });
    const json = await response.json();

    if (json.success) {
      setSnackbarStatus({
        open: true,
        severity: "success",
        message: "Account created successfully",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setSnackbarStatus({
        open: true,
        severity: "error",
        message: json.message,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setTimeout(() => {
        navigate("/home");
      }, 500);
    }
  });

  return (
    <div>
      <ParticleBackground />
      <Backdrop
        sx={{ color: "#131415", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={snackbarStatus.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={snackbarStatus.severity}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {snackbarStatus.message}
        </Alert>
      </Snackbar>

      <div className="register-main">
        <div className="w-100">
          <img
            src={logo}
            alt=""
            height="50vh"
            className="image my-3"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <h3 className="text" style={{ color: "#131415" }}>
          Create an account for free
        </h3>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control textbox"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3 my-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control textbox"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3 my-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control textbox"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3 my-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control textbox"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleOnChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary textbox my-4"
            onClick={handleClick}
          >
            Sign up with email
          </button>
          <p className="info-text my-3">
            <Link className="info-text" to={"/login"} role="button">
              Already have an account?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
