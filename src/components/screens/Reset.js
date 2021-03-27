import { React, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Reset=()=>{

    const [email, setEmail]=useState("")
    const history=useHistory()

    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           return M.toast({html: "Invalid Email", classes:"#d50000 red accent-4"});
        }
        fetch("http://localhost:8000/api/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#d50000 red accent-4"})
            }
            else{
                M.toast({html:data.message,classes:"#388e3c green darken-2"})
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
                   type='email'
                   placeholder='E-Mail'
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
               />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                 onClick={()=>PostData()}
                >
                   Reset Password
                </button>
            </div>
        </div>
    );
}
export default Reset;
;
