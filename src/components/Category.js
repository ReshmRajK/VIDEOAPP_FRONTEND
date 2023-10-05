import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid';
import { addCategory, getAllCategory, getVideo, removeCategory, updateCategory } from '../service/allApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'react-feather';
import { Col, Row } from 'react-bootstrap';
import VideoCard from './VideoCard';


function Category() {

  const [show, setShow] = useState(false);

  const [uploadCategory, setUploadCategory] = useState({
    id: "",
    name: "",
    allVideos: []
  })


  //for category
  const [category, setCategory] = useState([])

  //api call for to display all category
  const getCategory = async () => {
    const result = await getAllCategory()
    // console.log(result.data);
    if (result.status >= 200 && result.status < 300) {
      setCategory(result.data)
      getCategory()
    }

  }
  // console.log(category);

  useEffect(() => {
    getCategory()

  }, [])



  //api call for delete category
  const deleteCategoryItem = async (id) => {
    const response = await removeCategory(id)
    // console.log(response);
    if (response.status >= 200 && response.status < 300) {

      //refresh category(delete function call only in this file it doesn't have any sibilings. so there is not create state for delete function just call already defined function for get all category)
      getCategory()

    }
  }



  //api call for add category
  const setItem = (e) => {
    // const value=e.target.value
    const { name, value } = e.target
    // console.log(value);
    // const name=e.target.name
    // console.log(name);
    setUploadCategory({ ...uploadCategory, [name]: value })

  }



  const handleAdd = async () => {
    var id = uniqid()
    // console.log(id);
    setUploadCategory({ ...uploadCategory, ["id"]: id })
    const { name } = uploadCategory

    if (!name) {
      toast.warn('Please input category name', {
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
      const result = await addCategory(uploadCategory)
      // console.log(result);

      if (result.status >= 200 && result.status < 300) {
        setUploadCategory(result.data)
        toast.success('Category Added Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        setShow(false)

      }

    }
    // console.log(uploadCategory);

  }

  // console.log(uploadCategory);


  //delete category


  //to drop the element
  const draggedOver = (e) => {

    //to prevent the looping of js event(onDragOver event)
    e.preventDefault()
    // console.log("dragged over the category");
  }


  //to check element is dropped or not
  const dropped = async (e, id) => {
    // console.log("category id is" +id);

    //access video id tranfeerd from start drag
    let sourceCardId = e.dataTransfer.getData("cardId")
    // console.log("source card id "+sourceCardId);

    //api call for take video and drop it on category
    const { data } = await getVideo(sourceCardId)
    // console.log(data);

    //update category
    //find selected category from all category using id
    const selectedCategory = category.find(i => i.id == id)
    console.log(selectedCategory);

    //add video to allVideos array of selected category
    selectedCategory.allVideos.push(data)
    console.log(selectedCategory);

    //update in database
    await updateCategory(id, selectedCategory)

    //to access updated category from db
    getCategory()

  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (

    <div className='mt-5'>
      <button variant="primary" className='w-100 btn btn-info' onClick={handleShow}>Add Category</button>

      {category?.map(item => (

        <div droppable onDragOver={(e) => draggedOver(e)} onDrop={(e) => dropped(e, item.id)} 
        style={{ border: '2px solid green' }}  className='p-3 mt-3 mb-5'>

          <div className=' d-flex justify-content-between'>

            <h4 className='text-info'>{item.name}</h4>
            <Trash2 onClick={() => deleteCategoryItem(item.id)} color='red' className='mt-1'></Trash2>

          </div>

          <div className=' mb-3' >
            <Row>
              {
                item?.allVideos.map(i => (
                  <Col className='mt-5' style={{display: 'flex',justifyContent: 'center'}}>
                    <VideoCard inCard={true} video={i} />
                  </Col>

                ))

              }

            </Row>

          </div>


        </div>

      ))



      }



      <Modal show={show} onHide={handleClose} >

        <Modal.Header closeButton>
          <Modal.Title>Upload A Video</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <FloatingLabel
            controlId="floatingTextarea"
            label="id"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel> */}

          <FloatingLabel
            controlId="floatingTextarea"
            label="category name"
            className="mb-3"
          >
            <Form.Control name="name" onChange={setItem} as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="success" >
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

export default Category