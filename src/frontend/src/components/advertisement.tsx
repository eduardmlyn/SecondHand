import {Link, useParams} from "react-router-dom";
import React, {FormEvent, useState} from "react";
import useSWR from "swr";
import fetcher from "../fetcher";
import axios, {AxiosError} from "axios";

interface FormElements extends HTMLFormControlsCollection {
  text: HTMLTextAreaElement,
  stars: HTMLInputElement
}

export const Advertisement = ({userId, setUserId, isAdmin}: {
  userId: string,
  setUserId: React.Dispatch<React.SetStateAction<string>>,
  isAdmin: boolean
}) => {
  const {id} = useParams()
  const databaseAPI = 'http://localhost:4000'
  const advertisement = userId.length === 0 ?
    useSWR(`${databaseAPI}/user/unregistered/advertisement/${id}`, fetcher) :
    useSWR(`${databaseAPI}/user/${userId}/advertisement/${id}`, fetcher)
  const [isReview, setIsReview] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isAxiosError, setIsAxiosError] = useState(false)
  const checkData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {text, stars} = event.currentTarget.elements as FormElements
    if (text.value.length === 0 ||
      stars.value.length === 0 ||
      !/^\d*.\d*$/.test(stars.value)) {
      setIsInvalid(true)
      return
    }
    const convertedStars: number = +stars.value
    if (convertedStars > 5) {
      setIsInvalid(true)
    }
    try {
      await axios.post(`${databaseAPI}/user/${userId}/advertisement/${id}/review`, {
        text: text.value,
        stars: convertedStars
      })
      await advertisement.mutate()
      setIsReview(false)
      setIsInvalid(false)
      setIsAxiosError(false)
    } catch (e) {
      if (e instanceof AxiosError) {
        setIsAxiosError(true)
      }
    }
  }
  const handleDelete = async (id: string) => {
    await axios.delete(`${databaseAPI}/user/${userId}/advertisement/${id}`)
  }
  return (
    <div className="page">
      <nav className="navigation">
        <Link to={"/advertisement"}>
          <button type="button">Back</button>
        </Link>
        <Link to={"/"} className="title">
          <span className="page-title">
            Second Hand
          </span>
        </Link>
        {!isAdmin && userId.length !== 0 && <>
            <Link to={`/user/${userId}/advertisement`}>
                <button type="button">My advertisements</button>
            </Link>
            <Link to={`/user/${userId}/advertisement/starred`}>
                <button type="button">Starred advertisements</button>
            </Link>
            <Link to={`/user/${userId}/profile`}>
                <button type="button">Profile</button>
            </Link>
            <Link to={"/"}>
                <button type="button" onClick={() => {
                  setUserId("")
                }}>Log out
                </button>
            </Link>
        </>}
      </nav>
      {advertisement.data !== undefined && advertisement.data.data !== undefined &&
          <div className="advertisement-close-up">
              <div className="advertisement-info">
                  <div className="advertisement-info-name">
                      <span>{advertisement.data.data[0].name}</span>
                    {userId.length !== 0 && (userId === advertisement.data.data[0].userId || isAdmin) &&
                        <Link to={"/advertisement"}>
                            <button onClick={() => {
                              handleDelete(advertisement.data.data[0].id)
                            }}>Delete
                            </button>
                        </Link>}
                  </div>
                  <div className="advertisement-info-creation">
                      <div>
                          Created at:
                      </div>
                      <div>
                        {new Date(advertisement.data.data[0].createdAt).toDateString()}
                      </div>
                  </div>
                  <div className="advertisement-info-description">
                      <div>
                          Description:
                      </div>
                      <div className="advertisement-description">
                        {advertisement.data.data[0].description}
                      </div>
                  </div>
              </div>
              <div className="advertisement-reviews">
                  <div>
                      Reviews:
                  </div>
                {!isAdmin && advertisement.data.data[0].userId !== userId && userId.length !== 0 &&
                    <button type="button" onClick={() => {
                      setIsReview(!isReview)
                    }}>{isReview ? "Cancel" : "Add review"}
                    </button>}
              </div>

            {isReview &&
                <div className="advertisement-form">
                    <form onSubmit={(event) => {
                      checkData(event)
                    }} className="form">
                        <div>
                            <label>Review:</label>
                            <textarea name={"text"} rows={5}/>
                        </div>
                        <div>
                            <label>Stars:</label>
                            <input name={"stars"} onKeyPress={(event) => {
                              if (!/[\d.]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}/>
                        </div>
                      {isInvalid && <div>Invalid input</div>}
                      {isAxiosError && <div>An error occurred</div>}
                        <button type="submit">Add</button>
                    </form>
                </div>
            }
            {advertisement.data.data[0].reviews.length === 0 && <div>There are no reviews</div>}
            {advertisement.data.data[0].reviews.map((value:
                                                       {
                                                         id: string,
                                                         text: string,
                                                         stars: number,
                                                         deleted: boolean,
                                                         userId: string,
                                                         user: { username: string }
                                                       }) => {
              return <div className="review">
                <div className="review-name">
                  Made by {value.user.username}
                </div>
                <div className="review-stars">
                  Stars: {value.stars}
                </div>
                <div className="review-text">
                  {value.text}
                </div>
              </div>
            })}
          </div>
      }
    </div>
  )
}