import {Request, Response} from "express";
import {addStarred, deleteStarred} from "./starred";
import {getUserStarredAdvertisements} from "./getStarred";


export const storeStarred = async (req: Request, res: Response) => {
  try {
    const { userId, id } = req.params
    const result = await addStarred(userId, id)
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

export const listStarred = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await getUserStarredAdvertisements(userId)
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

export const unStar = async (req: Request, res: Response) => {
  try {
    const { userId, advertisementId } = req.params
    const result = await deleteStarred(userId, advertisementId)
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