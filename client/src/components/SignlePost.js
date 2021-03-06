import React, { useEffect, useState, useCallback, useContext } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const SignlePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const { user } = useContext(Context);

  //Public folder
  const PF = "http://localhost:5000/images/";

  const getPost = useCallback(async () => {
    const response = await axios.get("/posts/" + path);
    setPost(response.data);
    setTitle(response.data.title);
    setDesc(response.data.desc);
  }, [path]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title: title,
        desc: desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single_post">
      <div className="single_post_image">
        {post.photo && <img src={PF + post.photo} alt="" />}
      </div>
      {post.username === user?.username && (
        <div className="single_post_events">
          <i className="far fa-edit" onClick={() => setUpdateMode(true)}></i>
          <i className="fas fa-trash-alt" onClick={handleDelete}></i>
        </div>
      )}
      {updateMode ? (
        <input
          className="title_update"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <div className="single_post_title">
          <h2>{title}</h2>
        </div>
      )}
      <div className="single_post_author_time">
        <Link to={`/?user=${post.username}`} className="link">
          <span>Author: {post.username}</span>
        </Link>

        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      <div className="single_post_text">
        {updateMode ? (
          <textarea className="desc_update" value={desc} onChange={(e) => setDesc(e.target.value)} />
        ) : (
          <p>{desc}</p>
        )}
      </div>
      {updateMode && (
        <div className="update_post">
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default SignlePost;
