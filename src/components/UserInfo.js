import React, { useEffect, useState } from "react";
import logo from './images/logo.png'
import './styles/UserInfo.css'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function UserInfo() {
    const { username } = useParams();
    const navigate = useNavigate();
    const linksInitial = [];
    const [links, setLinks] = useState(linksInitial);
    const [loading, setLoading] = useState(false);
    const [header, setHeader] = useState(username);

    const getUserData = async () => {
        
    }

    useEffect(async() => {
        const response = await fetch(`${BASE_URL}/api/links/user/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        if (json.success) {
            setLinks(json.links);
        } else {
            setLinks([]);
            setHeader(json.message)
        }
        console.log(json);
    }, [links]);

    const handleOnClick = () => {
        navigate('/home');
    }
    return (
        <>
            <Backdrop
                sx={{ color: "#131415", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="col main-container">
                <div className="user-img-container">
                    <img src={logo} alt="linktory" className="user-logo-img" onClick={handleOnClick} />
                </div>
                <div className="url-container">
                    {<p className="profile-url">{header}</p>}
                </div>
                <div className="col align-btn-container">
                    <div className="row align-btn">
                        {links && links.map((link) => {
                            return (<a type="button" key={link._id} href={link.link} target="_blank" class="btn btn-outline-primary link-btn user-button my-1">{link.name}</a>)
                        })}
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div className="footer-container">
                    <p className="copyright"><b>© 2022 Linktory</b></p>
                </div>
            </footer>
        </>

    );
}
