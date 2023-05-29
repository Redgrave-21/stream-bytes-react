const express = require('express');
const userRouter = express.Router();

const userModel = require('../models/userModel');



/**new user signup */
userRouter.post('/user/signup', async (req, res) => {
    try {
        console.log(req.body.formData);
        const formData = req.body.formData;
        console.log(formData);
        // let { emailId, userName, password1 } : {req.body.emailId, req.body.userName};
        const formEmailId = formData.emailID;
        const formUserName = formData.userName;
        const formPassword1 = formData.password1;
        console.log('data obtained from form is ', formEmailId, formUserName, formPassword1);
        const existingUser = await userModel.findOne({ emailId: formEmailId })
        if (existingUser) {
            console.log("output of findOne", existingUser)
            console.log(existingUser.userName)
            //res.send('user alrady exists')
            res.json({ status: 400, text: 'user already exists' })
        }
        else {
            await userModel.create({
                userName: formUserName,
                emailId: formEmailId,
                // password: bcrypt.hashSync(password, 3)
                password: formPassword1
            }),
                res.json({ status: 200, text: 'user created' });
            console.log('user created')
        }
    }
    catch (err) {
        console.log("Error occrured when saving the document", err);
        res.json({ status: 500, text: 'internal server error' });
    }
});

module.exports = userRouter;