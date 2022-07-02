import React, {FormEvent, useState} from "react"
import {Link} from "react-router-dom";
import useSWR from "swr";
import fetcher from "../fetcher";
import axios, {AxiosError} from "axios";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement,
  email: HTMLInputElement,
  password: HTMLInputElement
}

export const Profile = ({userId, setUserId}: {
  userId: string,
  setUserId: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [edit, setEdit] = useState(false);
  const [invalid, setInvalid] = useState(false)
  const [axError, setAxError] = useState(false)
  const {data, error, mutate} = useSWR(`http://localhost:4000/user/${userId}`, fetcher)
  const checkData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {username, email, password} = event.currentTarget.elements as FormElements
    if (username.value.length === 0 ||
      password.value.length === 0 ||
      password.value.includes(' ') ||
      email.value.length < 5 ||
      !email.value.includes('@') ||
      !email.value.includes('.')) {
      setInvalid(true)
      return
    }
    try {
      await axios.put(`http://localhost:4000/user/${userId}`, {
        username: username.value,
        password: password.value,
        email: email.value
      })
      setEdit(false)
      await mutate()
    } catch (e) {
      if (e instanceof AxiosError) {
        setAxError(true)
      }
    }
  }
  const deleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:4000/user/${userId}`)
      setUserId("")
    } catch (e) {
      if (e instanceof AxiosError) {
        setAxError(true)
      }
    }
  }
  return (
    <>
      {userId.length !== 0 &&
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
                  <Link to={"/"}>
                      <button onClick={() => {
                        deleteAccount()
                      }}>
                          Delete profile
                      </button>
                  </Link>
                  <button onClick={() => {
                    setEdit(!edit)
                  }}>
                      Edit Profile
                  </button>
                  <Link to={"/"}>
                      <button type="button" onClick={() => {
                        setUserId("")
                      }}>Log out
                      </button>
                  </Link>
              </nav>
              <div className="data">
                {error || axError && <div>Something went wrong</div>}
                {data !== undefined && data.data !== undefined && (edit ?
                  <form onSubmit={(event) => {
                    checkData(event)
                  }}>
                    <div>
                      <label>Username:</label>
                      <input name={"username"} placeholder={data.data.username}/>
                    </div>
                    <div>
                      <label>Email:</label>
                      <input name={"email"} placeholder={data.data.email}/>
                    </div>
                    <div>
                      <label>Password:</label>
                      <input type={"password"} name={"password"}/>
                    </div>
                    {invalid && <div>Wrong input format</div>}
                    <button type={"submit"}>Submit</button>
                  </form> :
                  <div className="user-info">
                    <div className="user-info--name">
                      <div>Username:</div>
                      <div>
                        {data.data.username}
                      </div>
                    </div>
                    <div className="user-info--email">
                      <div>Email:</div>
                      <div>
                        {data.data.email}
                      </div>
                    </div>
                  </div>)}
              </div>
          </div>}
    </>
  )
}