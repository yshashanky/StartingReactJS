import React, {useEffect, useState, useContext} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext";

function Post() {

    let {id} = useParams(); 
    const [userPosts, setUserPosts] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setUserPosts(response.data);
        })

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        })
    }, []); 


  const addComment = () => {
      axios
        .post(
          "http://localhost:3001/comments", 
          {
          commentBody: newComment,
          postId: id,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
          )
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error)
          } else{
            const commentToAdd = { commentBody: newComment, 
                                  username: response.data.username };
            setComments([...comments, commentToAdd]);
            setNewComment("");
          }
        });
    };

    const deleteComment = (id) => {
      axios.delete(`http://localhost:3001/comments/delete/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }).then(()=>{
        setComments(comments.filter((val) => {
          return val.id != id;
        }))
      })
    }

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
            required/>
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.id}
                <label> @{comment.username} </label>
                { authState.username === comment.username && (
                  <button onClick={() => deleteComment(comment.id)}> X </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    )
}

export default Post;