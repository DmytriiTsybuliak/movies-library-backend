import { loginService, registerService } from "../services/authService.js";


export const registerController = async (req, res) => {
    try {
        const { user, token } = await registerService(req.body);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                },
            },
        });
    } catch (error) {
        const status = error.status || 400;
        res.status(status).json({
            status: 'Fail',
            message: error.message,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const session = await loginService(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                accessToken: session.accessToken,

            },
        });
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: error.message,
        });
    }
};