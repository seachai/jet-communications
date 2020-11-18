import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import UserForms from "./UserForms";

const EntryPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  // Render Register if the user doesn't have the auth cookie

  // Else redirect the user directly to the App
  return (
    <div className='EntryPage'>
      <h1>EntryPage</h1>
      {isLoggedIn ? <Redirect to='/chatroom' /> : <UserForms />}
    </div>
  );
};

export default EntryPage;
