import React, {FormEvent, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement,
  description: HTMLTextAreaElement
}

export const AdvertisementForm = ({userId, setUserId} :{
  userId: string,
  setUserId: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [empty, setEmpty] = useState(false)
  const [error, setError] = useState(false)
  const history = useNavigate()
  const checkAd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {name, description} = event.currentTarget.elements as FormElements
    if (name.value.length === 0 || description.value.length === 0) {
      setEmpty(true)
      return
    }
    try {
      const result = await axios.post(`http://localhost:4000/user/${userId}/advertisement`, {
        name: name.value,
        description: description.value
      })
      history(`/user/${userId}/advertisement/${result.data.data.id}`)
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(true)
        return;
      }
    }
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
          <button type="button" onClick={() => {setUserId("")}}>Log out</button>
        </Link>
      </nav>
      <div className="advertisement-data">
        <form onSubmit={(event) => {
          checkAd(event)
        }}>
          <div>
            <label>Name:</label>
            <input name={"name"}/>
          </div>
          <div>
            <label>Description:</label>
            <textarea name={"description"} rows={5}/>
          </div>
          {empty && <div>Name and description cannot be empty</div>}
          {error && <div>An error occurred</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}