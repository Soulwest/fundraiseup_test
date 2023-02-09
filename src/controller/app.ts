import * as express from "express";
import { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.sendFile("page.html", { root: __dirname + "/../view" });
});

export default router;
