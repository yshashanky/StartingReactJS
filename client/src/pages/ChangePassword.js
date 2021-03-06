import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {

    const [ oldPassword, setOldPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");

    const changePasswords = () => {
        const data = { oldPassword: oldPassword, newPassword: newPassword };
        axios.put("http://localhost:3001/auth/changepassword", data,
        {
            headers: {accessToken: localStorage.getItem("accessToken")}
        })
        .then((response) => {
            if (response.data.error){
                alert(response.data.error);
            }else{
                alert("Password Updated!!")
            }
        });
    };

    return (
        <div className="changepassword">
          <h1 className='header'> Change your Password </h1>
          <label>Old Password:</label>
          <input
            type="text"
            onChange={(event) => {
              setOldPassword(event.target.value);
            }}
          />
          <label> New Password:</label>
          <input
            type="password"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
    
          <button onClick={changePasswords}> Change Password </button>
        </div>
    );
};

export default ChangePassword;