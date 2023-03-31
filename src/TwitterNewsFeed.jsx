import React, { useEffect, useState } from "react";
import TwitterPost from "./TwitterPost";
import { ThreeDots } from "react-loader-spinner";
import "./twitterPost.css";

const url = "https://jsonplaceholder.typicode.com/posts";
const TwitterNewsFeed = () => {
  const [posts, setPosts] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading]=useState(true)

// error handling & loading functionality
useEffect(() => {
  fetch(url)
    .then((resp) => {
      if (resp.status >= 200 && resp.status <= 299) {
        return resp.json();
      } else {
        setIsError(true);
        setIsLoading(false);
        setPosts(resp.status);
        throw new Error(resp.status);
      }
    })
    .then((posts) => {
      setPosts(posts);
      setIsLoading(false);
    })
    .catch((error) => console.log(error));
}, []);

// loading spinner section
if (isLoading) {
  return (
    <div className="news-feed">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

if (isError) {
  return <h1>{`Error:${posts}`}</h1>;
}
  return (
    <div className="news-feed">
      {posts&&
      posts.map((post) => {
        return <TwitterPost key={post.id} postId={post.id} />;
      })}
    </div>
  );
};

export default TwitterNewsFeed;
