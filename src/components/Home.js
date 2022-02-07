import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import AddLink from './AddLink';
import SideProfile from './SideProfile';
import './styles/Home.css'
import YourLinks from './YourLinks';

export default function Home() {
    const navigate = useNavigate();
    
  return (
      <div className="divide">
          <div className="userprofile">
              <SideProfile/>
          </div>
          <div className="addlink">
            <AddLink/>
            <YourLinks/>
          </div>
      </div>
  );
}
