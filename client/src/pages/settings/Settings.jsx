import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../Context/Context";
import { useContext, useState } from "react";
import axios from "axios";

export default function Settings() {
  const [password,setPassword]=useState('')
  const [file,setFile]=useState('')
  const [username,setUsername]=useState('')
const [success,setSuccess]=useState(false)

  const folder = "http://localhost:8000/images/"
  const {user,dispatch} =useContext(Context)
  async function submitData () {
    const userUpdate = {
      password:password,
      email:user.email,
      username:username
      
    }
    if(file){
      const fd = new FormData()
      const filename= Date.now()+file.name
      fd.append("name",filename)
      fd.append("file",file)
      userUpdate.profilePic= filename
      try {
       await axios.post("http://localhost:8000/upload",fd)
      } catch (error) {
        console.log(error);
      }
    }
    try {
     const result = await axios.post("http://localhost:8000/user/edit",userUpdate)
     setSuccess(true)
     dispatch({type:"UPDATE_SUCCESS",payload:result.data})
    } catch (error) {
      console.log(error);
      setSuccess(false)
    }
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : folder+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={e=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={e=>setUsername(e.target.value)}/>
         
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={e=>setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="button" onClick={submitData}>
            Update
          </button>
          {
            success &&(<p style={{color:"green"}}>Profile updated successfully.....</p>)
          }
        </form>
      </div>
    
    </div>
  );
}
