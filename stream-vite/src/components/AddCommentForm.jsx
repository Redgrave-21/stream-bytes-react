import { useForm } from 'react-hook-form';

const AddCommentForm = ({ videoId }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data)

    console.log(videoId);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='hidden' value={videoId} {...register('videoId')}></input>
                <input placeholder='enter comment here' {...register('commentText')} />
                <button type='submit'>Submit comment</button>
            </form>
        </div>
    )
}

export default AddCommentForm;