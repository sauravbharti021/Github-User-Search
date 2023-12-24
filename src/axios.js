
import axios from 'axios'
export const B_URL = "https://api.github.com"

export const commonRequest= async(methods, url, body, header)=>{
    let config= {
        method : methods,
        url,
        headers: header ? header : {
            "Content-Type" : "application/json"
        },
        data : body
    }

    return axios(config).then((data)=> {return data}).catch((err)=>{
        console.log("Error in api call",err)
        return err
    })

}