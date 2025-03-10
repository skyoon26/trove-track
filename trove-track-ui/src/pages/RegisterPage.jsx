import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');  // Reset previous error
    setSuccessMessage('');  // Reset previous success

    const result = await register(formData);

    if (result === 'User registered successfully!') {
      setSuccessMessage(result);
    } else {
      setErrorMessage(result);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="p-4">
              <Card.Body>
                <h1 className="text-center">Let's Get Started!</h1>
                <p className="text-center">Please enter your details below</p>
                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                {successMessage && <p className="text-success text-center">{successMessage}</p>}
                <Form className="mb-4" onSubmit={handleSubmit}>
                    <Row className="my-4" >
                      <Col>
                        <Form.Group controlId="firstName">
                          <Form.Control
                            type="text"
                            name="firstName" 
                            placeholder="Enter first name"
                            autoComplete='off'
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="lastName">
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Enter last name"
                            autoComplete='off'
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      autoComplete='off'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="my-4" controlId="username">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      autoComplete='off'
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="my-4" controlId="password">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      autoComplete='off'
                      value={formData.password}
                      onChange={handleChange}
                      required
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

export default RegisterPage;