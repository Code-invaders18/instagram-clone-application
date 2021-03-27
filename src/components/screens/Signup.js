import { React, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Signup =()=>{
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    const [email, setEmail]=useState("")
    const history=useHistory()
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)
    
    useEffect(()=>{
        uploadFields()
    },[url])

    const uploadPic=()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud name","vmcloud18")


        fetch("https://api.cloudinary.com/v1_1/vmcloud18/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

    }
    const uploadFields=()=>{

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: "Invalid Email", classes:"#d50000 red accent-4"});
         }
         fetch("http://localhost:8000/api/signup",{
             method:"post",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 name,
                 password,
                 email,
                 pic:url
             })
         }).then(res=>res.json())
         .then(data=>{
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

    const PostData=()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }
    return (
        <div className="mycard">
            <div className='card auth-card'>
               <h2>Instagram</h2>
               <input
                   type='text'
                   placeholder='Name'
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
               />
               <input
                   type='email'
                   placeholder='E-Mail'
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
               />
               <input
                   type='password'
                   placeholder='Password'
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
               />
               <div className="file-field input-field">
                    <div class="btn #64b5f6 blue darken-1">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                 onClick={()=>PostData()}
                >
                   SignUp  
                </button>
                <h5>
                    <Link to='/signin'>Already have an account!!</Link>
                </h5>
            </div>
        </div>
    );
}
export default Signup;
