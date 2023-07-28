'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogsCard from '../components/BlogsCard';

const Blogs = () => {
  const [userInfo, setUserInfo] = useState();
  const [allBlogs, setAllBlogs] = useState([]);

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
    handleGetBlogs();
    getUserDetails();

  }, []);

  const userId = userInfo?._id;

  const handleGetBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs/read', { next: { revalidate: 10 } });
      const blogs = res.data.blogs;
      setAllBlogs(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   handleGetBlogs();
  //   const interval = setInterval(handleGetBlogs, 5000); // Re-fetch blogs every 5 seconds
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className='blogs-container'>
      <h1> Blogs </h1>
      {allBlogs?.length > 0 ? (
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
  );
};

export default Blogs;
