import { Request, Response } from "express";

export function indexHome(req: Request, res: Response) {
  return res.json("Welcome to my API Home");
}
