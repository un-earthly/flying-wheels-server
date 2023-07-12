export const jwtConf = {
    secret: process.env.JWT_SECRET as string,
    duration: process.env.JWT_DURATION,
}
export const commonConf = {
    node_env: process.env.NODE_ENV as string,
    STRIPE__KEY: process.env.STRIPE__KEY as string,
}