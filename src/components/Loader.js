import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      className="m-auto text-white"
      animation="border"
      role="status"
      style={{ width: '100px', height: '100px', display: 'block' }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
