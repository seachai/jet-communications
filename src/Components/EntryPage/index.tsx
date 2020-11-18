import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import UserForms from "./UserForms";

const EntryPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className='EntryPage'>
      {isLoggedIn ? <Redirect to='/chatroom' /> : <UserForms />}
    </div>
  );
};

export default EntryPage;
