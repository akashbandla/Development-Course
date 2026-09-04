import AuthService from "../services/auth.service.js";

const authService = new AuthService();

async function registerUser(req, res){
    try{
        const {name, userId, email, role, experience, password } = req.body;
        if(!name || !email || !password){
            throw new Error("Name, email and password are required to register a user..")
        }

        const newUser = {
            name,
            userId,
            email,
            role,
            experience,
            password
        }

        const registeredUser = await authService.registerUser(newUser);

        res.status(201).json({
            message: "User Registered Successfully",
            user: registeredUser
        })
    }catch(err){
        res.json(err.message);
    }
}


async function login(req, res){
    try{
        const {email, password } = req.body;
        if(!email || !password){
            throw new Error("Email and password are required to Login a user..")
        }

        const result = await authService.login(email, password);

        res.cookie("refreshToken",
                   result.refreshToken,
                    {
                        httpOnly: true,
                        secure : process.env.NODE_ENV === "PRODUCTION",
                        sameSite: "lax",
                        path: '/api/auth'
                    }
        );

        res.status(200).json({
            message: "User Login Successfully",
            user: result.user,
            accessToken: result.accessToken
        })
    }catch(err){
        res.json(err.message);
    }
}

async function refreshAccessToken(req, res){
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            res.status(401).json({message:"Refresh Token is required.."})
        }

        const accessToken = await authService.refreshAccessToken(refreshToken);
        res.json({
            message: 'Succssefully Refreshed the Acess Token',
            accessToken
        })
    }catch(err){
        res.status(500).json({message:err.message});
    }
}


export {
    registerUser,
    login,
    refreshAccessToken
}