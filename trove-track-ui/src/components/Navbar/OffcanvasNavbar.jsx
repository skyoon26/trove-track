import { useEffect, useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './offcanvas-navbar.css';

const OffcanvasNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar expand={false} sticky="top" className={`offcanvas-navbar-section ${scrolled ? 'scrolled' : ''}`}>
        <Container fluid>
          <div className="d-flex align-items-center justify-content-between w-100">
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Brand 
              href="#" 
              className='d-none d-md-inline mx-2'
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            >
              Menu
            </Navbar.Brand>
            <Navbar.Brand
              id="troveTrackNavLink"
              className="mx-auto text-center"
            >
              <Nav.Link as={Link} to={"/landing"}>TroveTrack</Nav.Link>
            </Navbar.Brand>
          </div>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            backdrop={true}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Offcanvas Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                <Nav.Link as={Link} to={"/order"}>Order</Nav.Link>
                <Nav.Link as={Link} to={"/manage"}>Manage</Nav.Link>
                <Nav.Link as={Link} to={"/search"}>Search</Nav.Link>
                <NavDropdown title="Account" id="collapsible-nav-dropdown">
                  <NavDropdown.Item as={Link} to={"/account"}>View</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/account"}>Sign out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasNavbar;