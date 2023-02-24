import "./comment.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { database } from "../../services/firebase";
export default function Comment({ user, post }) {
  const [text, setText] = useState("");

  const handleText = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleClick = () => {
    const newComment = {
      text: text,
      userProfileUrl: user.profileUrl,
      userName: user.fullName,
    };

    database.comments.add(newComment).then((comment) => {
      database.posts.doc(post.id).update({
        comments: [...post.comments, comment.id],
      });
    });

    setText("");
  };

  return (
    <div className="comment">
      <TextField
        id="filled-basic"
        label="Comment"
        variant="outlined"
        size="small"
        sx={{ width: "70%" }}
        value={text}
        onChange={handleText}
      />
      <Button variant="contained" sx={{ right: "8%" }} onClick={handleClick}>
        Post
      </Button>
    </div>
  );
}
