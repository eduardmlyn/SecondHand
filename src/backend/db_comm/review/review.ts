import prisma from "../client";

export const addReview = async (
  advertisementId: string,
  userId: string,
  text: string,
  stars: number
) => {
  return await prisma.review.create({
    data: {
      text,
      stars,
      advertisement: {
        connect: {
          id: advertisementId
        }
      },
      user: {
        connect: {
          id: userId
        }
      }
    }
  })
}

export const updateReview = async (
  userId: string,
  advertisementId: string,
  text: string,
  stars: number
) => {
  return await prisma.review.update({
    where: {
      userId_advertisementId: {
        userId,
        advertisementId
      }
    },
    data: {
      text,
      stars
    }
  })
}

export const deleteReview = async (id: string) => {
  return await prisma.review.update({
    where: {
      id: id
    },
    data: {
      deleted: true
    }
  })
}