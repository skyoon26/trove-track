import { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { deleteItem } from '../services/itemService';

const DeleteModal = ({ item, refetchCategories }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      setMessage("Item deleted successfully!");
      setTimeout(() => {
        setShow(false);
        setMessage("");
        refetchCategories();
      }, 1500);
    } catch (error) {
      setMessage("Oops! We couldn't delete the item. Please try again later.");
      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  }

  return (
    <>
      <Button variant="outline-danger" className="px-2 py-1" onClick={() => setShow(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
      </Button>
      <Modal
        size="med"
        show={show}
        centered
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-3">
            {message ? message : "Are you sure you want to delete this item?"}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleDeleteItem(item.id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;