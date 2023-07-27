'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
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
        // create
        const handleAddBlog = async (e) => {
            e.preventDefault();
            try 
            {
                const response = await axios.post('/api/blogs/create', {title:blogsDetails.title, description:blogsDetails.description, userId:userId});
                setBlogsDetails({title:'', description:''});
                console.log(response.data.message);
                router.push('/blogs')
            } 
            catch (error) 
            {
              console.error(error);
            }
        };
  return (
    <div>
        <form onSubmit={handleAddBlog}>
        <div>
            <input type="text" name='title' value={blogsDetails.title} onChange={handleInputs} placeholder="Enter blog title..." />
        </div>
        <div>
            <textarea name='description' value={blogsDetails.description} onChange={handleInputs} placeholder="Enter blog description..." />
        </div>
        <button> Add Blog </button>
      </form>
    </div>
  )
}

export default page
