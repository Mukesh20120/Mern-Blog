import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Sidebar} from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi'

export default function DashSidebar() {
  
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
    <Sidebar className=' w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={'/dashboard?tab=profile'}>
          <Sidebar.Item active={tab==='profile'} icon={HiUser} label="User" labelColor='dark' as='div'>Profile</Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

