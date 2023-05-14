import React from "react";
import cl from './PostList.module.css';
import Post from './Post';

const PostList = ({currUser, posts, refetchPosts}) => {
    return (
        <div className={cl.posts_block}>
            {posts.map((post) => {
                return <Post id={post.id} title={post.title} content={post.content} key={post.id} currUser={currUser} refetchPosts={refetchPosts}/>
            })
            }
        </div>
    )
}

export default PostList;