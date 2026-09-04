import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;

function generateAcessToken(user){
    return jwt.sign(
        {
            sub: user._id,
            name: user.name,
            userId: user.userId,
            role: user.role,
            email: user.email,
            experience: user.experience
        }, 
        JWT_ACCESS_SECRET, 
        {
            expiresIn:JWT_ACCESS_EXPIRES_IN
        }
    )
};

function generateRefreshToken(user){
    return jwt.sign(
        {
            sub: user._id,
            name: user.name,
            userId: user.userId,
            role: user.role,
            email: user.email,
            experience: user.experience
        }, 
        JWT_REFRESH_SECRET, 
        {
            expiresIn:JWT_REFRESH_EXPIRES_IN
        }
    )
};


function verifyAcessToken(token){
    return jwt.verify(
        token,
        JWT_ACCESS_SECRET
    )
}

function verifyRefreshToken(token){
    return jwt.verify(
        token,
        JWT_REFRESH_SECRET
    )
}

export {
    generateAcessToken,
    generateRefreshToken,
    verifyAcessToken,
    verifyRefreshToken
}