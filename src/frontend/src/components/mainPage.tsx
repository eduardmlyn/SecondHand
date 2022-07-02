import React from "react";
import {Link} from "react-router-dom";
import useSWR from "swr";
import fetcher from "../fetcher";
import axios from "axios";

export const Advertisements = ({userId, setUserId, isAdmin}:
                                 {
                                   userId: string,
                                   setUserId: React.Dispatch<React.SetStateAction<string>>,
                                   isAdmin: boolean
                                 }) => {
  const databaseAPI = 'http://localhost:4000';
  const {data, error} = useSWR(`${databaseAPI}/advertisement`, fetcher);
  const handleStar = async (userId: string, id: string) => {
    await axios.post(`${databaseAPI}/user/${userId}/advertisement/${id}/star`);
  }
  return (
    <div className="page">
      {userId.length !== 0 &&
          <nav className="navigation">
              <Link to={"/"} className="title">
                    <span className="page-title">
                      Second Hand
                    </span>
              </Link>
            {!isAdmin &&
                <>
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
      }
      {userId.length === 0 &&
          <nav className="navigation">
              <Link to={"/"}>
                  <button type="button">Home</button>
              </Link>
              <span className="page-title">
                  Second Hand
                </span>
              <Link to={'/user'}>
                  <button type="button">Login</button>
              </Link>
          </nav>}
      {userId.length !== 0 && !isAdmin &&
          <Link to={`/user/${userId}/advertisement/form`}
                className="add-advertisement">
              <button>Create advertisement</button>
          </Link>}
      <div className="advertisements">
        {data !== undefined &&
          data.data !== undefined &&
          data.data.map((value: {
            id: string,
            name: string,
            description: string,
            createdAt: Date,
            editedAt: Date,
            deleted: boolean,
            userId: string
          }, index: number) => {
            if (value.deleted || value.userId === userId) {
              return;
            }
            return <>
              {!isAdmin &&
                  <div className="clickable" onClick={() => {
                    handleStar(userId, value.id)
                  }}>
                      Add to my starred
                  </div>
              }
              <div className="advertisement">
                <Link to={`/user/${userId}/advertisement/${value.id}`}
                      className="link">
                  <div key={index} className="advertisement-data">
                    <div key={"name" + index}
                         className="advertisement-data__name">
                      <div>
                        {value.name}
                      </div>

                    </div>
                    <div key={"description" + index}
                         className="advertisement-data__description">
                      {value.description}
                    </div>
                  </div>
                </Link>
              </div>
            </>
          })}
        {error && <div>An error occurred</div>}
      </div>
    </div>
  )
}