import React from 'react'
import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap';
import './offcanvas-navbar.css';

const OffcanvasNavbar = () => {
  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between w-100">
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Brand href="#" className='d-none d-md-inline mx-2'>Menu</Navbar.Brand>
          <div className="text-center flex-grow-1">
            <Navbar.Brand id="troveTrackNavLink" href="#">TroveTrack</Navbar.Brand>
          </div>
        </div>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          backdrop={false}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Offcanvas Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasNavbar;