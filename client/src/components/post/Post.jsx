import { Link } from "react-router-dom";
import "./post.css";

export default function Post({e}) {
  const folder = "http://localhost:8000/images/"
  return (
    <div className="post">
      {
        e.photo && (
          <img
          className="postImg"
          src={folder + e.photo}
          alt=""
        />
        )
      }
     
      <div className="postInfo">
        <span className="postTitle">
          <Link to={`/post/${e._id}`} className="link">
           {e.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(e.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
       {e.description}
      </p>
    </div>
  );
}
