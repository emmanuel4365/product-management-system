import { NextFunction, Request, Response } from "express";
import Product from "../model/product.model.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById({ _id: productId });
    if (!product) {
      throw new NotFoundError(`no job with id ${productId}`);
    }
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "No product with such id" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
      }
    );

    res.status(StatusCodes.OK).json({ job: updatedProduct });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "No product with such id" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const removedProduct = await Product.findByIdAndDelete({ _id: productId });

    res.status(StatusCodes.OK).json({ job: removedProduct });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "No product with such id" });
  }
};
