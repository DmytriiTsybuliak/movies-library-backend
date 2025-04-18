import { loginOrSignupWithGoogle, loginService, logoutService, refreshUsersSession, registerService, requestResetToken, resetPassword } from "../services/authService.js";
import { generateAuthUrl } from "../utils/googleOAuth2.js";

export const registerController = async (req, res) => {
    const { user, session } = await registerService(req.body);
    setupSession(res, session);
    res.status(201).json({
        status: 201,
        message: 'Successfully created user',
        data: {
            user: user,
            accessToken: session.accessToken,
        },
    });
};

export const loginController = async (req, res) => {
    const { session, favorites, user } = await loginService(req.body);
    setupSession(res, session);
    res.status(200).json({
        status: 200,
        message: 'Successfully logged in',
        data: {
            user: user,
            favorites: favorites,
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
        maxAge: new Date(session.refreshTokenValidUntil) - Date.now(),
        sameSite: 'none',
        path: '/',
        secure: true,
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        path: '/',
        secure: true,
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
        status: 200,
        message: 'Reset password email was successfully sent!',
    });
};

export const resetPassController = async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;

    await resetPassword(token, password);
    res.json({
        status: 200,
        message: 'Password was successfully reset!',
    });
};

export const getGoogleOAuthUrlController = async (req, res) => {
    const url = generateAuthUrl();
    res.json({
        status: 200,
        message: 'Successfully get Google OAuth url!',
        data: {
            url,
        },
    });
};

export const loginWithGoogleController = async (req, res) => {
    const { user, favorites, session } = await loginOrSignupWithGoogle(req.body.code);
    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully logged in via Google OAuth!',
        data: {
            user: user,
            favorites: favorites,
            accessToken: session.accessToken,
        },
    });
};