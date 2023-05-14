import { useMutation } from "@apollo/client";
import React, {useState} from "react";
import { CREATE_POST } from "../../mutations/user";
import cl from './PostForm.module.css';

const PostForm = ({setForm, currUser, refetchPosts}) => {

    const [newPost] = useMutation(CREATE_POST);
    const [formValue, setFormValue] = useState({title: '', content: ''});
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        newPost({
            variables: {
                input: {
                    id:currUser, title: formValue.title, content: formValue.content
                }
            }
        }).then(({data}) => {
            console.log(data);
        })
        refetchPosts();
    }

    return (
        <div className={cl.form_block}>
            <form onSubmit={handleFormSubmit}> 
                <div className={cl.my_form}>
                    <div>
                        <input name="name" type='text' placeholder="username" disabled={true} value={currUser}/>
                        <input name="title" type='text' placeholder="title" value={formValue.title} onChange={handleInput}/>
                    </div>
                    <div>
                        <textarea name="content" cols="50" rows="5" placeholder="content" value={formValue.content} onChange={handleInput}></textarea>
                    </div>
                    <div>
                        <button type='submit' className={cl.btn}>Submit</button>
                        <button className={cl.btn} onClick={(e) => {
                            e.preventDefault();
                            setForm(true);
                        }}>UserForm</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostForm;