import { Container, Stack, Card, Accordion, Table } from 'react-bootstrap';
import PageTabs from '../components/PageTabs';
import EditModal from '../components/EditModal';
import StockIndicator from '../components/StockIndicator';
import ViewModal from '../components/ViewModal';
import DeleteModal from '../components/DeleteModal';
import useCategories from '../hooks/useCategories';
import NewCategoryModal from '../components/NewCategoryModal';
import NewItemModal from '../components/NewItemModal';

const InventoryPage = () => {
  const { categories, refetchCategories } = useCategories();

  const firstName = sessionStorage.getItem("firstName");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <NewItemModal
            categories={categories}
            refetchCategories={refetchCategories} 
          />
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
