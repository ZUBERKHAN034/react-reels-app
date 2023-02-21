import "./posts.css";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Video from "../video/Video";
import Like from "../like/Like";
import { useEffect, useState, Fragment } from "react";
import { database } from "../../services/firebase";

export default function Posts({ user }) {
  let [posts, setPosts] = useState(null);
  useEffect(() => {
    let getPosts = [];
    const clearUser = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((fetchedPosts) => {
        getPosts = [];

        fetchedPosts.forEach((post) => {
          const postData = { ...post.data(), id: post.id };
          getPosts.push(postData);
        });

        setPosts(getPosts);
      });

    return clearUser;
  }, []);

  const isLoading = posts === null || user === null;
  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => {
            return (
              <Fragment key={index}>
                <div className="videos">
                  <Video srcUrl={post.postUrl} />
                  <div className="user-profile">
                    <Avatar alt={user.fullName} src={user.profileUrl} />
                    <h4>{user.fullName}</h4>
                  </div>
                  <Like user={user} post={post} />
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
