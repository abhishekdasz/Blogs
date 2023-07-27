import Link from 'next/link';
import React from 'react';
import '../components/components.scss'
import axios from 'axios';

const BlogsCard = (props) => {
  const { id, username, title, description, isUser, handleGetBlogs } = props;
  
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/blogs/delete/${id}`);
      console.log(res.data);
      handleGetBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  // Replace newline characters with <br> tags
  const renderDescription = () => {
    return description.split('\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        {paragraph}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="blog-card">
      <div className="blog-user-details">
        <p> {username} </p>
        <p> Created at: 20/07/2023 07:48 </p>
      </div>

      <div className="blog-post">
        <h5> Title: {title} </h5>
        <p> Description: {renderDescription()} </p>
      </div>

      <div className="blog-btns">
        {isUser && (
          <div>
            <Link href={`/blogdetails/${id}`}>
              <p> edit </p>
            </Link>
            <p onClick={handleDelete}> delete </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsCard;
