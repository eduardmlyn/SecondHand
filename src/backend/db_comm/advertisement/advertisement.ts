import prisma from "../client";

export const addAdvertisement = async (
  name: string,
  userId: string,
  description: string
) => {
  return await prisma.advertisement.create({
    data: {
      name,
      description,
      user: {
        connect: {
          id: userId
        }
      }
    }
  })
}

export const updateAdvertisement = async (
  id: string,
  name: string,
  description: string
) => {
  return await prisma.advertisement.update({
    where: {
      id: id
    },
    data: {
      name,
      description,
      editedAt: new Date()
    }
  })
}


export const deleteAdvertisement = async (id: string) => {
  return await prisma.advertisement.update({
    where: {
      id: id
    },
    data: {
      deleted: true,
      Starred: {
        deleteMany: {}
      },
      reviews: {
        deleteMany: {}
      }
    }
  })
}