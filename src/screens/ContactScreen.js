import React from 'react';

const ContactScreen = ({ match }) => {
  const id = match.params.id;
  return <h1 id={id}>Contact</h1>;
};

export default ContactScreen;
