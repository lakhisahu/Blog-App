import { useState } from "react"
import "./register.css"
import axios from "axios"

export default function Register() {
  const [email,setEmail]=useState('')
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError] = useState(false)
  async function submitData(){
    try {
      setError(false)
    console.log("click");
    var result = await axios.post("http://localhost:8000/register",{
      username:username,
      email:email,
      password:password
    })
    console.log(result);
    window.location.replace("/login")
    } catch (error) {
      setError(true)
    }
  }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <div className="registerForm">
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={e=>setUsername(e.target.value)}/>
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." onChange={e=>setEmail(e.target.value)}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={e=>setPassword(e.target.value)}/>
        <button className="registerButton" type="button" onClick={submitData}>Register</button>
        {
          error && (<span style={{color:"red"}}>somthing went wrong</span>)
        }
      </div>
        <button className="registerLoginButton" type="button">Login</button>
    </div>
    )
}
