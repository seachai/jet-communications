import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext} from '../../AuthProvider'

import UserForms from './UserForms';

const EntryPage = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <div className='EntryPage'>
      <h1>EntryPage</h1>
      { isLoggedIn ? <Redirect to='/main' /> : <UserForms /> }
    </div>
  )
}

export default EntryPage