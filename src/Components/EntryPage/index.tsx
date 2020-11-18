import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import UserForms from "./UserForms";

const EntryPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  // Render Register if the user doesn't have the auth cookie

  // Else redirect the user directly to the App
  return (
    <div className='EntryPage'>
      {isLoggedIn ? <Redirect to='/main' /> : <UserForms />}
    </div>
  );
};

export default EntryPage;
