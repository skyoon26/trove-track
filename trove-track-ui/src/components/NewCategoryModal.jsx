import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createCategory } from "../services/categoryService";

const NewCategoryModal = ({ refetchCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const resetMessages = () => {
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    setShow(false);
    setCategoryName("");
    resetMessages();
  };

  const handleShow = () => setShow(true);

  const handleAddCategory = async (categoryName) => {
    resetMessages();
    try {
      await createCategory(categoryName);
      setSuccess(true);
      await refetchCategories();
    } catch (error) {
      setError(
        "Oops! We couldn't add the new category. Please try again later."
      );
      setSuccess(false);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    await handleAddCategory(categoryName);
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
      <Button
        variant="outline-primary"
        className="p-2 ms-auto"
        onClick={handleShow}
      >
        New Category
      </Button>
      <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="newCategoryForm" onSubmit={handleSubmitCategory}>
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
            {error && <div className="alert alert-danger">{error}</div>}
            {success && (
              <div className="alert alert-success">
                New category added successfully!
              </div>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="newCategoryForm">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewCategoryModal;