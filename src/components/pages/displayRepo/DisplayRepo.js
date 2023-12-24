import React from 'react'

export default function DisplayRepo({repo}) {
    const {data}= repo
  return (
    <>
        {
            data ? data.map((val)=>{
                return (<div className='repo'>
                    <h3>
                        <a href={val.html_url}> {val.name} </a>
                        </h3>
                    <p>{val?.description}</p>
                    {
                        val.language &&
                        <small>Written in {val.language}</small>
                    }
                    
                </div>)
            }):
            <div> No Repositories  </div>
        }
    </>
  )
}
