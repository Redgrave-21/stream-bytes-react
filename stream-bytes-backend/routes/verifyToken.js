const jwt = require('jsonwebtoken')


// verifyToken
// const verifyToken = function(token){return  jwt.verify(token, "69420")}

const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization.split().toString();
    // const tokenValue = token[1]
    // console.log(token)
    try {
        var decodedToken = jwt.verify(token, "69420")
        // console.log(decodedToken)
        res.locals.decodedToken = decodedToken;
        next()
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// const verifyToken =  function (token) {
//     console.log("Token recieved to decode is ", token);
//     jwt.verify(token, "69420", function (err, decodedToken) {
//         if (err) {
//             console.log("error occured when trying to docede token", err);
//             return err;
//         }
//         if (decodedToken) {
//             console.log("decoded token is ", decodedToken);
//             return decodedToken;
//         }33.00
// }

module.exports = verifyToken;