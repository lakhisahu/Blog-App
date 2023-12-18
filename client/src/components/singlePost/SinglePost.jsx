import { Link } from "react-router-dom";
import "./singlePost.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../Context/Context";

export default function SinglePost() {
  const folder = "http://localhost:8000/images/"
  const {user}= useContext(Context)
const url = useParams()
console.log(url);
const [post,setPost]= useState({})
const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [updateMode,setUpdateMode]=useState(false)
useEffect(()=>{
 async function getData(){
    var result = await axios.get("http://localhost:8000/post/get?id="+url.id)
    console.log(result);
    setPost(result.data)
    setTitle(result.data.title)
    setDescription(result.data.description)
  }
  getData()
},[url])
async function deleteBtn() {
  await axios.post("http://localhost:8000/post/delete",{
    id:url.id
  })
  window.location.replace("/")
}
async function submitData() {
  await axios.post("http://localhost:8000/post/edit",{
    id:url.id,
    title:title,
    description:description
  })
  window.location.reload()
}
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
      {
        post.photo && (
          <img
          className="singlePostImg"
          src={folder + post.photo}
          alt=""
        />
        )
      }
      {
        updateMode ? <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="singlePostTitleInput"/>:  <h1 className="singlePostTitle">
        {post.title}
        {
          post.email==user?.email && (
            <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={deleteBtn}></i>
          </div>
          )

        }
          
        </h1>
       }
      
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              {user.username}
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {
          updateMode ? <textarea value={description} onChange={e=>setDescription(e.target.value)} className="singlePostDescInput"/>:<p className="singlePostDesc">
          {post.description} 
        </p>
        }
        {
          updateMode && ( <button className="singlePostButton" onClick={submitData}>Update</button>)
        }
       
        
      </div>
    </div>
  );
}
