import { useState, useEffect } from 'react';
import { Container, Stack, Card, Button, Col, Row, Modal, InputGroup, Form, ListGroup } from 'react-bootstrap';
import { getAccount } from '../services/authService';
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <Button variant="outline-primary">Edit Account</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item><label className="fw-bold me-2">First Name:</label> {account?.firstName}</ListGroup.Item>
            <ListGroup.Item><label className="fw-bold me-2">Last Name:</label> {account?.lastName}</ListGroup.Item>
            <ListGroup.Item><label className="fw-bold me-2">Username:</label> {account?.username}</ListGroup.Item>
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