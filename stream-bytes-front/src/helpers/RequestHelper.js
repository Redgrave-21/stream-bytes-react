import axios from 'axios';

/**function to fetch all videos on index page  */
async function getIndexPageVideos() {
    const result = await axios.get('http://localhost:4000/');
    console.log(result);
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
async function postNewComment(videoId, formData) {
    axios.post(`http://localhost:4000/video/${videoId}/comments`,
        { commentText: formData.commentText },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

/** Post Signup form */
async function postNewUser(formData) {
    axios.post('http://localhost:4000/user/signup',
        { formData },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

}

export { getIndexPageVideos, getVideoDataForPlayerPage, getVideoComments, postNewComment, postNewUser };