import { WebApp } from "meteor/webapp";
import express from "express";
import { SqlManager } from "../lib/mysql";

export const app = express();

const jsend = (req, res, next) => {
  res["jsend"] = {};

  res.jsend["success"] = (data) => {
    if (typeof data === "undefined") data = null;
    if (typeof data !== "object")
      throw new Error("JSend Middleware: Data muss Object sein.");

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify({ status: "success", data }, null, 2));
  };

  res.jsend["fail"] = (data, statusCode = 400) => {
    if (typeof data === "undefined") data = null;
    if (typeof data !== "object")
      throw new Error("JSend Middleware: Data muss Object sein.");

    res.setHeader("Content-Type", "application/json");
    res.statusCode = statusCode;
    res.end(JSON.stringify({ status: "fail", data }, null, 2));
  };

  res.jsend["error"] = (message, statusCode = 500) => {
    if (typeof message !== "string")
      throw new Error(
        "JSend Middleware: MiddlewareFehlermeldung muss String sein."
      );
    res.setHeader("Content-Type", "application/json");
    res.statusCode = statusCode;
    res.end(
      JSON.stringify({ status: "error", message, code: statusCode }, null, 2)
    );
  };

  next();
};

app.use(jsend);

app.get("/api/v1/ip", (request, response) =>
  response.jsend.success({ ip: request.ip })
);

app.get("/api/v1/links", async (request, response) => {
  try {
    await SqlManager.connect();
    const [rows, fields] = await SqlManager.query("SELECT * FROM Links;");
    response.jsend.success(rows);
  } catch (e) {
    response.jsend.fail({ data: e.message });
  } finally {
    await SqlManager.disconnect();
  }
});

WebApp.connectHandlers.use(Meteor.bindEnvironment(app));
