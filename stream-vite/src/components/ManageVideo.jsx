import useSWR from 'swr'
import { useForm } from 'react-hook-form'
import { getVideoToUpdate } from '../Request-helper/RequestHelper'
import { useParams } from 'react-router-dom'
import { postUpdateVideoForm } from '../Request-helper/RequestHelper'


const ManageVideo = () => {
    const { videoID } = useParams()
    const { data, error, isLoading } = useSWR(`http://localhost:4000/video/${videoID}/data`, getVideoToUpdate)
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log("video form data is ", data)
        postUpdateVideoForm(videoID, data)
    }


    if (error) {
        return (
            <div>
                Could not fetch data
            </div>
        )
    }
    if (isLoading) {
        return (
            <div>
                loading
            </div>
        )
    }
    if (data) {
        return (
            <div className='container-fluid  text-center w-50'>
                <div className='card'>
                    <h5>Update existing video</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row mb-3'>
                            <label htmlFor='videoTitle' className='col-sm-2 col-form-label px-1'>
                                new Video title
                            </label>
                            <div className='col-sm-10'>
                                <input type='text' {...register('videoTitle')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div>
                            <p>{data.videoData.title}</p>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='description' className='col-sm-2 col-form-label px-1'>
                                new video description
                            </label>
                            <div className='col-sm-10'>
                                <textarea {...register('description')} className='form-control px-2'></textarea>
                            </div>
                        </div>
                        <div>
                            <p>{data.videoData.description}</p>
                        </div>
                        <div className='row mb-3'>
                            <div>
                                <button type='submit'>Update video</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default ManageVideo;