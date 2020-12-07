import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import UserProfile from '../components/UserProfile';
import { Row, Col } from 'react-bootstrap';
import { SigninLink } from './RegisterScreen';
import { getUserDetails } from '../actions/UserActions';

const ErrorMessage = ({ children }) => {
  return (
    <Row justify-content-center>
      <Col xs={12}>
        <div
          className="text-danger text-center font-weight-boller"
          style={{
            fontSize: '2.9rem',
            borderRadius: '10px',
          }}
        >
          {children}
        </div>
      </Col>
    </Row>
  );
};

const ProfileScreen = ({ history, location }) => {
  const [errMsg, setErrMsg] = useState(false);
  const dispatch = useDispatch();

  // @ts-ignore
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, userDetail } = userDetails;

  useEffect(() => {
    const id = window.localStorage.getItem('userInfo')
      ? JSON.parse(window.localStorage.getItem('userInfo'))._id
      : null;

    if (null !== id) {
      dispatch(getUserDetails(id));
    } else {
      setErrMsg(true);
    }
  }, [dispatch]);

  return errMsg ? (
    <ErrorMessage>Not Authorized</ErrorMessage>
  ) : loading ? (
    <Loader />
  ) : error ? (
    <div className="bg-transparent  mx-4 text-center">
      <h2 className="text-center text-danger">{error}</h2>
      <Row className="lead">
        <SigninLink />
      </Row>
    </div>
  ) : (
    <UserProfile userDetail={userDetail} />
  );
};

export default ProfileScreen;
