import React from 'react'
import { Video } from 'react-feather'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div >
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">
            <Link to={''} style={{textDecoration:'none'}}>
          <h2> <Video size={40}  className='me-3'></Video>Video Stack </h2>
          </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
       
    </div>
  )
}

export default Header