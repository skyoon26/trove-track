import { useState } from 'react';
import { Container, Stack, Card, Button, Col, Row, Modal, InputGroup, Form } from 'react-bootstrap';
import PageTabs from '../components/PageTabs';

const OrderPage = () => {

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
        <h2>Create a New Order</h2>
        <p className="ms-auto">{today}</p>
      </Stack>

      <Card className="mt-3">
        <Card.Header className="fs-5 fw-bold">
          <Row className="d-flex justify-content-between align-items-center">
            <Col>Order Details</Col>
            <Col className="text-end">
              <Button variant="outline-primary" onClick={handleShow}>Select Item</Button>
            
              <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search for an item"
                      aria-label="Item search"
                    />
                    <Button variant="outline-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                      </svg>
                    </Button>
                  </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Card.Header>
        
        <Card.Body>
          <Card.Text>Select an item to begin order</Card.Text>
        </Card.Body>
      </Card>
      <PageTabs />
    </Container>
  )
}

export default OrderPage;