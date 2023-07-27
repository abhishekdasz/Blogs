'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = ({params}) => {
  const router = useRouter();
  const id = params.id;
  const [inputs, setInputs] = useState({
  })

  const getBlogDetail = async () =>{
    try
    {
      const res = await axios.get(`/api/blogs/singleBlog/${id}`, inputs);
      console.log(res?.data.blog);
      setInputs({
        title: res?.data.blog.title,
        description: res?.data.blog.description
      })
    }
    catch(error)
    {
      console.log(error);
    }
  }

  const handleInputs = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setInputs({...inputs, [name]: value})
  }

  useEffect(()=>{
    getBlogDetail();
  }, [id])

  const handleUpdate = async (e) =>{
    e.preventDefault();
    try
    {
      const res = await axios.put(`/api/blogs/update/${id}`, inputs);
      console.log(res);
      router.push('/blogs')
    }
    catch(error)
    {
      console.log(error);
    }
  }
  return (
    <div>
      BlogsDetails {id}
      <form>
        <div>
          <input type="text" name='title' value={inputs?.title} onChange={handleInputs} />
        </div>
        <div>
          <textarea name='description' value={inputs?.description} onChange={handleInputs} ></textarea>
        </div>
        <button onClick={handleUpdate}> Update Blog </button>
      </form> 
    </div>
  )
}

export default page
