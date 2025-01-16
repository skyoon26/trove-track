import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="p-4">
              <Card.Body>
                <h1 className="text-center">Let's Get Started!</h1>
                <p className="text-center">Please enter your details below</p>
                <Form className="mb-4">
                  <Form.Group className="my-4" controlId="firstName">
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Enter first name"
                          required
                          autoComplete='off'
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Enter last name"
                          required
                          autoComplete='off'
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="my-4" controlId="email">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                      autoComplete='off'
                    />
                  </Form.Group>
                  <Form.Group className="my-4" controlId="username">
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      required
                      autoComplete='off'
                    />
                  </Form.Group>
                  <Form.Group className="my-4" controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      required
                      autoComplete='off'
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" className="w-50">
                      Register
                    </Button>
                  </div>
                </Form>
                <p className="text-center">
                  Already registered? <Link to="/signin" className="text-decoration-none">Sign in</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterPage