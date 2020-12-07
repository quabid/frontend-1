import React from 'react';
import { Button } from 'react-bootstrap';

const CustomButton = ({ look, clickHandler, caption, layout }) => {
  return (
    <Button className={layout} onClick={clickHandler} variant={look}>
      {caption}
    </Button>
  );
};

export default CustomButton;
