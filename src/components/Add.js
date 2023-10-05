import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid';
import { addVideo } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({setAddUpdate}) {

    const [uploadData, setUploadData] = useState({
        id: "",
        caption: "",
        thumbnail: "",
        url: ""
    })


    //function to take input data
    const setInput = (e) => {
        // console.log(e.target.value);

        // using a variable to store the value
        // const value=e.target.value

        //destructuring
        //access key and value
        let { name, value } = e.target

        // console.log(e.target.name);

        // destructuring
        // const {name}=e.target

        //update the key values with existing object
        setUploadData({ ...uploadData, [name]: value })
    }
    // console.log(uploadData);

     //function add
     const handleAdd = async () => {
        // console.log(uniqid());
        var uniqId = uniqid()
        setUploadData({ ...uploadData, ["id"]:uniqId })
        

        const { caption, thumbnail, url } = uploadData
        if (!caption) {
            toast.warn('Please input caption', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        else if (!thumbnail) {
            toast.warn('Please input thumbnail', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        else if (!url) {
            toast.warn('Please input url', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        else {
            const result = await addVideo(uploadData)
            // console.log(result);
            if (result.status >= 200 && result.status < 300) {
                setAddUpdate(result.data)
                toast.success('Video Added Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"dark"
                    });
                setShow(false)
            }

        }

    }


    const extractUrl = (e) => {
        let videoUrl = e.target.value   //https://www.youtube.com/watch?v=hw983rfJYhA
        // let {name}=e.target

        //check the url contain v==string
        if (videoUrl.includes("v=")) {
            let index = videoUrl.indexOf("v=")
            // console.log(index);  //index=30

            let extractUrl = videoUrl.substring(index + 2, index + 13)  //index+13=v=hw983rfJYhA //index+2=hw983rfJYhA
            // console.log(extractUrl);
            let fullUrl = `https://www.youtube.com/embed/${extractUrl}`
            setUploadData({ ...uploadData, [e.target.name]: fullUrl })

            // OR
            // setUploadData({...uploadData,[name]:fullUrl})


        }
    }


   
    // console.log(uploadData);

    // <iframe width="853" height="480" src="https://www.youtube.com/embed/hw983rfJYhA" 
    // title="Luminar Onam Celebration || #luminar #onamcelebration" frameborder="0"
    //  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='mt-5'>
            <div className='text-center'>
            <button >
                <PlusCircle variant="primary" onClick={handleShow} size={40} color='white' className='bg-black border-0' ></PlusCircle>
            </button>
            </div>

            <Modal show={show} onHide={handleClose} >

                <Modal.Header closeButton>
                    <Modal.Title>Upload A Video</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingTextarea1"
                        label="Video Caption"
                        className="mb-3"
                    >
                        <Form.Control name='caption' onChange={setInput} as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Video Cover Image URL"
                        className="mb-3"
                    >
                        <Form.Control name='thumbnail' onChange={setInput} as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingTextarea3"
                        label="Youtube Video URL"
                        className="mb-3"
                    >
                        <Form.Control name='url' onChange={extractUrl} as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleAdd} variant="success">
                        Add
                    </Button>
                </Modal.Footer>

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

export default Add