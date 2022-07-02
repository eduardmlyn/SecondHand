import prisma from "../client";

export const addStarred = async (
  userId: string,
  advertisementId: string
) => {
  try {
    return await prisma.starred.create({
      data: {
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
  } catch (e) {
    return e
  }
}

export const deleteStarred  = async (userId: string, advertisementId: string) => {
  try {
    return await prisma.starred.delete({
      where: {
        userId_advertisementId: {
          userId,
          advertisementId
        }
      }
    })
  } catch (e) {
    return e
  }
}