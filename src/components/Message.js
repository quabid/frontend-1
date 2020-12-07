import React from 'react';

const Message = ({ variant, children }) => {
  return (
    <div
      className={'text-' + variant + ' font-weight-bolder text-center'}
      style={{ fontSize: '2.7rem' }}
    >
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
