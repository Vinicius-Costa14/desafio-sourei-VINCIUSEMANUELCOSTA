import { Request, Response } from "express";

export class ProductController {

    static async list(req: Request, res: Response) {
        res.json({ message: "Rota /products funcionando!" });
      }

}