/** no need to modify */
const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');
// const cors = require('cors');

/**existing user login trying to authenticate using JWT and tokens*/
router.post("/user/login", async (req, res) => {
    try {
        console.log(req.body);
        const formData = req.body.formData;
        // console.log(formData);
        const password = formData.password1;
        console.log(formData.emailID, formData.password1);
        const existingUser = await userModel.findOne({ emailId: formData.emailID });
        if (existingUser) {
            const matched = await bcrypt.compare(password, existingUser.password);
            if (matched) {
                var token = jwt.sign({ UID: existingUser._id }, "someSecret", { expiresIn: "3h" });
                res.cookie('access_token', token);
                console.log(token);
                console.log("you are logged in");
                res.status(200).json("login successful")
            }
            else {
                res.status(401).json("invalid credentials");
            }
        }
    }
    catch (error) {
        console.log("error occured during login function", error);
    }
})
module.exports = router;
