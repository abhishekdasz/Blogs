// pages/blogs.js
'use client'
import React, { useEffect, useState } from 'react';
import BlogsCard from '../components/BlogsCard';
import Link from 'next/link';
import axios from 'axios';
import '../blogs/blogs.scss';

const Blogs = ({ initialBlogs }) => {
  const [userInfo, setUserInfo] = useState();
  const [updatedBlogs, setUpdatedBlogs] = useState([]);
  
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/userDetails');
      console.log(res.data);
      setUserInfo(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const userId = userInfo?._id;

  const handleGetBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs/read');
      console.log(res.data.blogs);
      setUpdatedBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);

  return (
    <div className='blogs-container'>
      <h1> Hey {userInfo?.username}, discover amazing blogs! </h1>
      <h1> Blogs </h1>
      <div className='blogs-buttons'>
        <Link href='/newBlog'>
          <button> Create Your Blog </button>
        </Link>
        <button onClick={handleGetBlogs}> Get Latest Blogs </button>
        <Link href='/'>
          <button> Back to Home </button>
        </Link>
      </div>
      <div>
        {updatedBlogs.length > 0 ? (
          updatedBlogs.map((element) => (
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
        ) : initialBlogs?.length > 0 ? (
          initialBlogs.map((element) => (
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

export async function getServerSideProps() {
  try {
    const res = await axios.get('/api/blogs/read');
    const initialBlogs = res.data.blogs;
    return {
      props: {
        initialBlogs,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        initialBlogs: [],
      },
    };
  }
}

export default Blogs;
