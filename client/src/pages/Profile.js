import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';

function Profile() {

    let { id } = useParams();
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPost, setLikedPost] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`)
        .then((response) => {
            setUsername(response.data.username);
        });

        axios.get(`http://localhost:3001/posts/byUserId/${id}`)
        .then((response) => {
            const responseData = [...response.data]
            responseData.reverse();
            setListOfPosts(responseData);
            console.log(responseData)
        });

    },[]);

    useEffect(() => {
        axios.get("http://localhost:3001/likes",
        { headers: {accessToken: localStorage.getItem("accessToken")} })
        .then((response) => {
            setLikedPost(response.data.map((like) => {return like.postId}));
            console.log(response.data.length)
            console.log(response.data.map((like) => {return like.postId}))
        })
        .catch(error => {
            console.log("user not logged in");
        })
    }, []);

    const likeApost = (postId) => {
        axios.post("http://localhost:3001/likes", 
        { PostId: postId},
        { headers: {accessToken: localStorage.getItem("accessToken")} }
        ).then((response) => {
            if (response.data.error){
                navigate('/login');
            } else {
                setListOfPosts(listOfPosts.map((post) => {

                    if (likedPost.includes(postId)) {
                        setLikedPost(likedPost.filter((id) => {
                            return id !== postId;
                        }));
                    }
                    else{
                        setLikedPost([...likedPost, postId]);
                    }

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
            }
        })
    }

    return (
        <div className='profilePageContainer'>
            <div className='header'>
                <h1> User: {username} </h1>
            </div>
            <div className='listOfPosts'>
                {listOfPosts.map((value, key) => {
                return (
                <div>
                    <div key={key} className="post">
                        <div className="title"> {value.title} </div>
                        <div className="body" onClick={() => {navigate(`/post/byId/${value.id}`)}}>{value.postText}</div>
                        <div className="footer">
                            <div className='username'>{value.username} </div>
                            <div className='buttons'>
                                <FavoriteIcon onClick={() => {
                                    likeApost(value.id);}} className={likedPost.includes(value.id) ? "likeBttn" : "unlikeBttn" } />
                            
                                {value.likes.length !== 0 ?
                                    <label> {value.likes.length} </label> :
                                        <label className="zero"> {value.likes.length} </label>}
                        </div>
                        </div>
                        
                    </div> 
                </div>
                );
            })}
            </div>
        </div>
    )
}

export default Profile;
