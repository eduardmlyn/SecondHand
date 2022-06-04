import prisma from "../client";

export const addUser = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    await prisma.user.create({
      data: {
        username,
        password,
        email
      }
    })
    return "success"
  } catch (e) {
    return "error"
  }
}

export const updateUser = async (
  id: string,
  username: string,
  password: string,
  email: string
) => {
  try {
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        username,
        password,
        email
      }
    })
    return "success"
  } catch (e) {
    return "error"
  }
}

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        deleted: true
      }
    })
    return "success"
  } catch (e) {
    return "error"
  }
}