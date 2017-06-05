import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

//stateless functional component
export const PrivateHeader = (props)=>{
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button--header" onClick={()=>props.handleLogout()}>Logout</button>
      </div>
    </div>
  )
}

PrivateHeader.proptypes={
  title: PropTypes.string,
  handleLogout: PropTypes.func
}

export default createContainer(()=>{
  return{
    handleLogout: ()=>Accounts.logout()
  };
}, PrivateHeader);
