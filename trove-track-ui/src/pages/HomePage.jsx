import { Container, Card, Stack, Button, Accordion, Row, Col, Tab, Tabs } from 'react-bootstrap';
import './pages.css';
import PageTabs from '../components/PageTabs';

const HomePage = () => {

  const firstName = sessionStorage.getItem("firstName");

  const summaryData = [
    { title: "Total Items", value: "320" },
    { title: "Low Stock Items", value: "12" },
    { title: "Total Categories", value: "8" },
    { title: "Recent Orders", value: "5" }
  ];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container className="main-container py-3">
      <Stack direction="horizontal" gap={3} className="m-0 p-3">
        <h2>Welcome, {firstName ? firstName : "Guest"}</h2>
        <p className="ms-auto">{today}</p>
      </Stack>
      
      <Card className="p-2 mt-3">
        <Stack direction="horizontal" gap={3}>
          <h3 className="m-0 p-2 fs-5 fw-bold">Dashboard Summary</h3>
          <Button variant="outline-primary" className="p-2 ms-auto">Add Inventory</Button>
        </Stack>    
      </Card>
      <Row className="g-2 pt-2">
        {summaryData.map((item, index) => (
          <Col xs={12} md={6} lg={6} key={index}>
            <Card>
              <Card.Body className="text-center">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="fs-5">{item.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Card className="p-2 mt-4">
        <Stack direction="horizontal" gap={3}>
          <h3 className="m-0 p-2 fs-5 fw-bold">Low Stock Items</h3>
          <Button variant="outline-primary" className="p-2 ms-auto">Order Item</Button>
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
          <Button variant="outline-primary" className="p-2 ms-auto">View History</Button>
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
      </Accordion>

      <PageTabs />
    </Container>
  )
}

export default HomePage;