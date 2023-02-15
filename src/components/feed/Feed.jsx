import "./feed.css";
import { useContext, useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import Upload from "../upload/Upload";
export default function Feed() {
  //state management
  const [userInfo, setUserInfo] = useState(null);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const clearUser = database.users.doc(user.uid).onSnapshot((usr) => {
      setUserInfo(usr.data());
    });

    return () => clearUser();
  }, [user]);

  return (
    <div className="feed-container ">
      <div className="feed-card">
        <h1>Feed</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <Upload user={userInfo} />
    </div>
  );
}
