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
        <div className="postPage">
        <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {userPosts.title} </div>
          <div className="body">{userPosts.postText}</div>
          <div className="footer">{userPosts.username}</div>
        </div>
      </div>
      <div className="rightSide">Comment Section</div>
    </div>
    )
}

export default Post;