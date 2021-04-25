import { Alert, Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { M } from 'materialize-css';
import { React, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useHistory } from 'react-router-dom';


const EditorSetup=()=>{

    const history=useHistory()
    
    const [editorState,setEditorState]=useState(()=>EditorState.createEmpty());

    const [display, setDisplay]=useState('');
    
    const updateTextDesciption = async (state) =>{
        await setEditorState(state);
        setDisplay(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    //from here modal work starts.
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // console.log(JSON.stringify(display))
        fetch("http://localhost:8000/api/createquote",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                quote:display
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                <Alert message="Warning" description={data.error} type="error" showIcon />
            }
            else{
                <Alert message="Success" description="Quote Post created successfully" type="success" showIcon />
                history.push('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
        //setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return(
        <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="edit">
                <div className="editEditor">
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={updateTextDesciption}
                    />
                </div>
                <div dangerouslySetInnerHTML={{__html:`${display}`}}></div>
            </div>
      </Modal>
    </>
        
    );
}
export default EditorSetup;