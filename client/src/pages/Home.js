import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
                setListOfPosts(listOfPosts.map((post) => {
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
                            likeApost(value.id);}} className="likeButtn" />
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