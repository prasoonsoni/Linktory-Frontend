import React, { useState } from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Backdrop, CircularProgress} from '@mui/material';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Link(props) {
    const { name, link, _id } = props.link
    const [snackbarStatus, setSnackbarStatus] = useState({open: false,severity: "",message: "",});
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({ name: name, link: link });

    const onCancelClick = () => {
        setDisabled(true);
        setDetails({ name, link });
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarStatus({ open: false, severity: "", message: "" });
    };

    const onEditClick = () => {
        if (disabled) {
            setDisabled(false);
        } else {
            setDetails({ name, link });
            setDisabled(true);
        }
    }
    

    const onDeleteClick = async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/links/deletelink/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            }
        });
        const json = await response.json();
        setLoading(false)
        if(json.success){
            setSnackbarStatus({open:true, severity:"success", message:json.message})
        } else {
            setSnackbarStatus({open:true, severity:"danger", message:json.message})
        }

    }

    const updateLink = async()=>{
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/links/updatelink/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":sessionStorage.getItem("token")
            },
            body: JSON.stringify(details),
        });
        const json = await response.json();
        setLoading(false);
        setDisabled(true);
        if(json.success){
            setSnackbarStatus({open:true, severity:"success", message:json.message})
        } else {
            setSnackbarStatus({open:true, severity:"danger", message:json.message})
        }
    }

    const handleOnChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
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
            <div className="card my-3">
                <div className="card-body">
                    <i onClick={onEditClick} className="fa-regular fa-pen-to-square mx-1 onHover"></i>
                    <i onClick={onDeleteClick} className="fa-regular fa-trash-can mx-1 onHover" ></i>
                    <input onChange={handleOnChange} name="name" disabled={disabled} value={details.name} className="form-control my-2" id="name" type="text" placeholder="Name here..." />
                    <input onChange={handleOnChange} name="link" disabled={disabled} value={details.link} className="form-control my-2" id="link" type="text" placeholder="Link here..." />
                    <div className="row">
                        <button onClick={updateLink} style={disabled ? { display: 'none' } : { display: 'block' }} type="button" className="btn btn-success col-sm-2 mx-3"><i className="fa-solid fa-check"></i> Update</button>
                        <button onClick={onCancelClick} style={disabled ? { display: 'none' } : { display: 'block' }} type="button" className="btn btn-danger col-sm-2"><i className="fa-regular fa-circle-xmark"></i> Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}
