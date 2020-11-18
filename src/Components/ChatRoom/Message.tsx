import React from 'react';

const Message = ({name, message}) => (
  <li>
    <strong>{name}</strong>: {message}
  </li>
);

export default Message;