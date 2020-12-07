/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/UserActions';

export const RegisterLink = () => (
  <Link className="link text-white mx-3" to={'/register'}>
    New User
  </Link>
);

export const HelpLink = () => (
  <Link className="link text-white m-auto" to={'/register'}>
    Need help?
  </Link>
);

const SigninScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // @ts-ignore
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    document.title = 'Sign In';
    if (userInfo) {
      history.push('/contacts');
    }
  }, [history, userInfo]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
    history.push('/contacts');
  };

  return (
    <FormContainer>
      <h1 className="h1">Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} className="signin-form my-5">
        <Form.Group controlId="email">
          <Form.Label className="font-weight-bolder">Email address</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent', color: '#fff' }}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <Form.Text
            className="text-muted font-weight-bolder"
            style={{ fontSize: '1rem' }}
          ></Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="font-weight-bolder">Password</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent' }}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </Form>

      <Row className="py-3 font-weight-bold justify-content-center">
        <Col>
          <RegisterLink />

          <HelpLink />
        </Col>
      </Row>
    </FormContainer>
  );
};
export default withRouter(SigninScreen);
