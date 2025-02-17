import { useState, useEffect } from 'react';
import { Container, Stack, Card, Button, Accordion, Modal, InputGroup, Form, Table } from 'react-bootstrap';
import { createCategory, getAllCategories } from '../services/categoryService';
import PageTabs from '../components/PageTabs';

const InventoryPage = () => {
  const firstName = sessionStorage.getItem("firstName");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Manages state for success and error message upon form submission
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const resetMessages = () => {
    setError(null);
    setSuccess(false);
  };

  // Manages state and handlers for the "Add Category" button and modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
    setCategoryName("");
    resetMessages();
  };
  const handleShowCategoryModal = () => setShowCategoryModal(true);

  // Initializes state for category name
  const [categoryName, setCategoryName] = useState("");

  // Handles category addition
  const handleAddCategory = async (categoryName) => {
    setSuccess(false); // Resets success message state
    setError(null); // Resets error message state
    try {
      await createCategory(categoryName);
      setSuccess(true);
    } catch (error) {
      setError("Oops! We couldn't add the new category. Please try again later.");
      setSuccess(false);
    }
  };

  // Handles form submission for adding a new category
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    await handleAddCategory(categoryName);
  };

  // Closes modal after successful form submission
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        handleCloseCategoryModal();
      }, 1000);
    }
  }, [success]);

  // Manages category state, fetches category data from API, and updates UI
  const [categories, setCategories] = useState([]);
  
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      setError("Oops! We couldn't fetch the categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container className="main-container py-3">
      <Stack direction="horizontal" gap={3} className="m-0 p-3">
        <h2>{firstName ? firstName : "Guest's"}'s Inventory</h2>
        <p className="ms-auto">{today}</p>
      </Stack>

      <Card className="p-2 mt-3">
        <Stack direction="horizontal" gap={3}>
          <h3 className="m-0 p-2 fs-5 fw-bold">Inventory Actions</h3>
          <Button variant="outline-primary" className="p-2 ms-auto" onClick={handleShowCategoryModal}>New Category</Button>
          <Modal size="lg" centered show={showCategoryModal} onHide={handleCloseCategoryModal}>
            <Modal.Header closeButton>
              <Modal.Title>New Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form id="addCategoryForm" onSubmit={handleSubmitCategory}>
                <Form.Group className="mb-3" controlId="categoryName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Enter category name"
                    required
                    autoFocus
                    autoComplete="off"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Form.Group>
                {error && <div className='alert alert-danger'>{error}</div>}
                {success && <div className='alert alert-success'>New category added successfully!</div>}
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCategoryModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" form="addCategoryForm">
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          <Button variant="outline-primary" className="p-2">New Item</Button>
        </Stack>
      </Card>

      <Accordion alwaysOpen className="pt-2">
        {categories.length === 0 ? (
          <Accordion.Item>
            <Accordion.Header>No Inventory</Accordion.Header>
          </Accordion.Item>
        ) : (
          categories.map(category => (
            <Accordion.Item
              key={category.id}
              eventKey={category.id.toString()}
            >
              <Accordion.Header>{category.name}</Accordion.Header>
              <Accordion.Body>
                {category.items.length == 0 ? (
                  <div>No items added</div>
                ) : (
                  <Table striped bordered hover responsive>
                    <tbody>
                      {category.items.map((item, index) => (
                        <tr key={index}>
                          <td className="fw-bold">{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.location}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price}</td>
                          <td>
                            Action Here
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
  )
}

export default InventoryPage;