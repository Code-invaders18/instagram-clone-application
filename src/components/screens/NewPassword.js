import { React, useContext, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import M from 'materialize-css';



const NewPassword=()=>{
    const {token}=useParams()
    console.log(token)
    const [password, setPassword]=useState("")
    const history=useHistory()
    const PostData=()=>{
        fetch("http://localhost:8000/api/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#d50000 red accent-4"})
            }
            else{
                
                M.toast({html: data.message,classes:"#388e3c green darken-2"})
                history.push('/signin')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className='card auth-card'>
               <h2>Instagram</h2>
               <input
                   type='password'
                   placeholder='Enter new password'
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
               />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                 onClick={()=>PostData()}
                >
                   Update Password 
                </button>
                
            </div>
        </div>
    );
}
export default NewPassword;
;
