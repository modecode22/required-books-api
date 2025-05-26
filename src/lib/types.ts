import type { OpenAPIHono, RouteConfig , RouteHandler} from "@hono/zod-openapi";
import type { Context } from "hono";
import type { Environment } from "./env";

export type AppContext = Context<Environment>;
export type AppRouter = OpenAPIHono<Environment>;
export type AppRouteHandler<R extends RouteConfig> =  RouteHandler<R, Environment>;
export type AppOpenAPI = OpenAPIHono<Environment>;
