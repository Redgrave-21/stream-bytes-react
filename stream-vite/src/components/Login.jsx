import { useForm } from 'react-hook-form';
import { postLoginForm } from '../Request-helper/RequestHelper';
import useAuthStore from './Context/AuthContext';


const Login = () => {
    // const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [loggedIn, UID, setLoggedIn] = useAuthStore(
        (state) => [state.loggedIn, state.UID, state.setLoggedIn]
    )

    const onSubmit = (data) => {
        console.log(data);
        postLoginForm(data).then(
            res => (
                console.log(res),
                setLoggedIn(res.UID),
                console.log(loggedIn, UID),
                localStorage.setItem("access_token", res.token),
                alert(res.message)
            )
        )
    }


    return (
        <div className='container text-center w-50'>
            {console.log(loggedIn)}
            <div className='card'>
                <div className='card-body'>
                    <h5>Login</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row mb-3'>
                            <label htmlFor='emailId' className='col-sm-2 col-form-label px-2'> Email</label>
                            <div className='col-sm-9'>
                                <input type='text' placeholder='email' name='emailId' {...register('emailId')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='password1' className='col-form-label col-sm-2 px-2'>Password</label>
                            <div className='col-sm-9'>
                                <input type='password' placeholder='*****' name='password1'{...register('password1')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div className='row-mb-3'>
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login