import "./feed.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Feed() {
    const {logout} = useContext(AuthContext);
  return (
    <>
    <h1>Feed</h1>
    <button onClick={logout}>Logout</button>
    </>
  )
}
