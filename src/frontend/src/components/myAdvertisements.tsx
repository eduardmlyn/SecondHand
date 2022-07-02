import React from "react"
import {Link} from "react-router-dom";
import useSWR from "swr";
import fetcher from "../fetcher";

export const MyAdvertisements = ({userId, setUserId}: {
  userId: string,
  setUserId: React.Dispatch<React.SetStateAction<string>>
}) => {
  const {data} = useSWR(`http://localhost:4000/user/${userId}/advertisement`, fetcher)
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
      </nav>
      <Link to={`/user/${userId}/advertisement/form`} className="add-advertisement">
        <button>Create advertisement</button>
      </Link>
      <div className="advertisements">
        {data !== undefined && data.data !== undefined && data.data.map((value: { id: string, name: string, description: string, createdAt: Date, editedAt: Date, deleted: boolean, userId: string }, index: number) => {
          if (value.deleted) {
            return
          }
          return <div className="advertisement">
            <Link to={`/user/${userId}/advertisement/${value.id}`} className="link">
              <div key={index} className="advertisement-data">
                <div key={"name" + index} className="advertisement-data__name">
                  {value.name}
                </div>
                <div key={"description" + index} className="advertisement-data__description">
                  {value.description}
                </div>
              </div>
            </Link>
          </div>
        })}
      </div>
    </div>
  )
}