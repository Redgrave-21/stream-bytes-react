import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import formStyles from '../../styles/form.module.css';

import { postLoginForm } from '../../helpers/RequestHelper';
import { AuthContext } from '../../contexts/AuthContext';

export default function LoginForm() {
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);

    const [returnedResponseState, setReturnedResponseState] = useState({
        status: 0,
        text: ''
    })



    async function submitLoginForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const actualFormData = Object.fromEntries(formData.entries());
        console.log(actualFormData);
        console.log("Before updateIsAuthenticated:", isAuthenticated);
        await postLoginForm(actualFormData).then(
            (res) => {
                console.log(res);
                if (!res) {
                    console.log("Could not fetch");
                }
                else {

                    console.log("returned response is ", res.data);
                    setReturnedResponseState({ status: res.status, text: res.data.message }, () => {
                        console.log(returnedResponseState);
                    });

                    if (res.status === 200) {
                        setIsAuthenticated({isAuthenticated:true, UID:res.data.UID});
                    }
                }
            });

        console.log("after updateIsAuthenticated", isAuthenticated);
    }


    return (
        <div className={formStyles.formDiv} id='loginform'>
            {/* {console.log(isAuthenticated)} */}
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