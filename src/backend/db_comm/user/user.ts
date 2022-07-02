import prisma from "../client";

export const addUser = async (
  username: string,
  password: string,
  email: string
) => {
  const test = await prisma.user.create({
    data: {
      username,
      password,
      email
    }
  })
  console.log(test)
  return test
}

export const updateUser = async (
  id: string,
  username: string,
  password: string,
  email: string
) => {
  return await prisma.user.update({
    where: {
      id: id
    },
    data: {
      username,
      password,
      email
    }
  })
}

export const deleteUser = async (id: string) => {
  const test = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      deleted: true,
      reviews: {
       deleteMany: {}
      }
    }
  })
  const res = await prisma.advertisement.updateMany({
    where: {
      userId: id
    },
    data: {
      deleted: true
    }
  })
  return {test, res}
}