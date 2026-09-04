import { verifyAcessToken } from "../utils/jwt.utils.js";

async function authenticate(req, res, next){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message: "Access Token is required"
            });
        };

        if(!authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Invalid Authorization token format"
            });
        }

        const accessToken = authHeader.split(" ")[1];

        const decoded = verifyAcessToken(accessToken);


        req.user = decoded;

        next();
    }catch(err){
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({message: "Token Expired"});
        }
        if(err.name === "JsonWebTokenError"){
            return res.status(401).json({message: "Invalid signature or malformed token"});
        }
    }
}

export {
    authenticate
}