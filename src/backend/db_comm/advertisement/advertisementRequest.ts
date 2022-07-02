import {Request, Response} from "express";
import {
  getAdvertisementById,
  getAdvertisementsByUser,
  getAllAdvertisements,
  getUserAdvertisementById
} from "./getAdvertisement";
import {
  addAdvertisement,
  deleteAdvertisement,
  updateAdvertisement
} from "./advertisement";

export const listAdvertisements = async (req: Request, res: Response) => {
  const result = await getAllAdvertisements()
  return res.status(200).send({
    status: "success",
    data: result
  })
}

export const listAdvertisement = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const result = await getAdvertisementById(id)
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

export const listUserAdvertisements = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const result = await getAdvertisementsByUser(id)
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

export const listUserAdvertisementById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const result = await getUserAdvertisementById(id)
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

export const storeAdvertisement = async (req: Request, res: Response) => {
  try {
    const {name, description} = req.body
    const {id} = req.params
    console.log({name, description, id})
    const result = await addAdvertisement(name, id, description)
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

export const changeAdvertisement = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const {name, description} = req.body
    const result = await updateAdvertisement(id, name, description)
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

export const deleteAdvertisementById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const result = await deleteAdvertisement(id)
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