import { RegisterRoutes } from "../build/routes";
import express, { json, urlencoded, Response, Request, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";

export const app = express();

app.use(
  urlencoded({
    extended: true,
  })
);

app.use(json());

app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

RegisterRoutes(app);

app.use(function errorHandler(err: ValidateError, req: Request, res: Response, _next: NextFunction): Response | void {
  if (err instanceof ValidateError) {
    return res.status(err.status).json({
      message: "Validation Error",
      error: err,
      path: req.path
    });
  }

  res.status(500).json({
    message: "Internal Server Error",
    error: err,
    path: req.path
  });
});
