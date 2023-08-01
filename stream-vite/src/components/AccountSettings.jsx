import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ChangePicForm from './ChangePicForm';
import ChangeUsernameForm from './ChangeUsernameForm'
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { state } = useLocation()
    const data = state.data
    console.log(data)
    const navigate = useNavigate()

    const gotoChangeProfile = (data) => {
        console.log(data)
        navigate(`/account/settings/change-profile-picture`)
    }

    return (
        <div className='container text-center w-50'>
            <div className='card'>
                <h5>Account settings</h5>
                <div>
                    <h5>
                        {data.userName}
                    </h5>
                </div>
                <div>
                    <ChangeUsernameForm userData={{id:data._id}}/>
                </div>
                <div>
                    {/* <button onClick={gotoChangeProfile}> Change profile picture</button> */}
                    {/* <ChangePicForm userData = {data}/> */}
                </div>
            </div>
        </div>
    )
}

export default AccountSettings