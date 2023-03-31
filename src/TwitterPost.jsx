import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite, MdShare } from "react-icons/md";
import { FaRegComments, FaRetweet } from "react-icons/fa";
import "./twitterPost.css";

const TwitterPost = (props) => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const { postId } = props;
  const [liked, setLiked] = useState(false);
  const [marked, setMarked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [randomColor, setRandomColor] = useState(null);
  const [colorChanged, setColorChanged] = useState(false);
  const userInfo = user && user[0];

  // fetching data
  const getPost = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();
    return data;
  };

  const getComment = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    const data = await res.json();
    return data;
  };

  const getPhoto = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?id=${id}`
    );
    const data = await res.json();
    return data;
  };

  const getUser = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?id=${id}`
    );
    const data = await res.json();
    return data;
  };

  // useEffect usage 
  useEffect(() => {
    const fetchFullPost = async (id) => {
      const newPost = await getPost(id);
      const newPhoto = await getPhoto(newPost.id);
      const newUser = await getUser(newPost.userId);
      const newComment = await getComment(newPost.id);
      setPost(newPost);
      setUser(newUser);
      setComment(newComment);
      setPhoto(newPhoto);
    };

    fetchFullPost(postId);
  }, []);

  // rendom Change User avatar background color just once
  useEffect(() => {
    if (!colorChanged) {
      const newColor = Math.floor(Math.random() * 12345678).toString(16);
      setRandomColor(newColor);
      setColorChanged(true);
    }
  }, [colorChanged]);

  // toggle section
  const toggleComment = () => setIsComment(!isComment);
  const toggleLike = () => setLiked(!liked);
  const toggleMark = () => setMarked(!marked);

  return (
    post &&
    user &&
    comment &&
    photo && (
      <div className="twitt-post">
        <div className="profile-wrapper">
          <div
            className="profile-pic"
            style={{ backgroundColor: `#${randomColor}` }}
          >
            {userInfo.name && userInfo.name.charAt(0).toUpperCase()}
          </div>

          <div className="userinfo-wrapper">
            <div className="user-info">
              <h3 className="username">{userInfo.name && userInfo.name}</h3>
              <h3 className="userlogin">
                @{userInfo.username && userInfo.username}
              </h3>
              <button className="dot-button" onClick={toggleMark}>
                ...
              </button>
              {marked && (
                <ul>
                  <li onClick={toggleLike}>
                    {liked ? <MdFavorite /> : <MdFavoriteBorder />}
                  </li>
                  <li>See Tweet</li>
                </ul>
              )}
            </div>

            <p className="user-text">{post.title}</p>
          </div>
        </div>

        <div className="post-content">
          <p className="post-text">{post.body}</p>
          <img src={photo[0].url} alt="" className="post-img" />
        </div>

        <div className="post-footer">
          <div className="action-buttons">
            <button onClick={toggleComment}>
              <FaRegComments />
            </button>
            <button>
              <FaRetweet />
            </button>
            <button onClick={toggleLike}>
              {liked ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
            <button>
              <MdShare/>
            </button>
          </div>
        
          {isComment &&
            comment.map((com) => (
              <div key={com.id} className="comment">
                <p className="comment-name">{com.name}</p>
                <p className="comment-email">{com.email}</p>
                <p className="comment-body">{com.body}</p>
              </div>
            ))}
        </div>
      </div>
    )
  );
};
export default TwitterPost;
