import { Container, Stack, Card, Button, Accordion, Table } from 'react-bootstrap';
import PageTabs from '../components/PageTabs';

const OrderPage = () => {

  const firstName = sessionStorage.getItem("firstName");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container className="main-container py-3 m-5">
      <Stack direction="horizontal" gap={3} className="m-2">
        <h2 className="p-2">{firstName ? firstName : "Guest's"}'s Orders</h2>
        <p className="p-2 ms-auto">{today}</p>
      </Stack>

      <div>
        <Card className="px-2 mt-4">
          <Stack direction="horizontal" gap={3}>
            <h3 className="p-2">Order History</h3>
            <Button variant="outline-primary" className="p-2 ms-auto">New Order</Button>
          </Stack>
        </Card>
        <Accordion alwaysOpen className="pt-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Order #1
            </Accordion.Header>
            <Accordion.Body>
              <Table striped>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>02/13/2025</td>
                    <td>Matcha</td>
                    <td>5</td>
                    <td>$75.00</td>
                  </tr>
                  <tr>
                    <td>02/13/2025</td>
                    <td>Black Tea</td>
                    <td>3</td>
                    <td>$30.00</td>
                  </tr>
                </tbody>
                <p className="px-2 pt-3 fw-bold">Total: $105.00</p>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Order #2</Accordion.Header>
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
            <Accordion.Header>Order #3</Accordion.Header>
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

export default OrderPage;