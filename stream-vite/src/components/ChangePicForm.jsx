import { useForm } from 'react-hook-form'
import { postUpdateProfilePic } from '../Request-helper/RequestHelper';
import Cropper from 'react-easy-crop'
// import { AuthContext } from './Context/AuthContext';
import { useContext } from 'react';
import { useState, useCallback } from 'react';


const ChangePicForm = () => {
    // const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const userData = useContext(AuthContext)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])
    const [profilePic, setProfilePic] = useState()

    console.log(userData)

    const gotoCropper = (e) => {
        // read file
        console.log(e.target.files[0])
        // const profilePic = e.target.files[0]
        setProfilePic(e.target.files[[0]])
        console.log(profilePic)
    }

    const onSubmit = (data) => {
        console.log(data)
        // file to select from input
        console.log(data.profilePic[0])
        // const profilePic = data.profilePic[0]
        // postUpdateProfilePic(userID, profilePic)
    }


    return (
        <div>
            {/* <div className='accordion'>
                <button className='accordion-button' data-bs-toggle="collapse" data-bs-target='#collapseProfile'>
                    Change profile picture
                </button>
                <div id='collapseProfile' className='accordion-collapse collapse show'>
                    <div className='accordion-body'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='row mb-3'>
                                <label htmlFor='profilePic'> new profile picture</label>
                                <div className='row mb-3'>
                                    <input type='file' 
                                    id='profilePic' 
                                    name='profilePic' 
                                    {...register('profilePic')} 
                                    className='form-control px-2' 
                                    onChange={(e)=>gotoCropper(e)}>
                                    </input>
                                </div>
                            </div>
                            <button type='submit'>Upload new profile photo</button>
                        </form>
                    </div>
                </div>
            </div> */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row mb-3'>
                        <label htmlFor='profilePic'> new profile picture</label>
                        <div className='row mb-3'>
                            <input type='file'
                                id='profilePic'
                                name='profilePic'
                                {...register('profilePic')}
                                className='form-control px-2'
                                onChange={(e) => gotoCropper(e)}>
                            </input>
                        </div>
                    </div>
                    <button type='submit'>Upload new profile photo</button>
                </form>
                {profilePic ?
                    <>
                        <div className="crop-container">
                            {console.log(profilePic)}
                            <Cropper
                                image={profilePic}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className="controls">
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => {
                                    setZoom(e.target.value)
                                }}
                                className="zoom-range"
                            />
                        </div>
                    </>
                    : "upload image"}
            </div>
        </div>
    )
}

export default ChangePicForm