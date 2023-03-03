import "./comments.css";
import React, { useEffect, useState } from "react";
import { database } from "../../services/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
export default function Comments({ post }) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      let allComments = [];
      for (let i = 0; i < post.comments.length; i++) {
        let getComment = await database.comments.doc(post.comments[i]).get();
        allComments.push(getComment.data());
      }

      setComments(allComments);
    }
    fetchComments();
  }, [post]);

  return (
    <div>
      {comments === null ? (
        <CircularProgress />
      ) : (
        comments.map((comment, index) => {
          return (
            <div className="posted-comment" key={index}>
              <Avatar src={comment.userProfileUrl} />
              <p>
                &nbsp;&nbsp;<span>{comment.userName}</span>&nbsp;&nbsp;
                {comment.text}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
