import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Homepage() {
  const location = useLocation();
  console.log(location);
  const [posts,setPosts]= useState([])
  useEffect(()=>{
   async function fetchPost(){
      const result= await axios.get("http://localhost:8000/post")
      console.log(result);
      setPosts(result.data)
    }
    fetchPost()
    
  },[])

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
