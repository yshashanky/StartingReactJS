import React, { useContext } from 'react';
import { AuthContext } from "../helpers/AuthContext";

function ChangePassword() {

    const { authState } = useContext(AuthContext);

    return (
        <div className='changePassword'>
            <h1 className='header'> Change your Password </h1>
            <input type="password" placeholder='Old Password...' ></input>
            <input type="password" placeholder='New Password...' ></input>
            <button > Update Password </button>
        </div>
    )
};

export default ChangePassword;