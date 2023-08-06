import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postMovieUploadForm } from '../Request-helper/RequestHelper';

const MovieUploadForm = () => {
    const { videoID } = useParams()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        postMovieUploadForm(data)
    }

    return (
        <div className='container fluid text-center w-50'>
            <div className='card'>
                <div className='card-body'>
                    <h5>Upload Movie</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row mb-3'>
                            <label htmlFor='movieTitle' className='col-sm-2 col-form-label px-1'>Movie title</label>
                            <div className='col-sm-10'>
                                <input type='text' {...register('movieTitle')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='movieYear' className='col-sm-2 col-form-label px-1'>Release year</label>
                            <div className='col-sm-10'>
                                <input type='date' {...register('movieYear')} className='form-control px-2'></input>
                            </div>
                        </div>
                        
                        <div className='row mb-3'>
                            <label htmlFor='movieDescription' className='col-sm-2 col-form-label px-1'>Summary</label>
                            <div className='col-sm-10'>
                                <textarea {...register('movieDescription')} className='form-control px-2'></textarea>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='file' className='col-sm-2 col-form-label px-1'>Select movie </label>
                            <div className='col-sm-10'>
                                <input type='file' id='file'{...register('file')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col'>
                                <button type='submit'>Add to server</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default MovieUploadForm;