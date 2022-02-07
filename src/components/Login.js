import React, { useState, useEffect } from "react";
import ParticleBackground from "./ParticleBackground";
import "./styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import logo from "./images/logo.png";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
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
        let { email, password } = credentials;
        email = email.trim();
        password = password.trim();
        if (
            email.length === 0 ||
            password.length === 0 ||
            (email.length === 0 && password.length === 0)
        ) {
            setSnackbarStatus({
                open: true,
                severity: "warning",
                message: "Fields cannot be empty",
            });
            return;
        }
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();

        if (json.success) {
            setSnackbarStatus({
                open: true,
                severity: "success",
                message: "Logged in successfully",
            });
            sessionStorage.setItem("token", json.authtoken);
            setTimeout(() => {
              navigate("/home");
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
      if(sessionStorage.getItem('token')){
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
            <div className="mx-auto main">
                <div className="w-100">
                    <img src={logo} alt="" height="50vh" className="image my-3" onClick={() => { navigate('/') }} />

                </div>
                <h3 className="text" style={{ color: "#131415", marginTop: "5vh" }}>
                    Sign in to your Linktory account
                </h3>
                <form>
                    <div className="mb-3 my-4">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control textbox"
                            id="email"
                            aria-describedby="emailHelp"
                            name="email"
                            value={credentials.email}
                            onChange={handleOnChange}
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3 my-4">
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
                        Login
                    </button>
                    <p className="info-text my-3">
                        Don't have an account?{" "}
                        <Link className="info-text" to={"/register"} role="button">
                            Create one.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
