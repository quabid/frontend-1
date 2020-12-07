import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Card, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createContact } from '../actions/ContactsActions';

const NewContactScreen = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');

  const dispatch = useDispatch();

  // @ts-ignore
  const createContactObject = useSelector(state => state.createContactObject);
  const { loading, error } = createContactObject;

  const submitHandler = function (e) {
    e.preventDefault();
    dispatch(
      createContact({
        fname: firstName,
        lname: lastName,
        nname: nickName ? nickName : '',
        email: email ? email : '',
        phone,
        street,
        city,
        zipcode,
      })
    );

    history.push('/contacts');
  };

  useEffect(function () {
    document.title = 'Add Contact';
  });

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Card style={{ background: 'transparent', fontSize: '2rem' }}>
      <Form
        onSubmit={submitHandler}
        className="signin-form mx-0 my-0 px-0 px-3"
      >
        <Form.Group controlId="fname">
          <Form.Label className="font-weight-bolder">First Name</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent', color: '#fff' }}
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lname">
          <Form.Label className="font-weight-bolder">Last Name</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent', color: '#fff' }}
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="nname">
          <Form.Label className="font-weight-bolder">Nick Name</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent', color: '#fff' }}
            type="text"
            value={nickName}
            onChange={e => setNickName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label className="font-weight-bolder">Email</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent', color: '#fff' }}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label className="font-weight-bolder">Phone</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent', color: '#fff' }}
            type="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="street">
          <Form.Label className="font-weight-bolder">Street</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent', color: '#fff' }}
            type="text"
            value={street}
            onChange={e => setStreet(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label className="font-weight-bolder">City</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent', color: '#fff' }}
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="zipcode">
          <Form.Label className="font-weight-bolder">Zipcode</Form.Label>
          <Form.Control
            className="text-white"
            size="lg"
            style={{ background: 'transparent', color: '#fff' }}
            type="number"
            value={zipcode}
            onChange={e => setZipcode(e.target.value)}
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default withRouter(NewContactScreen);
