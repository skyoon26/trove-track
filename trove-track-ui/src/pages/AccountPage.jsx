import { useState, useEffect } from 'react';
import { Container, Stack, Card, Button, Col, Row, Modal, InputGroup, Form, ListGroup } from 'react-bootstrap';
import { getAccount, updateAccount } from '../services/authService';
import PageTabs from '../components/PageTabs';

const AccountPage = () => {
  const firstName = sessionStorage.getItem("firstName");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [account, setAccount] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    role: ""
  })

  const handleClose = () => {
    setShow(false);
    setSuccess(false);
    setError(null);
  };

  const handleShow = () => {
    setFormData({
      firstName: account.firstName || "",
      lastName: account.lastName || "",
      email: account.email || "",
      username: account.username || "",
      role: account.role?.name || ""
    });
    setShow(true);
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getAccount();
        setAccount(data);
      } catch (error) {
        setError("Oops! We couldn't fetch the account. Please try again.");
      }
    };

    fetchAccount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAccount(formData);
      setSuccess(true);
      setError(null);
      const updatedData = await getAccount();
      setAccount(updatedData);
      setTimeout(() => handleClose(), 1000);
    } catch (err) {
      setError("Oops! We couldn't update the account. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <Container className="main-container py-3">
      <Stack direction="horizontal" gap={3} className="m-0 p-3">
        <h2>{firstName ? firstName : "Guest"}</h2>
        <p className="ms-auto">{today}</p>
      </Stack>

      <Card className="mt-3">
        <Card.Header className="fs-5 fw-bold">
          <Row className="d-flex justify-content-between align-items-center">
            <Col>Account Info</Col>
            <Col className="text-end">
              <Button variant="outline-primary" onClick={handleShow}>Edit Account</Button>
              <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form id="editAccountForm" onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="accountFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        required
                        autoFocus
                        autoComplete="off"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="accountLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        required
                        autoFocus
                        autoComplete="off"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="accountEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="accountRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="">Select...</option>
                        <option>USER</option>
                        <option>ADMIN</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  {error && <div className='alert alert-danger'>{error}</div>}
                  {success && <div className='alert alert-success'>Account updated successfully!</div>}
                  </Form>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" form="editAccountForm">
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item><label className="fw-bold me-2">Username:</label> {account?.username}</ListGroup.Item>
            <ListGroup.Item><label className="fw-bold me-2">First Name:</label> {account?.firstName}</ListGroup.Item>
            <ListGroup.Item><label className="fw-bold me-2">Last Name:</label> {account?.lastName}</ListGroup.Item>
            <ListGroup.Item><label className="fw-bold me-2">Email:</label> {account?.email}</ListGroup.Item>
            <ListGroup.Item><label className="fw-bold me-2">Role:</label> {account?.role?.name || "N/A"}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <PageTabs />
    </Container>
  )
}

export default AccountPage