import { sign, verify, Secret } from "jsonwebtoken";
import { jwtConf } from "../config/config";
import { ITokenPayload } from "../interface/tokenPayload";

export const generateToken = (payload: ITokenPayload): string => {
    return sign(payload, jwtConf.secret, {
        expiresIn: jwtConf.duration,
    });
};

export const verifyToken = (token: string): ITokenPayload | null => {
    try {
        const payload = verify(token, jwtConf.secret) as ITokenPayload;
        return payload;
    } catch (err) {
        console.log("Error verifying token:", err);
        return null;
    }
};
