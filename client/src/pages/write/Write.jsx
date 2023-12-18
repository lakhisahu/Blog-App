import { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../Context/Context";
import axios from "axios";

export default function Write() {
  const [title,setTitle]= useState('')
  const [description,setDescription]= useState('')
  const [file,setFile]= useState(null)
  const {user}= useContext(Context)
  async function submitData () {
    const newPost = {
      title:title,
      description:description,
      username:user.username,
      email:user.email
    }
    if(file){
      const fd = new FormData()
      const filename= Date.now()+file.name
      fd.append("name",filename)
      fd.append("file",file)
      newPost.photo= filename
      try {
       await axios.post("http://localhost:8000/upload",fd)
      } catch (error) {
        console.log(error);
      }
    }
    try {
     const result = await axios.post("http://localhost:8000/post/create",newPost)
      window.location.replace("/")
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="write">
      {
        file && (
          <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />
        )
      }
      
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true} 
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=>setDescription(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="button" onClick={submitData}>
          Publish
        </button>
      </form>
    </div>
  );
}
