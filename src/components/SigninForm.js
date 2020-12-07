/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/UserActions';

const SigninForm = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // @ts-ignore
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    document.title = 'Sign In';
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail('');
    setPassword('');
  };

  return (
    <FormContainer>
      <h1 className='h1'>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} className='signin-form my-5'>
        <Form.Group controlId='email'>
          <Form.Label className='font-weight-bolder'>Email address</Form.Label>
          <Form.Control
            className='text-white'
            size='lg'
            style={{ background: 'transparent', color: '#fff' }}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label className='font-weight-bolder'>Password</Form.Label>
          <Form.Control
            className='text-white'
            size='lg'
            style={{ background: 'transparent' }}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </Form.Group>

        <Button variant='outline-primary' type='submit'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default SigninForm;
