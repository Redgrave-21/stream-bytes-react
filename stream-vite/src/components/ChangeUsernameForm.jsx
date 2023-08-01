import { useForm } from 'react-hook-form'
import { postChangeUserName } from '../Request-helper/RequestHelper';

const ChangeUsernameForm = ({userData}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const userID = userData.id
        console.log("userData recieved is", userID)
        postChangeUserName(userID, data)   
    }

    return (
        <>
            <div className='accordion'>
                <button className='accordion-button' data-bs-toggle="collapse" data-bs-target='#collapseUsername'>
                    Change username
                </button>
                <div id='collapseUsername' className='accordion-collapse collapse show'>
                    <div className='accordion-body'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='row mb-3'>
                                <label htmlFor='username' className='col-sm-2 col-form-label px-2'> change username</label>
                                <div className='col-sm-9'>
                                <input type='text' placeholder='new username' name='username' {...register('username')} className='form-control px-2'></input>
                                </div>
                            </div>
                            <button type='submit'> Change username</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeUsernameForm