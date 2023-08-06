import { useForm } from 'react-hook-form';
import { postNewUserForm } from '../Request-helper/RequestHelper';
import { Link, NavLink } from "react-router-dom";


const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const onSubmit = data => {
        console.log(data)
        postNewUserForm(data)
    }

    return (
        <div className='container text-center w-50'>
            <div className='card'>
                <div className='card-body'>
                    <h5>Register</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row mb-3'>
                            <label htmlFor='emailId' className='col-sm-2 col-form-label px-1'> Email</label>
                            <div className='col-sm-9'>
                                <input type='text' placeholder='email' {...register('emailId')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='username' className='col-sm-2 col-form-label px-1'>Username</label>
                            <div className='col-sm-9'>
                                <input type='text' placeholder='username' {...register('username')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='password' className='col-form-label col-sm-2 px-1'>Password</label>
                            <div className='col-sm-9'>
                                <input type='password' placeholder='*****' {...register('password1')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='password2' className='col-form-label col-sm-2 px-1'>Confirm Password</label>
                            <div className='col-sm-9'>
                                <input type='password' placeholder='*****' {...register('password2')} className='form-control px-2'></input>
                            </div>
                            <div className='row mb-3'>
                                <div className='col'>
                                    <button type='submit'>Create account</button>
                                </div>
                            </div>
                            <div>
                                <NavLink to="/login">Login</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;