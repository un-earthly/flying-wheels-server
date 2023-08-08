import ApiError from "../src/error/apiError";
import httpStatus from "http-status";
import { ITokenPayload } from "../src/interface/tokenPayload";
import { Secret, sign, verify } from "jsonwebtoken";
import { jwtConf } from "../src/config/config";


export const generateToken = (payload: ITokenPayload): string => {
    return sign(payload, jwtConf.secret, {
        expiresIn: '1h',
    });
};

export const generateRefreshToken = (payload: ITokenPayload): string => {
    const refreshToken = sign(payload, jwtConf.refreshTokenSecret, {
        expiresIn: '7d',
    });
    return refreshToken;
};

export const verifyToken = (token: string, secret: Secret): ITokenPayload | null => {
    try {
        const payload = verify(token, secret) as ITokenPayload;
        return payload;
    } catch (err) {
        console.log("Error verifying token:", err);
        throw new ApiError(httpStatus.BAD_REQUEST, "Error verifying token")
    }
};

