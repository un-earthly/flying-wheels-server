require('dotenv').config();

export const jwtConf = {
    secret: process.env.JWT_SECRET as string,
    duration: process.env.JWT_DURATION,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET as string
}
export const commonConf = {
    node_env: process.env.NODE_ENV as string,
    STRIPE__KEY: process.env.STRIPE__KEY as string,
    db_user: process.env.MONGO__ADMIN as string,
    db_pass: process.env.MONGO__PASS as string,
}