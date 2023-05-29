import React from'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from'react-bootstrap/Button';
import formStyles from '../../styles/forms.module.css';

export default function LoginForm() {

    return (
        <div className={formStyles.FormDiv} id='loginForm'>
            <form>
            <h5>Login</h5>
                <div className={formStyles.FormElement}>
                    <label htmlFor="emailID" className={formStyles.FormElementLabel}>Email ID</label>
                    <input type='email' name="emailID" placeholder="something@example.com"></input>
                </div>
                <div className={formStyles.FormElement}>
                    <label htmlFor="Password1" className={formStyles.FormElementLabel}>Password</label>
                    <input type="password" name="password1" placeholder="*****"></input>
                </div>
                <Button> Login</Button>
            </form>
        </div>
    )
}