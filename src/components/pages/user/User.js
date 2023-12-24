import React, {useState, useEffect} from 'react'
import './User.css'
import github from './../../../assets/github.png' 
import location from './../../../assets/location.png' 
import site from './../../../assets/site.png' 
import user from './../../../assets/user.png' 
import { B_URL, commonRequest } from '../../../axios'

import { Link, useParams } from 'react-router-dom'
import DisplayRepo from '../displayRepo/DisplayRepo'

const User = () => {

    const {id} = useParams()

    const [currentUser, setCurrentUser] = useState([])
    const [repo, setRepo]= useState([])

    const fetch= async()=>{
        try{
            const res= await Promise.all([
                commonRequest("GET", `${B_URL}/users/${id}`),
                commonRequest("GET", `${B_URL}/users/${id}/repos`)
            ])
            setRepo(res[1])
            setCurrentUser(res[0].data)
        }catch(err){
            console.log(err, "Error found while finding User")
            return null
        }
    }

    useEffect(()=>{
        fetch()
    }, [])

  return (
    <>
        <div className='container'>
            <Link to="/" className='back'>
                Back
            </Link>
            <div className='user-information'>
                <div className='image'>
                <img src={currentUser.avatar_url} alt={currentUser.login}/>
                </div>
                <div className='user-content'>
                    <h3>Name of the User: {currentUser.login} </h3>
                    <p>{currentUser.bio}</p>

                    <div className='more-data'>
                        <p>
                            <img src={user}/>
                            {currentUser.followers} followers, {currentUser.following} following
                        </p>
                        {
                            currentUser.location &&
                            (<p><img src={location}/> {currentUser.location}</p>)
                        }
                        
                        <p>
                            <img src={site}/>
                            {currentUser.blog ? currentUser.blog : currentUser.html_url}
                        </p>
                        <p>
                            <img src={github} />
                            <a href={currentUser.html_url}>
                                View Github Profile
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className='user-repos'>
                <DisplayRepo repo={repo} key={repo.id} />
            </div>
        </div>
    </>
  )
}
export default User;

