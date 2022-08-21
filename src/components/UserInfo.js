import React, { useEffect, useState } from "react";
import logo from './images/logo.png'
import './styles/UserInfo.css'
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import LinktoryButton from "./LinktoryButton";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function UserInfo() {
    const { username } = useParams();
    const navigate = useNavigate();
    const linksInitial = [];
    const [links, setLinks] = useState(linksInitial);
    const [header, setHeader] = useState(username);

    useEffect(() => {
        const getUserData = async () => {
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
                setLinks([{...links}]);
                setHeader(json.message)
            }
        }
        getUserData()
    }, [links,username]);

    const handleOnClick = () => {
        navigate('/home');
    }

    return (
        <>
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
                            return (<LinktoryButton key={link._id} link={link.link} name={link.name}/>)
                            // return (<a type="button" key={link._id} href={link.link} target="_blank" className="btn btn-outline-primary link-btn user-button my-1">{link.name}</a>)
                        })}
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div className="footer-container">
                    <p className="copyright"><b>Made with ❤️ by <a href="https://prasoon.codes/" target="_blank">Prasoon</a></b></p>
                </div>
            </footer>
        </>

    );
}
