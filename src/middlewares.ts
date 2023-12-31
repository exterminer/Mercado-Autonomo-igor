import { NextFunction, Request, Response } from "express";
import market from "./databases";

const checkName = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { name } = req.body;
  const duplicateProduct = market.find((products) => {
    
    return products.name == name;
  });
  if (duplicateProduct) {
    return res.status(409).json({message :"Product already registered."});
  }
  next();
};

const checkID = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { id } = req.params;
  const product = market.find((products) => products.id.toString() === id);
  if (product) {
    next();
  } else {
    return res.status(404).json({ message: "Product not found." });
  }
};

export default { checkName, checkID };
