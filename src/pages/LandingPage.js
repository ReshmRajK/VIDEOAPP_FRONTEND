import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';


function LandingPage() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
      <Container>
        <Row className=''>

        <Col >
          <h1 className='text-center mt-5' style={{fontFamily: 'Lobster Two, cursive'}} >Welcome To <span style={{fontFamily: 'Dancing Script, cursive'
,color:'hotpink'}}>videoStack</span> </h1>
            <p style={{textAlign:'justify',fontFamily:'Dancing Script, cursive',fontSize:'25px'}} className='mt-4'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, maxime impedit. Dolores dolorem sit perferendis ut, expedita eius facere, neque ea corporis ipsa veritatis corrupti fuga eligendi alias nobis. Qui?
            </p>
            
            <div className='d-flex justify-content-center mt-3'>
              <Link to={'/home'}>
            <button className='btn btn-outline-success mb-5'>Click Here To KnowMore</button>
            </Link>
            </div>
          </Col>

          <Col md={6} lg={6} className='mb-5 mt-5'>
            <img className='mt-5' src="https://i.postimg.cc/Gp4b9ngh/video.jpg" alt="" style={{ width: '100%', height: 'auto' }}  />
          </Col>

          
        </Row>
      </Container>

    </div>
  )
}

export default LandingPage



