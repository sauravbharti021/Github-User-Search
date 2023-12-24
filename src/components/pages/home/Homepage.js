
import React, {useState, useEffect} from "react";
import { commonRequest } from "../../../axios";
import { B_URL } from "../../../axios";
import DisplayUser from "../displayUser/DisplayUser";

const Homepage= ()=>{

    const [query, setQuery] = useState("")
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)

    const [limit, setLimit] = useState(30)
    const [totalCount, setTotalCount]= useState(2)

    // const [totalPage, setTotalPage] = useSta

    const handleQuery = (e)=>{
        setQuery(e.target.value)
    }
    
    const fetchUsers=async( )=>{
        if(query==""){
            alert("Enter in input field")
            return null
        }

        try{
            const res= await commonRequest("GET", `${B_URL}/search/users?q=${query}&page=${page}&per_page=${limit}}`)
            const {data}= res
            if(data){
                setTotalCount(data.total_count)
                return data?.items

            }
        }catch(err){
            console.log(err, "error in fetching")
            return null
        }
    }
    
    const handleSearch= async (e)=>{
        e.preventDefault()
        setPage(1)
        const items = await fetchUsers()

        setUsers(items)
    }

    const handleLimit=(e)=>{
       setLimit(parseInt(e.target.value))
       setPage(1)
    }


    const handlePrevPage=()=>{
        setPage((page)=>{
            if(page===1){
                return 1
            }else{
                return page-1
            }
        })
    }
    const handleNextPage=()=>{
        setPage((page)=>{
                if((limit*page)<=totalCount)
                return page+=1
                else
                    return page 
        })

    }

    useEffect(()=>{
        const displayUserOnChange= async ()=>{
            if(query){

                if((limit*(page-1))<=totalCount){
                    const res= await commonRequest("GET", `${B_URL}/search/users?q=${query}&page=${page}&per_page=${limit}`)
                    const {data}= res
                    if(data){
                        setUsers(data.items)
                    }
    
                }
            }
        }

        displayUserOnChange()
    }, [page, limit])
    

    return(
        <>
          <div className="container">
            <div className="search-form">
                <h3>Search Github User</h3>
                <form action="submit">
                    <input type="text" value={query} onChange={handleQuery}  />
                    <button type="button" onClick={handleSearch}>Search</button>
                </form>
            </div>
            <div className="search-results">
                <div className="more-options">
                    <label>
                        <small>Users per page</small>
                        <select onChange={handleLimit}>
                            <option value="30">30</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            
                            <option value="50">50</option>
                        </select>
                    </label>
                    <div className="pagination">
                        <button onClick={handlePrevPage}>&lt; {page}</button>
                        <button onClick={handleNextPage}>{page+1} &gt;</button>
                    </div>
                </div>
                <DisplayUser users={users} />
               
            </div>
          </div>
        </>
    );
} 
export default Homepage;
