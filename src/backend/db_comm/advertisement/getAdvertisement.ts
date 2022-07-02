import prisma from "../client";

export const getAllAdvertisements = async () => {
  try {
    return await prisma.advertisement.findMany()
  } catch (e) {
    return e
  }
}
export const getAdvertisementById = async (id: string) => {
  try {
    return await prisma.advertisement.findUnique({
      where: {
        id
      }
    })
  } catch (e) {
    return e
  }
}

export const getAdvertisementsByUser = async (userId: string) => {
  return await prisma.advertisement.findMany({
    where: {
      userId: userId
    }
  })
}

export const getUserAdvertisementById = async (advId: string) => {
  try {
    return await prisma.advertisement.findMany({
      where: {
        id: advId
      },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        }
      }
    })
  } catch (e) {
    return e
  }
}

// most likely not needed
export const getAdvertisementByReview = async (reviewId: string) => {
  try {
    const advertisement = await prisma.review.findUnique({
      where: {
        id: reviewId
      },
      select: {
        advertisement: true
      }
    })
    console.log(advertisement)
    return advertisement
  } catch (e) {
    return e
  }
}
