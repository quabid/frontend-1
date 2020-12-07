import React from 'react';

export default function NotFound() {
  document.title = 'Page Not Found';
  return (
    <div className='row mt-5'>
      <h1 className='display-5 text-center col-12'>
        <span className='text-danger'>404</span> Page Not Found
      </h1>
      <p className='lead text-center font-weight-bold col-12'>
        Sorry, that page does not exist!
      </p>
    </div>
  );
}
