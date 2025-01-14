import { Container, Button, Row,  Col, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="p-4">
              <Card.Body>
                <h1 className="text-center">Welcome Back!</h1>
                <p className="text-center">Please enter login details below</p>
                <Form className="mb-4">
                  <Form.Group className="my-4" controlId="email">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                    />
                  </Form.Group>

                  <Form.Group className="my-4" controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign In
                  </Button>
                </Form>
                <p className="text-center">
                  Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SignInPage;