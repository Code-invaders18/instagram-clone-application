import { React, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './../../App';

const SuscribeUserPost =()=>{

    const [data,setData]=useState([])
    const {state,dispatch}=useContext(UserContext)

    useEffect(()=>{
       fetch("http://localhost:8000/api/getsubpost",{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           //here down...we have object in which we are having our result in posts.
           setData(result.posts)
       })
    },[])

    const likePost=(id)=>{
        fetch("http://localhost:8000/api/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
            }).then(res=>res.json())
            .then(result=>{
                //console.log(result)
                const newData= data.map(item=>{
                    if(item._id==result._id){
                        return  result
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
        })
    }
    const unlikePost=(id)=>{
        fetch("http://localhost:8000/api/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            const newData= data.map(item=>{
                if(item._id==result._id){
                    return  result
                }
                else{
                    return item
                }
            })
            setData(newData)
        })
    }

    const makeComment=(text,postId)=>{
        fetch("http://localhost:8000/api/comment",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData= data.map(item=>{
                if(item._id==result._id){
                    return  result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const deletePost=(postid)=>{
        fetch(`http://localhost:8000/api/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           console.log(result)
           const newData=data.filter(item=>{
               return item._id!==result._id
           })
           setData(newData)
        })
    }
    return (
        <div>
            {
                data.map(item=>{
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"6px"}}><Link to={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</Link>
                            {
                              item.postedBy._id == state._id && 
                              <i className="material-icons" 
                                 style={{float:"right"}}
                                 onClick={()=>deletePost(item._id)}
                               >
                               delete</i>}</h5>
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                                {item.likes.includes(state._id)
                                ? 
                                <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                                    >
                                    thumb_down
                                </i>
                                :  
                                <i className="material-icons"
                                    onClick={()=>{likePost(item._id)}}
                                    >
                                    thumb_up
                                </i>
                            }
                            
                            
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                            <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    //console.log(e.target[0].value)
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                    <input type="text" placeholder="add a comment"/>
                                </form>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    );
}
export default SuscribeUserPost;


/*
<div className="card home-card">
                <h5>Ramesh</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=344&q=80"/>
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is an amazing post.</p>
                    <input type="text" placeholder="add a comment"/>
                </div>
            </div>
            <div className="card home-card">
                <h5>Ramesh</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=344&q=80"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is an amazing post.</p>
                    <input type="text" placeholder="add a comment"/>
                </div>
            </div>
*/
