import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Add from '../components/Add'
import View from '../components/View'
import Category from '../components/Category'
import { Link } from 'react-router-dom';
import { hover } from '@testing-library/user-event/dist/hover'



function Home() {

  //state define for state lifting technique
  const [addUpdate,setAddUpdate]=useState({})

  

  return (
    <div>
      <h1 className='mt-3 p-3 ms-5 text-success'>All Video Cards</h1>


      
      <Link to={'/history'} style={{textDecoration:'none'}}>
        <div className='d-flex gap-3'>
      <i class="fa-solid fa-clock-rotate-left fa-flip mt-1 ms-5 fa-2x" ></i>
      <h3>Watch History</h3>
       </div>
      
      </Link>
     

      <Container>
        <Row>

          <Col lg={1}>

          {/* state lifting technique */}
            <Add setAddUpdate={setAddUpdate} />

          </Col>

          <Col lg={7}>

            {/* state lifting technique */}
            <View addUpdate={addUpdate} />

          </Col>

          <Col lg={4}>

            <Category />

          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Home