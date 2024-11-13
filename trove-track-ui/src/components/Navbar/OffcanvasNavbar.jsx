import React from 'react'
import { Navbar, Container, Offcanvas, NavDropdown, Nav, Form, Button } from 'react-bootstrap';

const OffcanvasNavbar = () => {
  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <div className="d-flex align-items-center">
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Brand href="#" className='mx-2'>Menu</Navbar.Brand>
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