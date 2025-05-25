import { useState, useEffect } from 'react';
import { Container, Stack, Card, Button, Accordion, Modal, Form, Table, Row, Col } from 'react-bootstrap';
import { createItem } from '../services/itemService';
import PageTabs from '../components/PageTabs';
import EditModal from '../components/EditModal';
import StockIndicator from '../components/StockIndicator';
import ViewModal from '../components/ViewModal';
import DeleteModal from '../components/DeleteModal';
import useCategories from '../hooks/useCategories';
import NewCategoryModal from '../components/NewCategoryModal';

const InventoryPage = () => {
  const { categories, refetchCategories } = useCategories();

  const firstName = sessionStorage.getItem("firstName");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
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

  const handleCloseItemModal = () => {
    setShowItemModal(false);
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
  const handleShowItemModal = () => setShowItemModal(true);

  // Handles item addition
  const handleAddItem = async (itemData) => {
    setSuccess(false);
    setError(null);
    try {
      await createItem(itemData);
      setSuccess(true);
      await refetchCategories(); // Re-fetches the categories to display the updated data
    } catch (error) {
      setError("Oops! We couldn't add the new item. Please try again later.");
      setSuccess(false);
    }
  };

  // Updates the state for a specific value in itemData
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  // Handles form submission for adding a new item
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

  // Closes modal after successful form submission
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        handleCloseItemModal();
      }, 1000);
    }
  }, [success]);

  return (
    <Container className="main-container py-3">
      <Stack direction="horizontal" gap={3} className="m-0 p-3">
        <h2>{firstName ? firstName : "Guest's"}'s Inventory</h2>
        <p className="ms-auto">{today}</p>
      </Stack>

      <Card className="p-2 mt-3">
        <Stack direction="horizontal" gap={3}>
          <h3 className="m-0 p-2 fs-5 fw-bold">Inventory Actions</h3>
          <NewCategoryModal refetchCategories={refetchCategories} />

          <Button variant="outline-primary" className="p-2" onClick={handleShowItemModal}>New Item</Button>
          <Modal size="lg" centered show={showItemModal} onHide={handleCloseItemModal}>
            <Modal.Header closeButton>
              <Modal.Title>New Item</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form id="addItemForm" onSubmit={handleSubmitItem}>
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
              <Button variant="secondary" onClick={handleCloseItemModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" form="addItemForm">
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Stack>
      </Card>

      <Accordion alwaysOpen className="pt-2">
        {categories.length === 0 ? (
          <Accordion.Item>
            <Accordion.Header>No inventory added</Accordion.Header>
          </Accordion.Item>
        ) : (
          categories.map((category) => (
            <Accordion.Item key={category.id} eventKey={category.id.toString()}>
              <Accordion.Header>{category.name}</Accordion.Header>
              <Accordion.Body>
                {category.items.length == 0 ? (
                  <div>No items added</div>
                ) : (
                  <Table striped bordered hover responsive className="m-0">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Stock Level</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, index) => (
                        <tr key={index}>
                          <StockIndicator quantity={item.quantity} minQuantity={item.minQuantity}/>
                          <td>{item.name}</td>
                          <td>{item.location}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price}</td>
                          <td>
                            <ViewModal item={item} />{" "}
                            <EditModal 
                              categories={categories}
                              item={item}
                              refetchCategories={refetchCategories}
                              resetMessages={resetMessages}
                            />{" "}
                            <DeleteModal
                              item={item}
                              refetchCategories={refetchCategories}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))
        )}
      </Accordion>
      
      <PageTabs />
    </Container>
  );
};

export default InventoryPage;
