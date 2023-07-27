'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogsCard from '../components/BlogsCard';
import Link from 'next/link';

const Blogs = () => {
  const [userInfo, setUserInfo] = useState();
  // verifying the authenticated user by matching the token
  const getUserDetails = async () =>{
    try
    {
      const res = await axios.get('/api/userDetails');
      console.log(res.data); 
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
  const userId = userInfo?._id;

    const [blogsDetails, setBlogsDetails] = useState({
        title: "", description: "",
    })
    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setBlogsDetails({
          ...blogsDetails, [name]: value
        })
    }

    // read
    const [allBlogs, setAllBlogs] = useState('');
    const handleGetBlogs = async () =>{
        const res = await axios.get('/api/blogs/read');
        console.log(res.data.blogs);
        setAllBlogs(res.data.blogs)
    }

    useEffect(()=>{
      handleGetBlogs();
    }, [])

  return (
    // create
    <div>
      Blogs 
      <Link href='/newBlog'> <button> Create a New Blog </button> </Link>
      <div>
        {allBlogs.length > 0 ? 
        (
            allBlogs.map((element)=>(
              <BlogsCard key={element._id} id={element._id} title={element.title} description={element.description} isUser={userId === element.userId} handleGetBlogs={handleGetBlogs} />
            ))
        ) : 
        (
            <p> "nothing" </p>
        )}
        </div>

        <h1> Hello {userInfo?.username} </h1>
    </div>
  )
}

export default Blogs
