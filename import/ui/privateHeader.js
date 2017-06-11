import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {Session} from 'meteor/session'
import {createContainer} from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

//stateless functional component
export const PrivateHeader = (props)=>{
  const navImageSrc = props.isNavOpen?'/images/x.svg':"/images/bars.svg"

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" onClick={()=>props.handleNavbar()} src={navImageSrc}/>
        <h1 className="header__title">{props.title}</h1>
        <button className="button--header" onClick={()=>props.handleLogout()}>Logout</button>
      </div>
    </div>
  )
}

PrivateHeader.proptypes={
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleNavbar: PropTypes.func.isRequired,
  isNavOpen:PropTypes.bool.isRequired
}

export default createContainer(()=>{
  return{
    handleLogout: ()=>Accounts.logout(),
    handleNavbar: ()=>Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen:Session.get('isNavOpen')
  };
}, PrivateHeader);
