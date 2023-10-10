import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <div style={{width:'100vw'}} className='mt-5'>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">
          <p className="text-center"> copyrights @play video </p>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Footer