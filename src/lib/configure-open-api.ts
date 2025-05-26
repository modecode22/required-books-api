import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json" with { type: "json" };

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Esnam API",
    },
  });

  app.get(
    "/reference",
    Scalar({
      theme: "deepSpace",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "node",
        clientKey: "fetch",
      },
      url: "/doc",
    }),
  );
}
