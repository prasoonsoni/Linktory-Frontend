import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./styles/LandingPage.css"
import logo from "./images/logo.png";

export default function LandingPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/home')
        } 
    });
    return (
        <div className='main background'>
            <div className="w-100">
                <img src={logo} alt="" height="50vh" className="image my-3" />
            </div>
            <div className="container">
                <h1 className='my-3' style={{ color: "#131415", fontSize: '64px' }}>The Only Link You’ll Ever Need</h1>
                <p className='info-text'>Connect audiences to all of your content with just one link</p>
                <p className='info-text'>Already on Linktory? <Link className="info-text" to={'/login'} role="button">Login</Link></p>
                <center><Link className="btn btn-primary register" to={"/register"} role="button">Get Started For Free</Link></center>
            </div>
        </div>
    );
}
