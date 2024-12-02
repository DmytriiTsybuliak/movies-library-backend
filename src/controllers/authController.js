import { ONE_DAY } from "../constants/index.js";
import { loginService, logoutService, refreshUsersSession, registerService, requestResetToken, resetPassword } from "../services/authService.js";

export const registerController = async (req, res) => {
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
};

export const loginController = async (req, res) => {
    const session = await loginService(req.body);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });

    res.status(200).json({
        status: 'success',
        data: {
            accessToken: session.accessToken,

        },
    });

};

export const logoutController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutService(req.cookies.sessionId);
    }
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.status(204).send();
};

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
};

export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
        message: 'Reset password email was successfully sent!',
        status: 200,
        data: {},
    });
};

export const resetPassController = async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;

    await resetPassword(token, password);
    res.json({
        message: 'Password was successfully reset!',
        status: 200,
        data: {},
    });
};