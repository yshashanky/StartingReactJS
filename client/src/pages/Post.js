import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

function Post() {

    let {id} = useParams(); 
    const [userPosts, setUserPosts] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setUserPosts(response.data);
        })

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        })
    }, []); 


  const addComment = () => {
      axios.post("http://localhost:3001/comments", {
          commentBody: newComment,
          postId: id,
        },
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
        )
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error.message)
          }else{
            const commentToAdd = { commentBody: newComment };
            setComments([...comments, commentToAdd]);
            setNewComment("");
          }
        });
    };

    return (
        <div className="postPage">
        <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {userPosts.title} </div>
          <div className="body">{userPosts.postText}</div>
          <div className="footer">{userPosts.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    )
}

export default Post;