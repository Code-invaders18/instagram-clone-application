import { React, useEffect, useState, useContext } from 'react';
import { UserContext } from './../../App';

const Profile =()=>{
    
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)

    const {state,dispatch}=useContext(UserContext)
    const [mypic,setMypic]=useState([])

    useEffect(()=>{
        fetch("http://localhost:8000/api/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setMypic(result.mypost)
        })
    },[])
    
    //this is called when the image is updated.

    useEffect(()=>{
        if(image){
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
                //after the photo has been selected, it's time to make update in our mongodb system
                
                fetch("http://localhost:8000/api/updatepic",{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                    
                })
                //window.location.reload()
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[image])
    
    const updatePhoto=(file)=>{
        setImage(file)
    }
    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{margin:"18px 0px",borderBottom:"1px solid grey"}}>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <div>
                        <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                        src={state?state.pic:"Loading!!..."}
                        />
                    </div>
                    <div>
                        <h4>{state?state.name:"loading"}</h4>
                        <h5>{state?state.email:"loading"}</h5>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h6>{mypic.length} Posts</h6>
                            <h6>{state? state.followers.length:"0"} Followers</h6>
                            <h6>{state?state.following.length:"0"} Following</h6>
                        </div>
                    </div>
              </div> 
              <div className="file-field input-field" style={{margin:"10"}}>
                            <div class="btn #64b5f6 blue darken-1">
                                <span>Update pic</span>
                                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                            </div>
                            <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" />
                    </div>
                </div>
            </div>                     
            <div className="gallery">
                {
                    mypic.map((myitem)=>{
                        return(
                            <img key={myitem._id} className="item" src={myitem.photo} alt={myitem.title}/>                
                        )
                    })
                }
            </div>
        </div>
    );
}
export default Profile;