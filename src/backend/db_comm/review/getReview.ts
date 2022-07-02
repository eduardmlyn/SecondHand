import prisma from "../client";


export const getReviewById = async (id: string) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id
      }
    })
    console.log(review)
    return review
  } catch (e) {
    console.log("error")
    return null
  }
}


export const getReviewByUserAdvertisement = async (userId: string, advertisementId: string) => {
  try {
    const review = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        reviews: {
          where: {
            advertisementId
          }
        }
      }
    })
    console.log(review)
    return review
  } catch (e) {
    console.log("error")
    return null
  }
}

// this may be not needed
export const getUserReviews = async (userId: string) => {
  try {
    const reviews = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        reviews: true
      }
    })
    console.log(reviews)
  } catch (e) {
    console.log("error")
    return null
  }
}


