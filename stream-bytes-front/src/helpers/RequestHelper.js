import axios from 'axios';

/**function to fetch all videos on index page  */
async function getIndexPageVideos() {
    const result = await axios.get('http://localhost:4000/');
    console.log(result.data);
    return result.data;
}

/** fetch video data for player page */
async function getVideoDataForPlayerPage(videoId) {
    const result = await axios.get(`http://localhost:4000/video/${videoId}/data`);
    console.log(result);
    return result.data;
}

/** fetch video comments */
async function getVideoComments(videoId) {
    const result = await axios.get(`http://localhost:4000/video/${videoId}/comments`);
    console.log(result);
    return result.data;
}

/** Post new comment form*/
async function postNewCommentForm(videoId, formData) {
    await axios.post(`http://localhost:4000/video/${videoId}/comments`,
        { commentText: formData.commentText },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function (res) {
            console.log("response from post comment form request", res);
        })
        .catch(function (error) {
            console.log(error);
        })
}

/** Post Signup form */
async function postNewUserForm(formData) {
    return axios.post('http://localhost:4000/user/signup',
        { formData },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function (res) {
            console.log(res.data);
            return (res.data)
        })
        .catch(function (err) {
            console.log(err)
            return (err)
        })
}

/**Post login form */
async function postLoginForm(formData) {
    return axios.post('http://localhost:4000/user/login',
        { formData },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function (res) {
            console.log(res.data);
            return (res.data)
        })
        .catch(function (err) {
            console.log(err)
            return (err)
        })
}

export { getIndexPageVideos, getVideoDataForPlayerPage, getVideoComments, postNewCommentForm, postNewUserForm, postLoginForm };