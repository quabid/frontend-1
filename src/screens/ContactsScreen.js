import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ContactsAccordion from '../components/ContactsAccordion';
import { listContacts } from '../actions/ContactsActions_';

const ContactsScreen = () => {
  const [updates, setUpdates] = useState(false);

  const dispatch = useDispatch();

  // @ts-ignore
  const contactsList = useSelector((state) => state.contactsList);
  const { loading, error, contacts } = contactsList;

  useEffect(() => {
    dispatch(listContacts());
  }, [dispatch]);

  const handleContactsUpdate = (contacts) => {
    updates
      ? console.log(`Updating contacts:  ${JSON.stringify(contacts)}`)
      : console.log(`\n\n\t\t\n\n`);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container fluid>
      <Row>
        <Col className='v-scroll' style={{ height: '77vh' }} xs={12}>
          <ContactsAccordion contacts={contacts} />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactsScreen;
