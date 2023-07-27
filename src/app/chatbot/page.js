'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

import { useUserContext } from '@/contexts/UserContext';

const page = () => {
  const { userInfo, setUserInfo } = useUserContext();
  const router = useRouter();


  const handleLogOut = async () =>{
    try 
    {
      await axios.get('/api/logout');
      router.push('/login')
    }
    catch(error)
    {
      console.log(error);
    }
  }
  
  const getUserDetails = async () =>{
    try
    {
      const res = await axios.get('/api/userDetails');
      console.log(res.data); 
      // store data into the context api states, so that it can be accessible from other components also
      setUserInfo(res.data.data);
    }
    catch(error)
    {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    getUserDetails();
  }, [])

  return (
    <div>
      {/* const { email } = userData; */}
      Chatbot page
      <p> Username: { userInfo?.username } </p>
      <p> Email: { userInfo?.email } </p>
      <p> Phone: { userInfo?.phone } </p>
      <button onClick={handleLogOut} > Logout </button>

      <Link href='/'> Go to HomePage </Link>
      <Link href='/blogs'> Go to Blogs </Link>
    </div>
  )
}

export default page
