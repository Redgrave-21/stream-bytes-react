const jwt = require('jsonwebtoken')
// async function verifyToken(token) {
//     // console.log("token recieverd to verifytoken method", req.cookies.access_token);
//     jwt.verify(token, "69420", function (err, decodedToken) {
//         if (err) {
//             console.log("error occured when trying to docede token", err);
//         }
//         console.log(decodedToken);
//         return decodedToken;
//     })
// }

const verifyToken = async function (token) {
    console.log("Token recieved to decode is ", token);
    return jwt.verify(token, "69420", function (err, decodedToken) {
        if (err) {
            console.log("error occured when trying to docede token", err);
            return (err);
        }
        if (decodedToken) {
            console.log("decoded token is ", decodedToken);
            return decodedToken;
        }
    })
}

module.exports = verifyToken;