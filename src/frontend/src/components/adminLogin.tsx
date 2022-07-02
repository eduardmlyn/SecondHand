import React, {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement,
  password: HTMLInputElement
}

export const AdminLogin = ({setUserId, setIsAdmin}: {
  setUserId: React.Dispatch<React.SetStateAction<string>>,
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const history = useNavigate();
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const checkLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const {username, password} = event.currentTarget.elements as FormElements;
    try {
      const result = await axios.post('http://localhost:4000/admin', {
        username: username.value,
        password: password.value
      })
      setUserId(result.data.data.id);
      setIsAdmin(true);
      history('/advertisement');
    } catch (e) {
      if (e instanceof AxiosError) {
        setIsWrongPassword(true)
        return;
      }
    }
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
      <div className="login-form">
        <form onSubmit={(event) => {
          checkLogin(event)
        }}>
          <div>
            <label>Username:</label>
            <input name={"username"}/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name={"password"}/>
          </div>
          {isWrongPassword &&
              <div className="error">
                  Wrong password
              </div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}