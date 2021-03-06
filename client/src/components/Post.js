import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  //Public folder
  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      <Link to={`/post/${post._id}`}>
        <div className="post_img">
          {post.photo && <img src={PF + post.photo} alt="post_image" />}
        </div>
      </Link>
      <div className="post_header">
        {post.categories.map((item) => (
          <span key={item._id}>{item.name}</span>
        ))}
      </div>
      <div className="post_title">
        <h3>{post.title}</h3>
      </div>
      <div className="post_time">
        <div>
          Author: <span className="author_name">{post.username}</span>
        </div>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      <div className="post_text">
        <p>{post.desc}</p>
      </div>
    </div>
  );
};

export default Post;
