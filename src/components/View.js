import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAllVideos } from '../service/allApi'




function View({addUpdate}) {

  const [videos,setVideos]=useState([])

  const [deleteStatus,setDeleteUpdate]=useState(false)

  //using function for call api for get all videos
    const getVideos=async()=>{
    const result=await getAllVideos()
    // console.log(result.data);
    setVideos(result.data)
  }
  // console.log(videos);

  useEffect(()=>{
    //function call
    getVideos()

  },[addUpdate,deleteStatus])

  return (
    <div className='border p-3 rounded mt-5'>
        <Container>
            <Row>
              {videos?.map(video=>(
                  <Col sm={12} md={6} style={{display: 'flex',justifyContent:'center'}}>
                    {/* <VideoCard video={video}/> */}
                    <VideoCard video={video} deleteUpdate={setDeleteUpdate}></VideoCard>
                </Col>

                ))
              }
                
            </Row>
        </Container>

    </div>
  )
}

export default View