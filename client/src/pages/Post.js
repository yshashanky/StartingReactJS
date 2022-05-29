import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

function Post() {

    let {id} = useParams(); 
    const [userPosts, setUserPosts] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setUserPosts(response.data);
        })
    }, []);

    return (
        <div>
            {userPosts.postText}
        </div>
    )
}

export default Post;