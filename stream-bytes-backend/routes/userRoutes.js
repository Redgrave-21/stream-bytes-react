const express = require('express');
const userRouter = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');



/**new user signup */
userRouter.post('/user/signup', async (req, res) => {
    try {
        console.log(req.body.formData);
        const formData = req.body.formData;
        console.log(formData);
        // let { emailId, userName, password1 } : {req.body.emailId, req.body.userName};
        const formEmailId = formData.emailID.toLowerCase();
        const formUserName = formData.userName;
        const formPassword1 = formData.password1;
        console.log('data obtained from form is ', formEmailId, formUserName, formPassword1);
        const existingUser = await userModel.findOne({ emailId: formEmailId })
        if (existingUser) {
            console.log("output of findOne", existingUser)
            console.log(existingUser.userName)
            res.status(200).json("user with that mail already exists");
        }
        else {
            await userModel.create({
                userName: formUserName,
                emailId: formEmailId,
                password: bcrypt.hashSync(password, 3)
                // password: formPassword1
            }).then((resolved, rejected) => {
                if (resolved) {
                    res.status(200).json("user Created success fully");
                    console.log('user created')
                }
                else if (rejected) {
                    res.status(500).json("Internal server error");
                }
            })

        }
    }
    catch (err) {
        console.log("Error occrured when saving the document", err);
        res.status(500).json("Internal server error");
        next(err);
    }
});

/**existing user login */
// userRouter.post("/user/login", async (req, res) => {
//     try {
//         const formData = req.body.formData;
//         console.log("form data from login function", formData);
//         console.log("emailID from login function", formData.emailID);
//         const email = formData.emailID.toLowerCase();
//         const password = formData.password1;
//         // test purpose only
//         // res.json({ status: 200, text: "endpoint works" });

//         let loginUser = await userModel.findOne({ emailId: email })
//         if (loginUser) {
//             console.log('found user data is', loginUser);
//             bcrypt.compare(password, loginUser.password, (err, same) => {
//                 if (err) {
//                     console.log(err)
//                 }
//                 else if (same) {
//                     // ssn = req.session
//                     // ssn.userId = loginUser._id;
//                     // req.session.userId = loginUser._id;
//                     // req.session.email = loginUser._id
//                     // req.uid = loginUser._id
//                     // req.session.userRole = loginUser.role
//                     // console.log('output of session before setting role:', req.session)
//                     // req.session.save((err) => {
//                     //     if(err){
//                     //         console.log("error occured when saving the session")
//                     //         res.sendStatus(500)
//                     //     }
//                     //     else{
//                     //         console.log("session saved and data is ", req.session.userId)
//                     //         // res.send(loginUser._id);
//                     //     }
//                     // })
//                     // if (loginUser.role === 'mentor') {
//                         // req.session.userRole = 'mentor'
//                         // res.json({ status: 200, text: 'user is logged in as mentor', userId: req.session.userId })
//                         // console.log('output of session data after setting the role', req.session)
//                     // }
//                     // else {
//                         // req.session.userId = loginUser._id;
//                         userId = loginUser._id;
//                         // console.log(req.session.userId)
//                         // console.log('user is logged in as regular')
//                         // res.redirect('/')
//                         // res.json({ status: 200, text: 'user is logged in as regular', userId: userId })
//                         // res.send()
//                         res.status(200).json({text:"you are logged in"})
//                     // }
//                 // }
//                 // else {
//                 //     res.json({ status: 400, text: 'either email or password is wrong' })
//                 //     console.log('wrong credentials')
//                 // }
//             // })
//         }
//     }
//     catch (err) {
//         console.log("Error occured during login", err);
//     }

// });

userRouter.post("/user/login", async (req, res) => {
    try {
        const formData = req.body.formData;
        const existingUser = await userModel.findOne({ emailId: formData.emailID });
        if (existingUser) {
            const token = jwt.sign({ uid: existingUser._id }, "69420");
            console.log("created and signed token is", token);
            const decodedToken = jwt.verify(token, '69420');
            console.log("decoded token is ", decodedToken);
            res.status(200).json(token);
        }
        else {
            throw new Error;
        }
    }
    catch (error) {
        console.log("error occured during login function", error);
    }
})

module.exports = userRouter;