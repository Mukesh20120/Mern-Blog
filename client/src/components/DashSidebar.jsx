import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Sidebar} from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { signOutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

export default function DashSidebar() {
  
  const location = useLocation();
  const [tab,setTab] = useState("");

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
       const res = await fetch('/api/v1/user/sign-out',{
        method: 'POST'
       })
       const fetchData = await res.json();
       if(res.ok){
        dispatch(signOutSuccess());
       }else{
        window.alert('something went wrong',fetchData.message);
       }
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(()=>{
    const searchUrl = new URLSearchParams(location.search);
    const fetchTab = searchUrl.get('tab');
    if(fetchTab && fetchTab!=""){
      setTab(fetchTab);
    }
  },[location.search]);
  return (
    <Sidebar className=' w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={'/dashboard?tab=profile'}>
          <Sidebar.Item active={tab==='profile'} icon={HiUser} label="User" labelColor='dark' as='div'>Profile</Sidebar.Item>
          </Link>
          <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight} className='cursor-pointer'>Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

