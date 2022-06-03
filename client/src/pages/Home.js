import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data);
        })
    }, []);

    const likeApost = (postId) => {
        axios.post("http://localhost:3001/likes", 
        { PostId: postId},
        { headers: {accessToken: localStorage.getItem("accessToken")} }
        ).then((response) => {
                alert(response.data)
        })
    }

    return (
        <div>
            <h1 className='header'> Posts </h1>
            {listOfPosts.map((value, key) => {
            return (
            <div>
                <div className="post">
                    <div className="title"> {value.title} </div>
                    <div className="body" onClick={() => {navigate(`/post/byId/${value.id}`)}}>{value.postText}</div>
                    <div className="footer">
                        {value.username} 
                        <button onClick={() => {
                            likeApost(value.id);}}> Like </button>
                    </div>
                </div>
            </div>
            );
            })}
        </div> 
    )
}

export default Home;