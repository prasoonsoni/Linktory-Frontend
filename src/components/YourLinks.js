import React, { useState, useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import "./styles/YourLinks.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Link from "./Link";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function YourLinks() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [snackbarStatus, setSnackbarStatus] = useState({
        open: false,
        severity: "",
        message: "",
    });
    const linksInitial = [];
    const [links, setLinks] = useState(linksInitial);

    const getLinks = async () => {
        const response = await fetch(`${BASE_URL}/api/links/getlinks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("token"),
            },
        });
        const json = await response.json();
        if (json.success) {
            setLinks(json.links);
        } else {
            setLinks([]);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarStatus({ open: false, severity: "", message: "" });
    };

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            getLinks();
        } else {
            navigate("/login");
        }
    },[links]);

    return (
        <>
            <Backdrop
                sx={{ color: "#131415", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={snackbarStatus.open}
                autoHideDuration={1000}
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
            <h1 className="links-title">Your Links</h1>
            {links.length === 0 && <p>No Links Available...</p>}

            {links.map((link) => {
                return <Link key={link._id} link={link} />;
            })}
        </>
    );
}
