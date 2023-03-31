//
import app from "../app";
import http from "http";
import { Application } from "express";
import IBootstrap from "./bootstrap.interface";
export default class ServerBootstrap implements IBootstrap {
  constructor(private app: Application) {}
  initialize(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      server
        .listen(3000)
        .on("listening", () => {
          console.log(`SERVER IS LISTENING ON PORT 3000`);
          resolve("Server is ok");
        })
        .on("error", (err) => {
          console.log(`An error`);
          reject(err);
        });
    });
  }
}
