import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">
          <p className='text-center fixed-bottom'> copyrights @play video </p>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Footer