import "./video.css";
import ReactDOM from "react-dom";

export default function Video({ srcUrl }) {
  const handlePlay = (e) => {
    e.preventDefault();
    const { muted } = e.target;
    e.target.muted = !muted;
  };

  const handleAutoScroll = (e) => {
    const next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if (next) {
      next.scrollIntoView();
      e.target.muted = true;
    }
  };

  return (
    <video
      src={srcUrl}
      muted="muted"
      onClick={handlePlay}
      onEnded={handleAutoScroll}
    ></video>
  );
}
