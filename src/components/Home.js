import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            //
        } else {
            navigate('/login')
        }
    });
    
  return (
      <>
      <center><h1 style={{"color":"#ffffff"}}>Home</h1></center>
      </>
  );
}
