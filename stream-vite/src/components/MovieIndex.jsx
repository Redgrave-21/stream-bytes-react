import useSWR from 'swr';
import { getMovies } from '../Request-helper/RequestHelper';
import VideoCard from './VideoCard';

// import '../styles/index.css'

const MovieIndex = () => {
    const { data, error, isLoading } = useSWR('http://localhost:4000/indexM', getMovies)
    if (error) {
        return <div>could not fetch data</div>
    }
    if (isLoading) return <div>Loading</div>

    if (data) {
        return (
            <div className='container-fluid'>
                <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-2 g-4 row-cols-1 row-cols-md-3 g-4">
                    {data.movies ? data.movies.map((movie) => (
                        <div key={data.movies._id} className='col-3 col-gap-3'>
                            <VideoCard video={movie} />
                        </div>
                    )) : "no movies found"}
                </div>
            </div>

        )
    }
}

export default MovieIndex