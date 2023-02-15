import "./upload.css";
import { useState } from "react";
import { getUUID } from "../../lib/appfunction";
import { storage, database } from "../../services/firebase";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MovieRounded from "@mui/icons-material/MovieRounded";
import LinearProgress from "@mui/material/LinearProgress";

export default function Upload({ user }) {
  console.log("USER", user);
  // State management
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Methods
  const handleUpload = async (file) => {
    if (file === null) {
      const error = { message: "Please Select Video for Upload!" };
      setError(error);
      setTimeout(() => setError(null), 2000);
      return;
    }

    const allowedSize = 100; // in size in MB
    const fileSize = file.size / (1024 * 1024);
    if (fileSize > allowedSize) {
      const error = { message: "Please Select Video less than 100mb!" };
      setError(error);
      setTimeout(() => setError(null), 2000);
      return;
    }

    try {
      setLoading(true);
      const uid = getUUID();
      const location = `/posts/${uid}/${file.name}`;
      const uploadTask = storage.ref(location).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          setError(error.message);
          setError(error);
          setTimeout(() => setError(null), 4000);
          return;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            const params = {
              likes: [],
              comments: [],
              postId: uid,
              postUrl: url,
              userName: user.fullName,
              profileUrl: user.profileUrl,
              userId: user.userId,
              createdAt: database.getTimeStamp(),
            };

            database.posts
              .add(params)
              .then(async (post) => {
                await database.users.doc(user.userId).update({
                  postIds:
                    user.postIds !== null
                      ? [...user.postIds, post.id]
                      : [post.id],
                });
              })
              .then(() => {
                setLoading(false);
              })
              .catch((error) => {
                setError({ message: error.message });
                setTimeout(() => setError(null), 4000);
                setLoading(false);
                return;
              });
          });
        }
      );
    } catch (error) {
      setError({ message: error.message });
      setTimeout(() => setError(null), 4000);
      setLoading(false);
      return;
    }
  };

  const handleFile = (e) => {
    const { files } = e.target;
    const file = files[0];
    handleUpload(file);
  };

  return (
    <div>
      {error !== null && <Alert severity="error">{error.message}</Alert>}
      <div>
        <input
          type="file"
          accept="video/*"
          id="upload-input"
          className="video-upload-input"
          onChange={handleFile}
        />
        <label htmlFor="upload-input">
          <Button
            variant="outlined"
            color="error"
            disabled={loading}
            component="span"
          >
            <MovieRounded />
            &nbsp;Upload Video
          </Button>
        </label>
        {loading && (
          <LinearProgress color="error" style={{ marginTop: "-3%" }} />
        )}
      </div>
    </div>
  );
}
