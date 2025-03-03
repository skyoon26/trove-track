import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Stack, Button, Accordion, Row, Col, Table } from 'react-bootstrap';
import { getAllCategories } from '../services/categoryService';
import { getAllLogs } from '../services/inventoryLogService';
import './pages.css';
import PageTabs from '../components/PageTabs';
import SummaryCard from '../components/SummaryCard';

const HomePage = () => {

  const firstName = sessionStorage.getItem("firstName");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Manages category state, fetches category data from API, and updates UI
  const [categories, setCategories] = useState([]);
  const [logs, setLogs] = useState([]);
  
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLogs = async () => {
      try {
        const data = await getAllLogs();
        setLogs(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchCategories();
    fetchLogs();
  }, []);

  const totalCategories = categories.length;
    
  let totalItems = 0;
  categories.forEach(category => {
    totalItems += category.items?.length || 0;
  });

  const recentLogs = logs.sort((a, b) => b.id - a.id).slice(0, 3);

  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <Container className="main-container py-3">
      <Stack direction="horizontal" gap={3} className="m-0 p-3">
        <h2>Welcome, {firstName ? firstName : "Guest"}</h2>
        <p className="ms-auto">{today}</p>
      </Stack>
      
      <Card className="p-2 mt-3">
        <Stack direction="horizontal" gap={3}>
          <h3 className="m-0 p-2 fs-5 fw-bold">Dashboard Summary</h3>
          <Button variant="outline-primary" className="p-2 ms-auto" onClick={() => handleNavigate("/inventory")}>Add Inventory</Button>
        </Stack>    
      </Card>
      <Row className="g-2 pt-2">
        <Col xs={12} md={6} lg={6}>
          <SummaryCard title="Total Items" value={totalItems}/>
        </Col>
        <Col xs={12} md={6} lg={6}>
          <SummaryCard title="Total Categories" value={totalCategories} />
        </Col>
      </Row>
      
      <Card className="p-2 mt-4">
        <Stack direction="horizontal" gap={3}>
          <h3 className="m-0 p-2 fs-5 fw-bold">Low Stock Items</h3>
          <Button variant="outline-primary" className="p-2 ms-auto" onClick={() => handleNavigate("/activity")}>Update Inventory</Button>
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
      
      <Card className="p-2 mt-4">
        <Stack direction="horizontal" gap={3}>
          <h3 className="m-0 p-2 fs-5 fw-bold">Recent Activity</h3>
          <Button variant="outline-primary" className="p-2 ms-auto" onClick={() => handleNavigate("/activity")}>View All</Button>
        </Stack>
      </Card>
      <Accordion alwaysOpen className="pt-2">
        {recentLogs.length === 0 ? (
          <Accordion.Item>
            <Accordion.Header>No inventory logs added</Accordion.Header>
          </Accordion.Item>
        ) : (
          recentLogs.map(log => (
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
                      <td>{log.changeType}</td>
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

export default HomePage;