import axios from 'axios';

axios.defaults.withCredentials = true;

const service = axios.create({
    baseURL: 'http://localhost:4000',
    responseType: 'json'
})
/**function to fetch all videos on index page  */
async function getIndexPageVideos() {
    return await service.get('/index', { withCredentials: true }).then(function (res) {
        console.log(res);
        return res.data;
    }).catch(function (err) {
        console.log(err);
        return err.response;
    })

}

/** fetch video data for player page */
async function getVideoDataForPlayerPage(videoId) {
    return await service.get(`/video/${videoId}/data`, { withCredentials: true }).then(function (response) {
        console.log(response);
        return response.data;
    }).catch(function (err) {
        console.log(err);
        return err.response;
    })
    // console.log(result);
    // return result.data;
}

/** fetch video comments */
async function getVideoComments(videoId) {
    return await service.get(`/video/${videoId}/comments`, { withCredentials: true }).then(function (response) {
        console.log(response);
        return response.data;
    }).catch(function (err) {
        console.log(err);
        return err.response;
    })
}

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
    return service.post('/user/signup', { withCredentials: true },
        { formData },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (err) {
            console.log(err)
            return err.response;
        })
}

/**Post login form */
async function postLoginForm(formData) {
    return await service.post('/user/login',
        { formData },
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

/**Post video uplaod */
async function postVideoUploadForm(formData) {
    console.log(formData);
    return await service.post('/user/upload',
        { 'title': formData.videoTitle, 'description': formData.videoDescriptionText, 'file': formData.videoInput },
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

/**Post update video form */
async function postUpdateVideoForm(videoID,formData) {
    console.log(formData);
    return await service.post(`/video/${videoID}/update`,
        { formData },
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


/**get user data */
async function getUserData() {
    // return await service.get(`user/${UID}/home`, { withCredentials: true }).then(function (res) {
    return await service.get('/user/home/', { withCredentials: true }).then(function (res) {
        console.log(res);
        return res.data;
    }).catch(function (err) {
        console.log(err);
        return err.response;
    })

}

export { getIndexPageVideos, getVideoDataForPlayerPage, getVideoComments, postNewCommentForm, postNewUserForm, postLoginForm, postVideoUploadForm, getUserData,
    postUpdateVideoForm };