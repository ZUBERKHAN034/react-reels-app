import "./posts.css";
import CircularProgress from "@mui/material/CircularProgress";
import ChatBubble from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Video from "../video/Video";
import Like from "../like/Like";
import React, { useEffect, useState, Fragment } from "react";
import { database } from "../../services/firebase";
import UserLikes from "../user_likes/UserLikes";
import Comment from "../comment/Comment";
import Comments from "../comments/Comments";

export default function Posts({ user }) {
  let [posts, setPosts] = useState(null);
  const [open, setOpen] = React.useState(null);

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

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
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
                  <ChatBubble
                    className="chat-styling"
                    onClick={() => handleClickOpen(post.postId)}
                  />
                  <Dialog
                    open={open === post.postId}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth="md"
                  >
                    <div className="modal-container">
                      <div className="video-modal">
                        <video autoPlay={true} muted="muted" controls>
                          <source src={post.postUrl} />
                        </video>
                      </div>
                      <div className="comment-modal">
                        <Card className="all-comments">
                          <Comments post={post} />
                        </Card>
                        <Card variant="outlined" className="add-comment">
                          <Typography style={{ padding: "1.7%" }}>
                            {post.likes.length === 0
                              ? "Liked by nobody"
                              : `Liked by ${post.likes.length} ${
                                  post.likes.length === 1 ? "user" : "users"
                                }`}
                          </Typography>
                          <div className="likes-container">
                            <UserLikes post={post} user={user} />
                            <Comment user={user} post={post} />
                          </div>
                        </Card>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
