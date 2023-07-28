'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogsCard from '../components/BlogsCard';
import Link from 'next/link';
import '../blogs/blogs.scss';

const Blogs = () => {
  const [userInfo, setUserInfo] = useState();
  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/userDetails');
      console.log(res.data);
      setUserInfo(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const userId = userInfo?._id;

  const [blogsDetails, setBlogsDetails] = useState({
    title: '',
    description: '',
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlogsDetails({
      ...blogsDetails,
      [name]: value,
    });
  };

  // read
  const [allBlogs, setAllBlogs] = useState('');
  const handleGetBlogs = async () => {
    const res = await axios.get('/api/blogs/read');
    console.log(res.data.blogs);
    setAllBlogs(res.data.blogs);
  };

  useEffect(() => {
    handleGetBlogs();
  }, [allBlogs]); 
  return (
    <div className='blogs-container'>
      <h1> Hey {userInfo?.username}, discover amazing blogs! </h1>
      <h1> Blogs </h1>
      <div className='blogs-buttons'>
        <Link href='/newBlog'>
          <button> Create Your Blog </button>
        </Link>
        <Link href='/'>
          <button> Back to Home </button>
        </Link>
      </div>
      <div>
        {allBlogs.length > 0 ? (
          allBlogs.map((element) => (
            <BlogsCard
              key={element._id}
              id={element._id}
              username={element.userId.username}
              title={element.title}
              description={element.description}
              isUser={userId === element.userId._id}
              handleGetBlogs={handleGetBlogs}
            />
          ))
        ) : (
          <p> There is nothing to show, create your first Blog </p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
