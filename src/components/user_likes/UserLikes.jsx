import "./userLikes.css";
import React, { useEffect, useState } from "react";
import { database } from "../../services/firebase";
import Favorite from "@mui/icons-material/Favorite";

export default function UserLikes({ user, post }) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    const isLiked = post.likes.includes(user.userId) ? true : false;
    setLike(isLiked);
  }, [post]);

  const handleLike = () => {
    if (like) {
      const updatedLikes = post.likes.filter((like) => like !== user.userId);
      database.posts.doc(post.id).update({
        likes: updatedLikes,
      });
    } else {
      const updatedLikes = [...post.likes, user.userId];
      database.posts.doc(post.id).update({
        likes: updatedLikes,
      });
    }
  };

  return (
    <div className="user-likes">
      {like ? (
        <Favorite className={`user-like`} onClick={handleLike} />
      ) : (
        <Favorite className={`user-unlike`} onClick={handleLike} />
      )}
    </div>
  );
}
