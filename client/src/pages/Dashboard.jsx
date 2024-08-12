import React, { useEffect, useState } from 'react'
import DashProfile from '../components/DashProfile'
import DashSidebar from '../components/DashSidebar';
import {useLocation} from 'react-router-dom'
import DashPosts from '../components/DashPosts';

export default function Dashboard() {

  const location = useLocation();
  const [tab,setTab] = useState("");
  useEffect(()=>{
    const searchUrl = new URLSearchParams(location.search);
    const fetchTab = searchUrl.get('tab');
    if(fetchTab && fetchTab!=""){
      setTab(fetchTab);
    }
  },[location.search]);

  return (
    <div className=' min-h-screen flex flex-col md:flex-row'>
      {/* dash board slider */}
      <div className=' min-w-56'>
        <DashSidebar/>
      </div>
      {/* profilea and other */}
     {tab==='profile' && <DashProfile/>}
     {tab==='posts' && <DashPosts/>}
     
    </div>
  )
}
