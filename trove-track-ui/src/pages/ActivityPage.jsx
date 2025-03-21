import { useState, useEffect } from "react";
import { Container, Stack, Card, Button, Accordion, Table, Modal, Form, Row, Col } from 'react-bootstrap';
import { getAllCategories } from "../services/categoryService";
import { createLog, getAllLogs } from "../services/inventoryLogService";
import PageTabs from '../components/PageTabs';

const ActivityPage = () => {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);
  const [log, setLog] = useState({
    itemId: "",
    quantityChanged: "",
    changeType: "",
    reason: "",
  });

  const resetMessages = () => {
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedCategory("");
    setItems([]);
    resetMessages();
    setLog({
      itemId: "",
      quantityChanged: "",
      changeType: "",
      reason: "",
    });
  };

  const handleShow = () => setShow(true);
  
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      setError("Oops! We couldn't fetch the categories. Please try again.");
    }
  };

  const fetchLogs = async () => {
    try {
      const data = await getAllLogs();
      setLogs(data);
    } catch (error) {
      setError("Oops! We couldn't fetch the inventory logs. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchLogs();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const category = categories.find(category => category.id === parseInt(categoryId));
    setItems(category ? category.items : []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog((prevLog) => ({
      ...prevLog,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem('userId');

    const logWithUserId = {
      ...log,
      itemId: parseInt(log.itemId, 10),
      quantityChanged: parseInt(log.quantityChanged, 10), 
      changedByUserId: userId 
    };

    try {
      await createLog(logWithUserId);
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 1000);
      fetchLogs();
    } catch (error) {
      setError("Oops! We couldn't create the inventory log. Please try again later.");
      setSuccess(false);
    }
  };

  return (
    <Container className="main-container py-3">
      <Stack direction="horizontal" gap={3} className="m-0 p-3">
        <h2>Activity</h2>
        <p className="ms-auto">{today}</p>
      </Stack>

      <Card className="p-2 mt-3">
        <Stack direction="horizontal" gap={3}>
          <h3 className="m-0 p-2 fs-5 fw-bold">Inventory Log</h3>
          <Button variant="outline-primary" className="p-2 ms-auto" onClick={handleShow}>New Log</Button>     
          <Modal size="lg" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Inventory Log</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form id="inventoryLogForm" onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="itemCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      required
                    >
                      <option value="">Select...</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="itemName">
                    <Form.Label>Item</Form.Label>
                    <Form.Select
                      name="itemId"
                      disabled={!selectedCategory}
                      required
                      value={log.itemId}
                      onChange={handleChange}
                    >
                      {!selectedCategory ? (
                        <option value="">Select a category</option>
                      ) : items.length > 0 ? (
                        <>
                          <option value="">Select...</option>
                          {items.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option value="">No items available</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Row>
                
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="itemQuantityChange">
                    <Form.Label>Change Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      name="quantityChanged"
                      placeholder="Enter quantity"
                      required
                      value={log.quantityChanged}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="itemChangeType">
                    <Form.Label>Change Type</Form.Label>
                    <Form.Select
                      name="changeType"
                      required
                      value={log.changeType}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      <option value="RESTOCK">RESTOCK</option>
                      <option value="USAGE">USAGE</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="itemChangeReason">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="reason"
                    placeholder="Enter description"
                    value={log.reason}
                    onChange={handleChange}
                  />
                </Form.Group>
                {error && <div className='alert alert-danger'>{error}</div>}
                {success && <div className='alert alert-success'>New inventory log added successfully!</div>}
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" form="inventoryLogForm">
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Stack>
      </Card>
      
      <Accordion alwaysOpen className="pt-2">
        {logs.length === 0 ? (
          <Accordion.Item>
            <Accordion.Header>No inventory logs added</Accordion.Header>
          </Accordion.Item>
        ) : (
          logs.map(log => (
            <Accordion.Item
              key={log.id}
              eventKey={log.id.toString()}
            >
              <Accordion.Header>{log.id}</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Item Name</th>
                      <th>Quantity Changed</th>
                      <th>Change Type</th>
                      <th>Employee</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={log.id}>
                      <td>{log.changeDate}</td>
                      <td>{log.itemName}</td>
                      <td>{log.quantityChanged}</td>
                      <td
                        style={{color: log.changeType === "RESTOCK" ? 'green' : 'red'}}
                      >
                        {log.changeType}
                        </td>
                      <td>ID {log.changedByUserId}</td>
                      <td>{log.reason}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))
        )}
      </Accordion>

      <PageTabs />
    </Container>
  )
}

export default ActivityPage;