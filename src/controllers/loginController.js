require('dotenv').config();

const TeacherModel  = require("../models/teacherModel");
const jwt           = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    if (    !req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({ 'message': 'Username, e-mail and password are required.' });
    }

    const foundTeacher = await TeacherModel.findOne({ userName: req.body.username }).exec();

    if (!foundTeacher) {
        return res.sendStatus(401); //Unauthorized 
    }

    if (req.body.password === foundTeacher.password) {
        const roles = Object.values(foundTeacher.roles).filter(Boolean);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundTeacher.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { "username": foundTeacher.userName },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        foundTeacher.refreshToken = refreshToken;
        const result = await foundTeacher.save();
        console.log('[loginController.js]: ' + result);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        res.json({ roles, accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };