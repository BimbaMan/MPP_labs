import React from "react";
import cl from './UserList.module.css';
import User from './User';

const UserList = ({users, setCurrUser, setForm, refetchPosts}) => {
    return (
        <div className={cl.users_block}>
            {users.map((user) => {
                return <User id={user.id} name={user.username} age={user.age} key={user.id} setCurrUser={setCurrUser}
                setForm={setForm} refetchPosts={refetchPosts}/>
            })
            }
        </div>
    )
}

export default UserList;