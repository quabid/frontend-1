import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Card, Row, Col, Button } from 'react-bootstrap';
import { updateUserProfile } from '../actions/UserActions';

const UserProfile = ({ userDetail }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);

  const dispatch = useDispatch();

  // @ts-ignore
  const updatedUserProfile = useSelector(state => state.userUpdateProfile);
  const { userInfo } = updatedUserProfile;

  useEffect(() => {
    setFirstName(userDetail ? userDetail.fname : 'First Name');
    setLastName(userDetail ? userDetail.lname : 'Last Name');
    setEmail(userDetail ? userDetail.email : 'Email');
    setImage(userDetail ? (userDetail.image ? true : false) : false);
  }, [userDetail]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUserProfile({ fname: firstName, lname: lastName, email }));
    setFirstName(userInfo ? userInfo.fname : firstName);
    setLastName(userInfo ? userInfo.lname : lastName);
    setEmail(userInfo ? userInfo.email : email);
  };

  return (
    <Card style={{ background: 'transparent', fontSize: '2rem' }}>
      <Row>
        <Col md={4} xs={12}>
          <Col xs={12}>
            <Card.Title
              className="font-weight-bolder text-white text-center"
              style={{ background: 'transparent', fontSize: '2rem' }}
            >
              {firstName.substring(0, 1).toUpperCase() +
                firstName.substring(1) +
                ' ' +
                lastName.substring(0, 1).toUpperCase() +
                lastName.substring(1)}
            </Card.Title>
          </Col>
          <Col className="text-center my-4" xs={12}>
            {image ? (
              <Card.Img src={userDetail.image} alt={userDetail.email} />
            ) : (
              <i className="fas fa-user fa-5x fw"></i>
            )}
          </Col>
        </Col>
        <Col md={8} xs={12}>
          <Card.Body style={{ background: 'transparent' }}>
            <Form onSubmit={submitHandler} className="signin-form my-5">
              <Form.Group controlId="fname">
                <Form.Label className="font-weight-bolder">
                  First Name
                </Form.Label>
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
                <Form.Label className="font-weight-bolder">
                  Last Name
                </Form.Label>
                <Form.Control
                  className="text-white"
                  size="lg"
                  style={{ background: 'transparent', color: '#fff' }}
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="font-weight-bolder">Email</Form.Label>
                <Form.Control
                  className="text-white"
                  size="lg"
                  style={{ background: 'transparent', color: '#fff' }}
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button variant="outline-primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;
