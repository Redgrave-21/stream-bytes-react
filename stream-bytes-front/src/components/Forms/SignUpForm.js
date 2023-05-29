import React from 'react';
import Button from'react-bootstrap/Button';
import formStyles from '../../styles/forms.module.css';

export default function SignUpForm() {

    return (
        <div className={formStyles.FormDiv} id='signUpForm'>
            <form>
            <h5>Sign Up</h5>
                <div className={formStyles.FormElement}>
                    <label htmlFor="emailID" className={formStyles.FormElementLabel}>Email ID</label>
                    <input type='email' name="emailID" placeholder="something@example.com"></input>
                </div>
                
                <div className={formStyles.FormElement}>
                    <label htmlFor="Password1" className={formStyles.FormElementLabel}>Password</label>
                    <input type="password" name="password1" placeholder="*****" className={formStyles.formElementInput}></input>
                </div>
                <div className={formStyles.FormElement}>
                    <label htmlFor="Password2" className={formStyles.FormElementLabel}>Confirm Password</label>
                    <input type="password" name="password2" placeholder="*****" className={formStyles.formElementInput}></input>
                </div>
                <Button> Sign Up</Button>
            </form>
        </div>
    )
}