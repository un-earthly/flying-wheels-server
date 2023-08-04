import { ITokenPayload } from "../../../../interface/tokenPayload";

declare global {
    namespace Express {
        interface Request {
            user?: ITokenPayload;
        }
    }
}