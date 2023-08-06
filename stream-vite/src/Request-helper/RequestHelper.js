import axios from 'axios';
import { useContext } from 'react';
// import { AuthContext } from '../components/Context/AuthContext';

axios.defaults.withCredentials = true;
axios.defaults.headers.common = { 'Authorization': `${localStorage.getItem('access_token')}` }

const service = axios.create({
    baseURL: 'http://localhost:4000',
    responseType: 'json'
})
/**function to fetch all videos on index page  */
const getIndexPageVideos = async (...args) => service.get(...args, { withCredentials: true }).then(
    res => { return res.data }
).catch(err => {
    console.log("error occured when trying to fetch index videos", err)
    return err
})

/**function to fetch all movies on index page  */
const getMovies = async (...args) => service.get(...args, { withCredentials: true }).then(
    res => { return res.data }
).catch(err => {
    console.log("error occured when trying to fetch movies", err)
    return err
})

/** fetch video data for player page */
const getVideoDataForPlayerPage = async (...args) => service.get(...args).then(
    res => { return res.data }
).catch(err => {
    console.log("error occured when trying to fetch data for player page", err)
    return err
})

const getVideoToUpdate = async (...args) => service.get(...args).then(
    res => { return res.data }
).catch(err => {
    console.log("error occured when trying to get video to upload")
    return err
})

/** fetch video comments */
const getVideoComments = async (...args) => service.get(...args).then(
    res => {
        console.log(res.data.comments)
        return res.data
    }
).catch(err => {
    console.log("error occured when trying to fetch video comments", err)
    return err
})

/** Post new comment form*/
async function postNewCommentForm(videoId, formData) {
    return await service.post(`/video/${videoId}/comments`,
        { commentText: formData.commentText },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function (response) {
            console.log("response from post comment form request", response);
            console.log(response.status);
            return response;
        })
        .catch(function (err) {
            console.log(err);
            // console.log(error.response.status);
            // console.log(error.response.data)
            return err.response;
        })
}

/** Post Signup form */
async function postNewUserForm(formData) {
    return service.post('/user/signup',
        { formData },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).then(function (res) {
        console.log(res.data);
    })
        .catch(function (err) {
            console.log(err)
            return err.response;
        })
}

/**Post login form */
const postLoginForm = async (data) => {
    // const formData = new FormData()
    console.log(data)
    return await service.post('/user/login',
        { data },
        { headers: {} }).then(
            res => {
                console.log(res);

                return (res.data)
            }
        ).catch(err => {
            console.log(err)
            return (err)
        })
}

/**logout function */
const logout = () => {
    localStorage.removeItem('access_token')
    alert("you are logged out")

}

/**Post video uplaod */
async function postVideoUploadForm(data, onUploadProgress) {
    console.log(data);
    return await service.post('/user/upload',
        {
            videoTitle: data.videoTitle,
            videoDescription: data.videoDescription,
            file: data.file[0]
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data', 'Authorization': `${localStorage.getItem('access_token')}`,
                onUploadProgress,
            }
        },
    )
        .then(function (res) {
            console.log(res);
            return (res);
        })
        .catch(function (err) {
            console.log(err)
            return err.response;
        })
}

/**Post update video form */
async function postUpdateVideoForm(videoID, data) {
    console.log(videoID)
    console.log("formdata is ", data);
    return await service.post(`/video/${videoID}/update`,
        { data },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    )
        .then(function (res) {
            console.log(res);
            return (res);
        })
        .catch(function (err) {
            console.log(err)
            return err.response;
        })
}

/**post movie upload form */
async function postMovieUploadForm(data) {
    console.log(data);
    return await service.post('/user/upload-movie',
        {
            movieTitle: data.movieTitle,
            movieYear: data.movieYear,
            movieDescription: data.movieDescription,
            file: data.file[0]

        },
        { headers: { 'Content-Type': 'multipart/form-data' } },
    )
        .then(function (res) {
            console.log(res);
            return (res);
        })
        .catch(function (err) {
            console.log(err)
            return err.response;
        })
}



/**get user data */
const getUserData = async (...args) => service.get(...args).then(
    res => {
        console.log("response from get user data", res.data)
        return res.data
    }
).catch(err => {
    console.log("error occured when fetching user data")
    return err
})

// change profile pic
async function postUpdateProfilePic(userID, data) {
    console.log(userID)
    console.log("formdata is ", data);
    return await service.post(`/user/${userID}/update/profile/picture`,
        { data },
        { headers: { 'Content-Type': 'multipart/form-data' } },
    )
        .then(function (res) {
            console.log(res);
            return (res);
        })
        .catch(function (err) {
            console.log(err)
            return err.response;
        })
}

// change username form
const postChangeUserName = async (userID, data) => {
    console.log('recieved param are', userID, data)
    return await service.post(`/user/${userID}/update-username`,
        { data },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

const generateUserReport = async () => {
    return await service.post(`/user/report`,)
        .then(res => {
            console.log(res.data.report)
            return res
        })
        .catch(err => {
            return err
        })
}
export {
    getIndexPageVideos, getVideoDataForPlayerPage, getVideoComments, postNewCommentForm, postNewUserForm, postLoginForm, postVideoUploadForm, getUserData,
    postUpdateVideoForm, getVideoToUpdate, postUpdateProfilePic, postChangeUserName, generateUserReport, postMovieUploadForm, getMovies, logout
};