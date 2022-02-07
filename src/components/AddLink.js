import React, { useState } from 'react';
import './styles/AddLink.css'
import { Backdrop, CircularProgress } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function AddLink() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({ name: "", link: "" });
    const [loading, setLoading] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState({ open: false, severity: "", message: "", });

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarStatus({ open: false, severity: "", message: "" });
    };

    const handleOnChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const onClick = async (e) => {
        e.preventDefault();
        if (details.link.length === 0 || details.name.length === 0) {
            setSnackbarStatus({ open: true, severity: "warning", message: "Fields cannot be empty", });
            return;
        }
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/links/addlink`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("token")
            },
            body: JSON.stringify(details),
        });
        const json = await response.json();
        setLoading(false);
        if (json.success) {
            setSnackbarStatus({ open: true, severity: "success", message: json.message })
        } else {
            setSnackbarStatus({ open: true, severity: "danger", message: json.message })
        }
        setDetails({ name: "", link: "" })
    }

    const logout = ()=>{
        sessionStorage.clear();
        setSnackbarStatus({ open: true, severity: "success", message: "Logged out successfully" });
        setTimeout(() => {
            navigate('/login');  
        }, 500);
    }
    return (
        <>
            <Backdrop
                sx={{ color: "#131415", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={snackbarStatus.open}
                autoHideDuration={1000}
                onClose={handleClose}>
                <Alert
                    severity={snackbarStatus.severity}
                    sx={{ width: "100%" }}
                    onClose={handleClose}>
                    {snackbarStatus.message}
                </Alert>
            </Snackbar>
            <div className="logout-container">
                <h1 style={{ width: "100%" }}>Add Your Link</h1>
                <div className="logout">
                    <i class="logout-button fa-solid fa-arrow-right-from-bracket fa-2x onHover" onClick={logout}></i>
                </div>
            </div>
            <form className='form-element' style={{ display: "flex" }}>
                <div class="form-group r-margin">
                    <input type="text" value={details.name} class="form-control" id="name" name='name' placeholder='Enter name here...' onChange={handleOnChange} />
                </div>
                <div class="form-group r-margin">
                    <input type="text" value={details.link} class="form-control" id="link" name='link' placeholder='Enter link here...' onChange={handleOnChange} />
                </div>
                <button type="submit" class="btn btn-success" onClick={onClick}><i class="fa-solid fa-plus"></i> Add</button>
            </form>
        </>
    );
}
