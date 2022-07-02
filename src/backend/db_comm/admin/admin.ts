import prisma from "../client";

export const addAdmin = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    return await prisma.admin.create({
      data: {
        username,
        password,
        email
      }
    })
  } catch (e) {
    return e
  }
}

export const showAdmin = async (username: string, password: string) => {
  return await prisma.admin.findUnique({
    where: {
      username_password: {
        username,
        password
      }
    }
  })
}

export const updateAdmin = async (
  id: string,
  username: string,
  password: string,
  email: string
) => {
  try {
    return await prisma.admin.update({
      where: {
        id: id
      },
      data: {
        username,
        password,
        email
      }
    })
  } catch (e) {
    return e
  }
}

export const deleteAdmin  = async (id: string) => {
  try {
    return await prisma.admin.delete({
      where: {
        id: id
      }
    })
  } catch (e) {
    return e
  }
}