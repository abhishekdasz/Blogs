// pages/addBlog.js
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../newBlog/newBlog.scss';
import Link from 'next/link';

const AddBlog = () => {
  const router = useRouter();

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
    description: ''
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlogsDetails({
      ...blogsDetails,
      [name]: value
    });
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      // Prevent the default behavior of the "Enter" key (usually creating a new line in the textarea)
      e.preventDefault();

      // Get the current cursor position
      const { selectionStart, selectionEnd, value } = e.target;

      // Insert a newline character at the current cursor position
      const updatedValue =
        value.substring(0, selectionStart) +
        '\n\n' +
        value.substring(selectionEnd);

      // Update the state with the new textarea value
      setBlogsDetails({
        ...blogsDetails,
        description: updatedValue
      });
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/blogs/create', {
        title: blogsDetails.title,
        description: blogsDetails.description,
        userId: userId
      });
      setBlogsDetails({ title: '', description: '' });
      console.log(response.data.message);
      router.push('/blogs');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-container">
      <h1> Create Your Blog Post </h1>
      <p style={{marginBottom:'1rem'}}> Share your ideas, experiences, and stories with the world by creating your very own blog post. Craft your thoughts, express yourself, and inspire others through your writing.  Start typing your blog title and content below, press 'Enter' to make a new paragraph and click 'Add Blog' to publish your masterpiece." </p>
      <form onSubmit={handleAddBlog}>
        <div>
          <input
            name="title"
            value={blogsDetails.title}
            onChange={handleInputs}
            placeholder="Enter blog title..."
          />
        </div>
        <div>
          <textarea
            name="description"
            value={blogsDetails.description}
            onChange={handleInputs}
            onKeyDown={handleEnterKey} // Add the onKeyDown event handler
            placeholder="Enter blog description..."
          />
        </div>
        <button className='button'>Add Blog</button>
        <Link href='/blogs' className='button'> Cancel </Link>
      </form>
    </div>
  );
};

export default AddBlog;
