import prisma from "../client";

export const addUser = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const test = await prisma.user.create({
      data: {
        username,
        password,
        email
      }
    })
    console.log(test)
    return "success"
  } catch (e) {
    return "error"
  }
}


export const getUserByReview = async (reviewId: string) => {
  try {
    const user = await prisma.review.findUnique({
      where: {
        id: reviewId
      },
      select: {
        user: true
      }
    })
    if (user === null) {
      return "null?!!"
    }
    console.log(user.user)
    return user.user
  } catch (e) {
    return "err"
  }
}

export const getUserById = async (id :string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    console.log(user)
    return user
  } catch (e) {
    return "error"
  }
}

export const getUserByAdvertisement = async (id: string) => {
  try {
    const user = await prisma.advertisement.findUnique({
      where: {
        id
      },
      select: {
        user: true
      }
    })
    console.log(user)
    return user
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
    const test = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        username,
        password,
        email
      }
    })
    console.log(test)
    return "success"
  } catch (e) {
    return "error"
  }
}

export const deleteUser = async (id: string) => {
  try {
    const test = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        deleted: true
      }
    })
    console.log(test)
    return "success"
  } catch (e) {
    return "error"
  }
}