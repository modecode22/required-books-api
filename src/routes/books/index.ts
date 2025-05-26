import { createRouter } from "@/lib/create-app";
import * as handlers from "./handlers";
import * as routes from "./routes";

const router = createRouter();

// Register book routes
router.openapi(routes.listBooks, handlers.listBooks);
router.openapi(routes.getBook, handlers.getBook);
router.openapi(routes.createBook, handlers.createBook);
router.openapi(routes.updateBook, handlers.updateBook);
router.openapi(routes.deleteBook, handlers.deleteBook);

export default router;