import prisma from "../client";


export const getUserStarredAdvertisements = async (userId: string) =>  {
  try {
    return await prisma.starred.findMany({
      where: {
        userId
      },
      select: {
        advertisement: true
      }
    })
  } catch (e) {
    return e
  }
}