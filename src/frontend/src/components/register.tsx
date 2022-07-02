import React, {FormEvent, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement,
  password: HTMLInputElement
  email: HTMLInputElement
}

export const Register = ({setUserId}: { setUserId: React.Dispatch<React.SetStateAction<string>> }) => {
  const [error, setError] = useState(false);
  const [inUse, setInUse] = useState(false);
  const history = useNavigate();
  const checkRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const {username, password, email} = event.currentTarget.elements as FormElements
    if (username.value.length < 3 ||
      password.value.length < 5 ||
      password.value.includes(' ') ||
      email.value.length < 5 ||
      !email.value.includes('@') ||
      !email.value.includes('.')) {
      setError(true)
      return
    }
    try {
      const result = await axios.post('http://localhost:4000/user',
        {username: username.value, password: password.value, email: email.value})
      setUserId(result.data.data.id)
    } catch (e) {
      if (e instanceof AxiosError) {
        setInUse(true)
        return
      }
    }
    history('/advertisement')
  }
  return (
    <div className="page">
      <div className="navigation">
        <Link to={"/"}>
          <button type="button">Home</button>
        </Link>
        <Link to={"/"} className="title">
          <div className="page-title">
            Second Hand
          </div>
        </Link>
      </div>
      <div className="register-form">
        <form onSubmit={(event) => {
          checkRegister(event)
        }}>
          {inUse && <div className="note">Username or email already in use</div>}
          <div>
            <label>Username:</label>
            <input name={"username"}/>
          </div>
          <div>
            <label>Password:</label>
            <input type={"password"} name={"password"}/>
          </div>
          <div>
            <label>Email:</label>
            <input name={"email"}/>
          </div>
          {error && <div className="error">Invalid input/s</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

