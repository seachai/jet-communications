import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <div className='Navigation'>
    <Link to='/'>Go to Home</Link>
    <Link to='/admin'>Go to Admin</Link>
  </div>
);

export default Navigation;
