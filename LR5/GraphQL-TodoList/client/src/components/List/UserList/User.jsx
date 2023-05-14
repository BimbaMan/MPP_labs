import React from "react";
import cl from './UserList.module.css';

const User = ({ id, name, age, setCurrUser, setForm, refetchPosts}) => {
    
    return (
        <div className={cl.user} onClick={() => {
            setCurrUser(id);
            setForm(false);
            refetchPosts();
        }}>
            <div>
                ID: {id}
            </div>
            <div>
                Name: {name}
            </div>
            <div>
                Age: {age}
            </div>
        </div>
    )
}

export default User;