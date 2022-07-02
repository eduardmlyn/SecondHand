import {Request, Response} from "express";
import {addUser, deleteUser, updateUser} from "./user";
import {getUserByEmailPassword, getUserById, getUserByUsernamePassword} from "./getUser";

export const storeUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body
    const result = await addUser(username, password, email)
    return res.status(200).send({
      status: "success",
      data: result,
    })
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "something went wrong"
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body
    let result
    if (username === undefined || username === null) {
      result = await getUserByEmailPassword(email, password)
    } else {
      result = await getUserByUsernamePassword(username, password)
    }
    if (result === null) {
      throw Error
    }
    return res.status(200).send({
      status: "success",
      data: result,
      message: "successfully logged in"
    })
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "something went wrong"
    })
  }
}

export const showUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const result = await getUserById(id)
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

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { username, password, email } = req.body
    const result = await updateUser(id, username, password, email)
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

export const deleteUserById = async (req:Request, res: Response) => {
  try {
    const {id} = req.params
    console.log(id)
    const result = await deleteUser(id)
    console.log(result)
    return res.status(200).send({
      status: "success",
      data: result
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      status: "error",
      data: {},
      message: "something wrong"
    })
  }
}

