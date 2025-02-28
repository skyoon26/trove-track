import { useEffect, useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './offcanvas-navbar.css';

const OffcanvasNavbar = ({ handleLogout, isAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

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

  const handleLinkClick = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <Navbar expand={false} sticky="top" className={`offcanvas-navbar-section ${scrolled ? 'scrolled' : ''}`}>
        <Container fluid>
          <div className="d-flex align-items-center justify-content-between w-100">
            <Navbar.Toggle 
              aria-controls="offcanvasNavbar"
              onClick={() => setShowOffcanvas(!showOffcanvas)} 
            />
            <Navbar.Brand
              id="troveTrackNavLink"
              className="mx-auto"
            > 
              {isAuthenticated ? (
                <Nav.Link as={Link} to={"/home"}>TroveTrack</Nav.Link>
              ) : (
                <Nav.Link as={Link} to={"/"}>TroveTrack</Nav.Link>
              )}
            </Navbar.Brand>
          </div>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Offcanvas Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {isAuthenticated ? (
                  <>
                    <Nav.Link as={Link} to={"/home"} onClick={handleLinkClick}>Home</Nav.Link>
                    <Nav.Link as={Link} to={"/inventory"} onClick={handleLinkClick}>Inventory</Nav.Link>
                    <Nav.Link as={Link} to={"/activity"} onClick={handleLinkClick}>Activity</Nav.Link>
                    <NavDropdown title="Account" id="collapsible-nav-dropdown">
                      <NavDropdown.Item as={Link} to={"/account"} onClick={handleLinkClick}>View</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={() => { handleLogout(); setShowOffcanvas(false); }}>Sign out</NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to={"/signin"} onClick={handleLinkClick}>Sign In</Nav.Link>
                    <Nav.Link as={Link} to={"/register"} onClick={handleLinkClick}>Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasNavbar;