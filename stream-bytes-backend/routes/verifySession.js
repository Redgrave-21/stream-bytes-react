// check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.UID) {
        next();
    }
    else {
        // next('/user/login')
        res.status(400).json("Please login to use this feature");
    };
}

module.exports = isAuthenticated;