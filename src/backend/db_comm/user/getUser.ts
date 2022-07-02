import prisma from "../client";


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
      throw Error
    }
    console.log(user.user)
    return user.user
  } catch (e) {
    console.log("error")
    return null
  }
}

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id
    }
  })

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
    console.log("error")
    return null
  }
}

export const getUserByUsernamePassword = async (username: string, password: string) => {
  return await prisma.user.findUnique({
    where: {
      username_password: {
        username,
        password
      }
    }
  })
}

export const getUserByEmailPassword = async (email: string, password: string) => {
  return await prisma.user.findUnique({
    where: {
      email_password: {
        email,
        password
      }
    }
  })
}