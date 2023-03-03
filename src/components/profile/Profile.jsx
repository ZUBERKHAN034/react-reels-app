import "./profile.css";
import React, { useEffect, useState, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../services/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Navbar from "../navbar/Navbar";
import ChatBubble from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import Like from "../like/Like";
import UserLikes from "../user_likes/UserLikes";
import Comment from "../comment/Comment";
import Comments from "../comments/Comments";

export default function Profile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    database.users.doc(id).onSnapshot((usr) => {
      setUserInfo(usr.data());
    });
  }, [id]);

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

  const cb = (entries) => {
    entries.forEach((entry) => {
      const element = entry.target.childNodes[0];
      element.play().then(() => {
        if (!element.paused && !entry.isIntersecting) {
          element.pause();
        }
      });
    });
  };

  const observer = new IntersectionObserver(cb, { threshold: 0.6 });

  useEffect(() => {
    const element = document.querySelectorAll(".videos");
    element.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [posts]);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const isLoading = posts === null || userInfo === null;

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <Navbar user={userInfo} logout={logout} />
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={userInfo.profileUrl} alt="profile-picture" />
              </div>
              <div className="info">
                <Typography variant="h5">Email : {userInfo.email}</Typography>
                <Typography variant="h6">
                  Posts : {userInfo.postIds.length}
                </Typography>
              </div>
            </div>
            <hr />
            <div className="profile-videos-container">
              {posts.map((post, index) => {
                return (
                  <Fragment key={index}>
                    <div className="videos">
                      <video
                        muted="muted"
                        onClick={() => handleClickOpen(post.postId)}
                      >
                        <source src={post.postUrl} />
                      </video>

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
                                <UserLikes post={post} user={userInfo} />
                                <Comment user={userInfo} post={post} />
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
          </div>
        </div>
      )}
    </div>
  );
}
