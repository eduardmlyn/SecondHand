import React from "react"
import {Link} from "react-router-dom";

export const WelcomePage = ({userId}: {userId: string}) => {
  return (
    <div className="welcome-page">
      <div className="main-header">
        <span>Second Hand</span>
      </div>
      <div className="welcome-page-buttons">
        {userId.length === 0 &&
            <>
                <Link to={"/user"}>
                    <button type="button">Login</button>
                </Link>
                <Link to={"/user/form"}>
                    <button type="button">Register</button>
                </Link>
                <Link to={"/admin"}>
                    <button type="button">Admin Login</button>
                </Link>
            </>
        }
        <Link to={"/advertisement"}>
          <button type="button">Continue</button>
        </Link>
      </div>
    </div>
  )
}