import { useState } from 'react';
import { Button, Modal, Card, ListGroup } from "react-bootstrap";
import placeholderImage from "../assets/images/no-image-placeholder.png";

const ViewModal = ({ item }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Button variant="outline-primary" className="px-2 py-1" onClick={handleShow}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
      </svg>
      </Button>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Card>
            <Card.Body>
              <Card.Img variant="top" src={placeholderImage} style={{ width: "430px", height: "500px" }}/>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="fw-bold">Name:</span> {item.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Amazon ID Number:</span> {item.asin || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Location:</span> {item.location}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Price:</span> {item.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Stock Level:</span> {item.quantity}
              </ListGroup.Item>
              <ListGroup.Item>
              <span className="fw-bold">Minimum Quantity:</span> {item.minQuantity}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Description:</span> {item.description}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewModal