/** no need to modify */
const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');


// authentication using JWT 
/**existing user login trying to authenticate using JWT and tokens*/
router.post("/user/login", async (req, res) => {
    try {
        const formData = req.body.data;
        console.log(formData);
        formEmail = formData.emailId.toLowerCase();
        const password = formData.password1;
        const existingUser = await userModel.findOne({ emailId: formEmail });
        console.log(existingUser)
        if (existingUser) {
            console.log(existingUser.password)
            const matched = await bcrypt.compare(password, existingUser.password);
            if (matched) {
                var token = jwt.sign({ UID: existingUser._id }, "69420", { expiresIn: "3h" });
                // res.cookie('access_token', token);
                // localStorage.setItem('access_token',token);
                console.log(token);
                console.log("you are logged in");
                return res.status(200).json({ message: "you are logged in ", token: token, UID: existingUser._id })
            }
            else {
                return res.status(401).json("invalid credentials");
            }
        }
        if (existingUser.role === 'admin') {
            console.log(existingUser.password)
            const matched = await bcrypt.compare(password, existingUser.password);
            if (matched) {
                var token = jwt.sign({ UID: existingUser._id }, "69420", { expiresIn: "3h" });
                // res.cookie('access_token', token);
                // localStorage.setItem('access_token',token);
                console.log(token);
                console.log("you are logged in");
                return res.status(200).json({ message: "you are logged in ", token: token, UID: existingUser._id, role: existingUser.role })
            }
            else {
                return res.status(401).json("invalid credentials");
            }
        }
    }
    catch (error) {
        console.log("error occured during login function", error);
    }
})



// login and authentication using session
// router.post("/user/login", async (req, res) => {
//     try {
//         console.log(req.body);
//         const formData = req.body.formData;
//         console.log(formData);
//         const password = formData.password1;
//         console.log(formData.emailID, formData.password1);
//         const existingUser = await userModel.findOne({ emailId: formData.emailID });
//         if (existingUser) {
//             const matched = await bcrypt.compare(password, existingUser.password);
//             if (matched) {
//                 req.session.UID = existingUser._id;
//                 req.session.save(function (err) {
//                     if (err) {
//                         throw new Error;
//                     }
//                     else {
//                         // console.log(token);
//                         console.log("you are logged in");
//                         res.status(200).json({message:"you are logged in", UID:existingUser._id});
//                         res.end();
//                     }
//                 })
//             }
//             else {
//                 res.status(401).json("invalid credentials");
//             }
//         }
//     }
//     catch (error) {
//         console.log("error occured during login function", error);
//     }
// })

module.exports = router;
