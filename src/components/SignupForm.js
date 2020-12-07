import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/UserActions';

const SignupForm = ({ history }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  // @ts-ignore
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(
    function () {
      document.title = 'Sign Up';
      if (userInfo) {
        history.push('/contacts');
      }
    },
    [userInfo, history]
  );

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(fname, lname, email, password));
      history.push('/contacts');
    }
  };

  return (
    <>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="signup-form">
        <Form.Group controlId="fname">
          <Form.Label className="font-weight-bolder">First Name</Form.Label>
          <Form.Control
            onChange={e => setFname(e.target.value)}
            className="text-white"
            size="lg"
            style={{ background: 'transparent' }}
            type="text"
            value={fname}
            placeholder="Enter first name"
          />
          <Form.Text
            className="text-muted font-weight-bolder"
            style={{ fontSize: '1rem' }}
          ></Form.Text>
        </Form.Group>

        <Form.Group controlId="lname">
          <Form.Label className="font-weight-bolder">Last Name</Form.Label>
          <Form.Control
            onChange={e => setLname(e.target.value)}
            className="text-white"
            size="lg"
            style={{ background: 'transparent' }}
            type="text"
            value={lname}
            placeholder="Enter last name"
          />
          <Form.Text
            className="text-muted font-weight-bolder"
            style={{ fontSize: '1rem' }}
          ></Form.Text>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label className="font-weight-bolder">Email address</Form.Label>
          <Form.Control
            onChange={e => setEmail(e.target.value)}
            className="text-white"
            size="lg"
            style={{ background: 'transparent' }}
            type="email"
            value={email}
            placeholder="Enter email"
          />
          <Form.Text
            className="text-muted font-weight-bolder"
            style={{ fontSize: '1rem' }}
          >
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="pwd1">
          <Form.Label className="font-weight-bolder">Password</Form.Label>
          <Form.Control
            onChange={e => setPassword(e.target.value)}
            className="text-white"
            size="lg"
            style={{ background: 'transparent' }}
            type="password"
            value={password}
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group controlId="pwd2">
          <Form.Label className="font-weight-bolder">
            Confirm Password
          </Form.Label>
          <Form.Control
            onChange={e => setConfirmPassword(e.target.value)}
            className="text-white"
            size="lg"
            style={{ background: 'transparent' }}
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
