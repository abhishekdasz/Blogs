// pages/blogs.js

import React from 'react';
import BlogsCard from '../components/BlogsCard';
import Link from 'next/link';
import axios from 'axios';
import '../blogs/blogs.scss';

const Blogs = ({ blogs }) => {
  const userInfo = null; // Set the user info you want here, or fetch it if needed
  const userId = userInfo?._id;

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
        {blogs.length > 0 ? (
          blogs.map((element) => (
            <BlogsCard
              key={element._id}
              id={element._id}
              username={element.userId.username}
              title={element.title}
              description={element.description}
              isUser={userId === element.userId._id}
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
    const res = await axios.get('/api/blogs/read', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    const blogs = res.data.blogs;
    return {
      props: {
        blogs,
      },
    };
  } catch (error) {
    console.error('Error while getting blogs:', error);
    return {
      notFound: true,
    };
  }
}

export default Blogs;
