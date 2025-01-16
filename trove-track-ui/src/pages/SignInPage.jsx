import React, { useState } from 'react';
import { Container, Button, Row,  Col, Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="p-4">
              <Card.Body>
                <h1 className="text-center">Welcome Back!</h1>
                <p className="text-center">Please enter login details below</p>
                {error && <p className="text-danger text-center">{error}</p>}
                <Form className="mb-4" onSubmit={handleSubmit}>
                  <Form.Group className="my-4" controlId="username">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="my-4" controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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