import {Link} from "react-router-dom";
import React from "react";
import useSWR from "swr";
import fetcher from "../fetcher";
import axios from "axios";

export const Starred = ({userId, setUserId}:
                          {
                            userId: string,
                            setUserId: React.Dispatch<React.SetStateAction<string>>
                          }) => {
  const databaseAPI = 'http://localhost:4000';
  const {data, mutate} = useSWR(`${databaseAPI}/user/${userId}/starred`, fetcher);
  const handleStar = async (userId: string, id: string) => {
    await axios.put(`${databaseAPI}/user/${userId}/advertisement/${id}/star`);
    await mutate();
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
        <Link to={`/user/${userId}/profile`}>
          <button type="button">Profile</button>
        </Link>
        <Link to={"/"}>
          <button type="button" onClick={() => {
            setUserId("")
          }}>
            Log out
          </button>
        </Link>
      </nav>
      <Link to={`/user/${userId}/advertisement/form`}
            className="add-advertisement">
        <button>Create advertisement</button>
      </Link>
      <div className="advertisements">
        {data !== undefined &&
          data.data !== undefined &&
          data.data.map((value: {
            advertisement:
              {
                id: string,
                name: string,
                description: string,
                createdAt: Date,
                editedAt: Date,
                deleted: boolean,
                userId: string
              }
          }, index: number) => {
            if (value.advertisement.deleted) {
              return;
            }
            return <>
              <div className="clickable" onClick={() => {
                handleStar(userId, value.advertisement.id)
              }}>
                Remove from my starred
              </div>
              <div className="advertisement">
                <Link to={`/user/${userId}/advertisement/${value.advertisement.id}`}
                      className="link">
                  <div key={index} className="advertisement-data">
                    <div key={"name" + index}
                         className="advertisement-data__name">
                      {value.advertisement.name}
                    </div>
                    <div key={"description" + index}
                         className="advertisement-data__description">
                      {value.advertisement.description}
                    </div>
                  </div>
                </Link>
              </div>
            </>
          })}
      </div>
    </div>
  )
}