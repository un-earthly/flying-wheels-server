import { RequestHandler, Router } from "express";
import OrderRoutes from "./order.routes";
import PaymentRoutes from "./payment.route";
import ProductRoutes from "./product.route";
import AuthRoutes from "./auth.route";
import ReviewRoutes from "./review.route";
import UserRoutes from "./user.route";

const router = Router()

type route = {
    path: string,
    route: RequestHandler
}

const routes: route[] = [
    {
        path: "/order",
        route: OrderRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/payment",
        route: PaymentRoutes
    },
    {
        path: "/product",
        route: ProductRoutes
    },
    {
        path: "/review",
        route: ReviewRoutes
    },
    {
        path: "/user",
        route: UserRoutes
    }
];

routes.forEach(r => router.use(r.path, r.route));



export default router