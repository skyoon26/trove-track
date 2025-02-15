import { useState, useEffect } from 'react';
import { Container, Stack, Card, Button, Accordion, Modal, InputGroup, Form } from 'react-bootstrap';
import { createCategory } from '../services/categoryService';
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

  return (
    <Container className="main-container py-3">
      <Stack direction="horizontal" gap={3} className="m-0 p-3">
        <h2>{firstName ? firstName : "Guest's"}'s Inventory</h2>
        <p className="ms-auto">{today}</p>
      </Stack>

      <div>
        <Card className="p-2 mt-3">
          <Stack direction="horizontal" gap={3}>
            <h3 className="m-0 p-2 fs-5 fw-bold">Category Name</h3>
            <Button variant="outline-primary" className="p-2 ms-auto" onClick={handleShowCategoryModal}>Add Category</Button>
            <Modal size="lg" centered show={showCategoryModal} onHide={handleCloseCategoryModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
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

            <Button variant="outline-primary" className="p-2">Add Item</Button>
          </Stack>
        </Card>
        <Accordion alwaysOpen className="pt-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Accordion Item #3</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <PageTabs />
    </Container>
  )
}

export default InventoryPage;