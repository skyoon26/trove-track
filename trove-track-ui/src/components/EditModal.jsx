import { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { updateItem } from '../services/itemService';

const EditModal = ({ categories, item, refetchCategories }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [itemData, setItemData] = useState({
    categoryId: item.categoryId,
    name: item.name,
    quantity: item.quantity,
    minQuantity: item.minQuantity,
    price: item.price,
    location: item.location,
    description: item.description,
    asin: item.asin
  });

  const resetMessages = () => {
    setError(null);
    setSuccess(false);
  };

  const handleShow = () => {
    setItemData({
      categoryId: item.categoryId,
      name: item.name,
      quantity: item.quantity,
      minQuantity: item.minQuantity,
      price: item.price,
      location: item.location,
      description: item.description,
      asin: item.asin,
    });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    resetMessages();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (itemData.name.length < 3 || itemData.name.length > 50) {
      setError("Item name must be between 3 and 50 characters.");
      return;
    }

    try {
      await updateItem(item.id, itemData);
      setSuccess(true);
      await refetchCategories();
      setTimeout(() => handleClose(), 1000);
    } catch (error) {
      setError("Oops! We couldn't edit the item. Please try again later.");
      setSuccess(false);
    }
  };

  useEffect(() => {
      if (success) {
        setTimeout(() => {
          handleClose();
        }, 1000);
      }
    }, [success]);

  return (
    <>
      <Button variant="outline-warning" className="px-2 py-1" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
        </svg>
      </Button>
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="editItemForm" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                required
                autoFocus
                autoComplete="off"
                value={itemData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="categoryId"
                required
                value={itemData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          
          <Row className="mb-3">
            <Form.Group as={Col} controlId="itemQuantity">
              <Form.Label>Current Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                placeholder="Enter quantity"
                value={itemData.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemMinQuantity">
              <Form.Label>Minimum Quantity</Form.Label>
              <Form.Control
                type="text"
                name="minQuantity"
                placeholder="Enter minimum quantity"
                value={itemData.minQuantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="Enter price"
                value={itemData.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          
          <Row className="mb-3">
            <Form.Group as={Col} controlId="itemLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter location"
                value={itemData.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemAsin">
              <Form.Label>Amazon ID Number</Form.Label>
              <Form.Control
                type="text"
                name="asin"
                placeholder="Enter Amazon ID"
                value={itemData.asin}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          
          <Form.Group className="mb-3" controlId="itemDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              placeholder="Enter description"
              value={itemData.description}
              onChange={handleChange}
            />
          </Form.Group>
          {error && <div className='alert alert-danger'>{error}</div>}
          {success && <div className='alert alert-success'>Item updated successfully!</div>}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="editItemForm">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;