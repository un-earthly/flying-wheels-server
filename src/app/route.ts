import { AuthRoutes } from "./modules/auth/auth.route";
import { UserRoutes } from "./modules/user/user.route"; 
import { WishlistRoutes } from "./modules/wishlist/wishlist.route";
const router = require("express").Router();
const routes = [
    {
        path: "/auth",
        children: AuthRoutes,
    },
    {
        path: "/wishlist",
        children: WishlistRoutes,
    },
    {
        path: "/users",
        children: UserRoutes,
    },
]


routes.forEach(route => router.use(route.path, route.children));