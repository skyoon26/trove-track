import React, { useState } from 'react';
import { Container, Button, Row,  Col, Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const SignInPage = ({ handleLogin }) => {
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
      if (data.token) {
        localStorage.setItem('token', data.token);
        handleLogin();
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
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
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="my-4" controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
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