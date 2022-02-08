import React, { useEffect, useState } from "react";
import logo from './images/logo.png'
import './styles/SideProfile.css'
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function SideProfile() {
    const linksInitial = [];
    const [links, setLinks] = useState(linksInitial);
    const [username, setUsername] = useState("");

    useEffect( () => {
        const getLinks = async()=>{
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
                setUsername(json.username);
            } 
        }
        getLinks();
    },[links]);
    
    return (
        <>
            <div className="col">
                <div className="img-container">
                    <img src={logo} alt="linktory" className="logo-img" />
                </div>
                <div className="url-container">
                    {<a className="profile-url" target="_blank" href={`http://localhost:3000/${username}`}>http://localhost:3000/{username}</a>}
                </div>
                {links && links.map((link) => {
                    return (<a type="button" key={link._id} href={link.link} target="_blank" className="btn btn-outline-primary link-btn my-1">{link.name}</a>)
                })}
            </div>
        </>
    );
}
