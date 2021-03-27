import { React, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import M from 'materialize-css';

const CreatePost=()=>{
    const [title,setTitle]=useState("")
    const [body, setBody]=useState("")
    const [image, setImage]=useState("")
    const [url, setUrl]=useState("")
    const history=useHistory()
    
    useEffect(()=>{
        if(url){
            fetch("http://localhost:8000/api/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#d50000 red accent-4"})
            }
            else{
                M.toast({html: "Created Post Successfully!!",classes:"#388e3c green darken-2"})
                history.push('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
        }
    },[url])
    
    const postDetails=()=>{
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

    return(
        <div className="card input-filed"
          style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
          }}
        >
            <input 
                type="text" 
                placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Body"
                value={body}
                onChange={(e)=>setBody(e.target.value)}
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
              onClick={()=>postDetails()}
            >
                Submit Post
            </button>
        </div>
    );
}
export default CreatePost
