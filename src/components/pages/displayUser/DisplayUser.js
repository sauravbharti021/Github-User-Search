
import React from 'react'
import { Link } from 'react-router-dom'

export default function DisplayUser({users}) {
   
  return (
    <>
        {
            users ? users.map((val, ind) => {
                const {avatar_url, login, id} = val
                return (
                    <div className="user">
                    <div className="image">
                        <img src={avatar_url} alt={login}/>
                    </div>  
                    <div className="user-info">
                        <h3>{login}</h3>
                        <small> Id : {id} </small>
                        <Link to={`/user/${login}`} >
                        View Profile
                        </Link>
                    </div>
                </div>
                )

            }):
            <div>No user found</div>
        }
    </>

  )
}
