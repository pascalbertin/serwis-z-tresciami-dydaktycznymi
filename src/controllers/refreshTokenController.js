const TeacherModel = require("../models/teacherModel");
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    console.log('COOKIE:', cookies);

    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundTeacher = await TeacherModel.findOne({ refreshToken }).exec();
    if (!foundTeacher) return res.sendStatus(403); //Forbidden 

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
            if (error || foundTeacher.userName !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundTeacher.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '20s' }
            );
            res.json({ roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }