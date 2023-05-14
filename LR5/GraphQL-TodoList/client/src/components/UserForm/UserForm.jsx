import React, {useState} from "react";
import cl from './UserForm.module.css';

const UserForm = ({newUser, refetch}) => {
    const [formValue, setFormValue] = useState({username: '', age: 0});
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        newUser({
            variables: {
                input: {
                    username: formValue.username, age: +formValue.age
                }
            }
        }).then(({data}) => {
            console.log(data);
        })
        refetch();
    }

    return (
        <div className={cl.form_block}>
            <form onSubmit={handleFormSubmit}>
                <div className={cl.my_form}>
                    <div>
                        <input name="username" type='text' value={formValue.username} onChange={handleInput} placeholder="name"/>
                    </div>
                    <div>
                        <input name="age" type="number" min={1} max={100} value={formValue.age} onChange={handleInput} placeholder="age"/>
                    </div>
                    <div>
                        <button type='submit' className={cl.btn}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserForm;