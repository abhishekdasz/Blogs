import React from 'react';
import Link from 'next/link';
import axios from 'axios';


const BlogsCard = (props) => {
  const { id, title, description, isUser, handleGetBlogs } = props;
  const handleDelete = async () =>{
    try 
    {
      const res = await axios.delete(`/api/blogs/delete/${id}`);
      console.log(res.data);
      handleGetBlogs();
    }
    catch(error)
    {
      console.log(error);
    }
  }

  return (
    <div>
      <h5> Title: {title} </h5>
      <p> Description: {description} </p>
      <div> 
        {isUser && 
          <div>  
            <Link href={`/blogdetails/${id}`}> <p> edit </p> </Link> 
            <p onClick={handleDelete}> delete </p>
          </div>  
        } 
      </div>
    </div>
  );
};

export default BlogsCard;
