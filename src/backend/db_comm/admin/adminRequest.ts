import {Request, Response} from "express";
import {showAdmin} from "./admin";

// implement adding, deleting

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const result = await showAdmin(username, password)
    return res.status(200).send({
      status: "success",
      data: result
    })
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "something went wrong"
    })
  }
}