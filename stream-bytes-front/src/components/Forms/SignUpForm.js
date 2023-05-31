import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import formStyles from '../../styles/form.module.css';

import { postNewUserForm } from '../../helpers/RequestHelper';


//add error handling to this function
export default function SignUpForm() {
    //state for form response
    const [returnedResponseState, setReturnedResponseState] = useState({
        status: 0,
        text: ''
    });

    function postSignUpForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const actualFormData = Object.fromEntries(formData.entries());
        postNewUserForm(actualFormData).then(
            (res) => {
                console.log(res);
                // find a way to store object in state
                // setReturnedResponseState(res);
                setReturnedResponseState({ text: res.text });
                console.log(returnedResponseState);
            }
        )
    }

    return (
        <div className={formStyles.formDiv} id='signUpForm'>
            <form onSubmit={postSignUpForm}>
                <h5>Sign Up</h5>
                <div>
                    {returnedResponseState ? returnedResponseState.text : null}
                </div>
                <div className={formStyles.formElement}>
                    <label htmlFor="emailID" className={formStyles.formElementLabel}>Email ID</label>
                    <input type='email' name="emailID" placeholder="something@example.com"></input>
                </div>
                <div className={formStyles.formElement}>
                    <label htmlFor='userName' className={formStyles.formElementLabel}>Username</label>
                    <input type='text' name='userName' placeholder='username'></input>
                </div>
                <div className={formStyles.formElement}>
                    <label htmlFor="Password1" className={formStyles.formElementLabel}>Password</label>
                    <input type="password" name="password1" placeholder="*****" className={formStyles.formElementInput}></input>
                </div>
                <div className={formStyles.formElement}>
                    <label htmlFor="Password2" className={formStyles.formElementLabel}>Confirm Password</label>
                    <input type="password" name="password2" placeholder="*****" className={formStyles.formElementInput}></input>
                </div>
                <Button type='submit'> Sign Up</Button>
            </form>
        </div>
    )
}