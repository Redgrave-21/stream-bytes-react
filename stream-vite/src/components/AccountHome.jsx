import useSWR from 'swr'
import { getUserData } from '../Request-helper/RequestHelper'
import UploadedVideos from './UploadedVideos'
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStore from './Context/AuthContext';
import { generateUserReport } from '../Request-helper/RequestHelper';

const AccountHome = () => {
    // const {videoID} = useParams()

    const loggedIn = useAuthStore((state) => [state.loggedIn])
    const Navigate = useNavigate()


    const gotoSettings = () => {
        console.log("data form gotoSettings function is ", data)
        // resume work from here
        Navigate('/account/settings', { state: { data } })
    }

    const generateReport = async() => {
        await generateUserReport()

    }

    const { data, error, isLoading } = useSWR(loggedIn ? 'http://localhost:4000/user/home' : null, getUserData);

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
            <div>
                {console.log(data)}
                <h3>Welcome {data.userName}</h3>
                <div>
                    <button onClick={gotoSettings}>Settings</button>
                </div>
                <div>
                    <button onClick={generateReport}>Genrate</button>
                </div>
                {console.log(data._id)}
                <UploadedVideos uploadedVideos={data.videos} />
            </div>
        )
    }
}

export default AccountHome