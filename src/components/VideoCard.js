import React from 'react'
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addHistory, removeVideo } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqid from 'uniqid';
import {format} from 'date-fns'





function VideoCard({video,deleteUpdate,inCard}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async() =>{
        setShow(true);
        let id=uniqid()

        // let date=new Date()
        let date=format(new Date(),'MMMM Do yyyy ,h:mm:ss a')
        // let url,title=
        const {url,caption}=video  //these values are already present in video state so we de-structure it 

        //craete body data
        const body={
            id,
            cardName:caption,
            url,
            date
        }

        //check all the values are not equal to empty the
        if(id!=="" && caption!=="" && date!=="" && url!==""){

            // api call for add history and 
            await addHistory(body)

        }

    }
     

    const handleDelete=async(id)=>{
       const result=await removeVideo(id)
    //    console.log(result);
    if(result.status>=200 && result.status<300){
        deleteUpdate(true)

        toast.success('Video deleted Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:"dark"
            });

    }

    }

    const dragStarted=(e,id)=>{
        console.log("darg started and the source card id is" +id);

        //to store dragged data
        e.dataTransfer.setData("cardId",id)

    }

    return (
        <div >
            <Card draggable onDragStart={(e)=>dragStarted(e,video?.id)}  className='mt-3' style={{ width: '18rem', backgroundColor: 'hotpink' }}>
                <Card.Img onClick={handleShow} variant="top" src={video?.thumbnail} style={{ width: '100%', height: '150px' }} />
                <Card.Body>

                    <Card.Text className='d-flex justify-content-between'>
                        <p className='mt-3'>{video?.caption}</p>
                        {
                            inCard ? "" :(<Trash2 onClick={()=>handleDelete(video?.id)} className='btn' size={48} color='green'></Trash2>)

                        }

                    </Card.Text>

                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Video Caption</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <iframe width="100%" height="400px" src={video?.url+"?autoplay=1"} title="LUMINARONAM - 2K23 - COCHIN BRANCH STUDENTS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </Modal.Body>
               
            </Modal>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default VideoCard