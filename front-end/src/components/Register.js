import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import '../css/Register.css';
import { useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [password_reset, setPassReset] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== password_reset) {
      setError("Password confirmation failed.");
      return;
    }
    const user = { username: username, password: password, firstName: first_name, lastName: last_name, email: email };
    fetch('http://localhost:8001/register/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    .then(res => {
      if(res.status === 200 ){
        history.push('/login');
      }
      else if (res.status === 400){
        console.log('400 Bad Request Error');
        setError("Please make sure you have filled in all required fields.");
      }
      else {
        console.log('500 Internal Server Error');
        history.push('/error-500');
      }
    });
    }

  return (
    <div className="register">
      <div className="register-form">
      <Form  onSubmit={handleSubmit}>
        <h3><b> Sign Up. It's free! </b></h3>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="label"
              required
              placeholder="Enter first name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="label"
              required
              placeholder="Enter last name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
          />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="label"
              required
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsename(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              className="label"
              type="email" required
              placeholder="example: user@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="label"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control className="label"
              type="password"
              required
              value={password_reset}
              onChange={(e) => setPassReset(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="outline-primary" className="btn-1" type="submit">
          Sign Up
        </Button>
      </Form>
      </div>
      {error && <p className="error"> {error} </p>}
    </div>
  );
}

export default Register;
