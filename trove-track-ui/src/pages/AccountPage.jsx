import { useState } from 'react';
import { Container, Stack, Card, Button, Col, Row, Modal, InputGroup, Form } from 'react-bootstrap';
import PageTabs from '../components/PageTabs';

const AccountPage = () => {
  const firstName = sessionStorage.getItem("firstName");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Card.Text>Account details here</Card.Text>
        </Card.Body>
      </Card>
      <PageTabs />
    </Container>
  )
}

export default AccountPage