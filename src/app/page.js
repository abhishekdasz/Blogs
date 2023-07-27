"use client"
import Link from 'next/link'
import React from 'react'
import { useUserContext } from '@/contexts/UserContext';


const page = () => {
  const { userInfo } = useUserContext();
  return (
    <div>
      Home Page
      <h1> Hello {userInfo?.username} </h1>
      <Link href='/chatbot'> ChatBot </Link>
      <Link href='/blogs'> Blogs </Link>
      <Link href='/login'> Login </Link>
    </div>
  )
}

export default page