import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../../mutations/user";
import cl from './PostList.module.css';

const Post = ({id, title, content, currUser, refetchPosts}) => {

    const [delPost] = useMutation(DELETE_POST);

    const deleteButtonHandle = () => {
        delPost({
            variables: {
                input: {
                    userId: +currUser, postId: +id
                }
            }
        }).then(({data}) => {
            console.log(data);
        })
        refetchPosts();
    }

    return (
        <div className={cl.post}>
            <div>
                Id: {id} Title: {title} 
            </div>
            <div>
                Content: {content}
            </div>
            <div>
                <button className={cl.del_btn} onClick={() => deleteButtonHandle()}>Delete</button>
            </div>
        </div>
    )
}

export default Post;