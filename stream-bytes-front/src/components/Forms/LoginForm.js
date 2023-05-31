import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import formStyles from '../../styles/form.module.css';

import { postLoginForm } from '../../helpers/RequestHelper';

export default function LoginForm() {

    const [returnedResponseState, setReturnedResponseState] = useState({
        status: 0,
        text: ''
    })

    function submitLoginForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const actualFormData = Object.fromEntries(formData.entries());
        console.log(actualFormData);
        postLoginForm(actualFormData).then(
            (res) => {
                console.log(res);
                // find a way to store object in state
                // setReturnedResponseState(res);

                //keep the below line in case changes need to be made in handling login function response
                // setReturnedResponseState({ text: res.text });

                setReturnedResponseState({token:res});

                console.log(returnedResponseState);
                
                //store the recieved token in sessionStorage 
                sessionStorage.setItem('userToken', res);
            }
        )
    }

    return (
        <div className={formStyles.formDiv} id='loginform'>
            <form onSubmit={submitLoginForm}>
                <h5>Login</h5>
                <div>
                    {returnedResponseState ? returnedResponseState.text : null}
                </div>
                <div className={formStyles.formElement}>
                    <label htmlFor="emailID" className={formStyles.formElementLabel}>Email ID</label>
                    <input type='email' name="emailID" placeholder="something@example.com"></input>
                </div>
                <div className={formStyles.formElement}>
                    <label htmlFor="Password1" className={formStyles.formElementLabel}>Password</label>
                    <input type="password" name="password1" placeholder="*****"></input>
                </div>
                <Button type='submit'> Log in</Button>
            </form>
        </div>
    )
}