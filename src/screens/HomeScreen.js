import React, { useEffect } from 'react';

const HomeScreen = () => {
  useEffect(() => {
    document.title = 'Home';
  });

  return (
    <>
      <h1 className='h2 text-center'>
        {' '}
        Manage all of your contacts at one place
      </h1>

      <p
        className='p-0 m-0 font-weight-bolder text-white'
        style={{ fontSize: '1.5rem' }}
      >
        Business, personal or other contacts all managed with a central contacts
        managing app.
      </p>
    </>
  );
};

export default HomeScreen;
