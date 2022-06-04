import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPost, setLikedPost] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/posts",
        { headers: {accessToken: localStorage.getItem("accessToken")} })
        .then((response) => {
            setListOfPosts(response.data.listOfPosts);
        })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/likes",
        { headers: {accessToken: localStorage.getItem("accessToken")} })
        .then((response) => {
            setLikedPost(response.data.map((like) => {return like.postId}));
        });
    }, []);

    const likeApost = (postId) => {
        axios.post("http://localhost:3001/likes", 
        { PostId: postId},
        { headers: {accessToken: localStorage.getItem("accessToken")} }
        ).then((response) => {
                setListOfPosts(listOfPosts.map((post) => {

                    axios.get("http://localhost:3001/likes",
                        { headers: {accessToken: localStorage.getItem("accessToken")} })
                        .then((response) => {
                        setLikedPost(response.data.map((like) => {return like.postId}));
                    });

                    if (post.id === postId){
                        if (response.data.liked) {
                            return {...post, likes: [...post.likes, 0]};
                        } else {
                            const likeArray = post.likes;
                            likeArray.pop();
                            return {...post, likes: likeArray}
                        }
                    }
                    else {
                        return post;
                    }
                }))
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
                        <div className='username'>{value.username} </div>
                        <div className='buttons'>
                        <FavoriteIcon onClick={() => {
                            likeApost(value.id);}} className={likedPost.includes(value.id) ? "likeBttn" : "unlikeBttn" } />
                        {value.likes.length !== 0 && <label> {value.likes.length} </label>}
                        </div>
                    </div>
                </div>
            </div>
            );
            })}
        </div> 
    )
}

export default Home;