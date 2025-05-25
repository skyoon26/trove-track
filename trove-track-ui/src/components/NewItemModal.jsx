import { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { createItem } from '../services/itemService';

const NewItemModal = ({ categories, refetchCategories }) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState({
    categoryId: "",
    name: "",
    quantity: "",
    minQuantity: "",
    price: "",
    location: "",
    description: "",
    asin: "",
  });

  const resetMessages = () => {
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    setShow(false);
    setItemData({
      name: "",
      quantity: "",
      minQuantity: "",
      price: "",
      location: "",
      description: "",
      categoryId: "",
      asin: "",
    });
    resetMessages();
  };

  const handleShow = () => setShow(true);

  const handleAddItem = async (itemData) => {
    setSuccess(false);
    setError(null);
    try {
      await createItem(itemData);
      setSuccess(true);
      await refetchCategories();
    } catch (error) {
      setError("Oops! We couldn't add the new item. Please try again later.");
      setSuccess(false);
    }
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleSubmitItem = async (e) => {
    e.preventDefault();

    if (itemData.name.length < 3 || itemData.name.length > 50) {
      setError("Item name must be between 3 and 50 characters.");
      return;
    }

    const item = {
      categoryId: itemData.categoryId,
      name: itemData.name,
      quantity: itemData.quantity,
      minQuantity: itemData.minQuantity,
      price: itemData.price,
      location: itemData.location,
      description: itemData.description,
      asin: itemData.asin,
    };
    await handleAddItem(item);
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
      <Button variant="outline-primary" className="p-2" onClick={handleShow}>New Item</Button>
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="newItemForm" onSubmit={handleSubmitItem}>
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
                onChange={handleItemChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="categoryId"
                required
                value={itemData.categoryId}
                onChange={handleItemChange}
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
                onChange={handleItemChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemMinQuantity">
              <Form.Label>Minimum Quantity</Form.Label>
              <Form.Control
                type="text"
                name="minQuantity"
                placeholder="Enter minimum quantity"
                value={itemData.minQuantity}
                onChange={handleItemChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="Enter price"
                value={itemData.price}
                onChange={handleItemChange}
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
                onChange={handleItemChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="itemAsin">
              <Form.Label>Amazon ID Number</Form.Label>
              <Form.Control
                type="text"
                name="asin"
                placeholder="Enter Amazon ID"
                value={itemData.asin}
                onChange={handleItemChange}
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
              onChange={handleItemChange}
            />
          </Form.Group>
          {error && <div className='alert alert-danger'>{error}</div>}
          {success && <div className='alert alert-success'>New item added successfully!</div>}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="newItemForm">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewItemModal;