import { useContext, useState } from "react";
import "./login.css";
import { Context } from "../../Context/Context";
import axios from "axios";
export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {dispatch} = useContext(Context)
  async function submitData(){
    dispatch({type:"LOGIN_START"})
    try {

      const result = await axios.post("http://localhost:8000/login",{
         email:email,
         password:password
       })
       console.log(result);
       dispatch({type:"LOGIN_SUCCESS",payload:result.data})
     } catch (error) {
       console.log(error);
       dispatch({type:"LOGIN_FAILURE"})
     }
  }
  
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." onChange={e=>setEmail(e.target.value)}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." onChange={e=>setPassword(e.target.value)}/>
        <button className="loginButton" type="button" onClick={submitData}>Login</button>
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
  );
}
