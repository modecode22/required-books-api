import { cors } from "hono/cors";
import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import booksRoutes from "./routes/books";

const app = createApp();

// Apply middleware
app.use("*", cors());

// Configure OpenAPI
configureOpenAPI(app);

// Register security schemes
app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
});

// Register routes
app.route("/api/books", booksRoutes);


// Health check route
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export default app;