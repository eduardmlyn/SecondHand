import {Request, Response} from "express";
import {addReview, updateReview} from "./review";


export const storeReview = async (req: Request, res: Response) => {
  try {
    const { text, stars } = req.body
    const { userId, id } = req.params
    const result = await addReview(id, userId, text, stars)
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

export const updateUserReview = async (req: Request, res: Response) => {
  try {
    const { userId, advertisementId } = req.params
    const { text, stars } = req.body
    const result = await updateReview(userId, advertisementId, text, stars)
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