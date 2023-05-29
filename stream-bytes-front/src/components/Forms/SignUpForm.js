import React from 'react';
import Button from'react-bootstrap/Button';
import formStyles from '../../styles/forms.module.css';

import { postNewUser } from '../../helpers/RequestHelper';

export default function SignUpForm() {

    function postSignUpForm(event){
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const actualFormData = Object.fromEntries(formData.entries());
        postNewUser(actualFormData);
        console.log(actualFormData);

    }

    return (
        <div className={formStyles.formDiv} id='signUpForm'>
            <form onSubmit={postSignUpForm}>
            <h5>Sign Up</h5>
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