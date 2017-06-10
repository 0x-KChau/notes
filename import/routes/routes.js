import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker'
import {Session} from 'meteor/session'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Signup from '../ui/signup'
import Login from '../ui/login'
import Dashboard from '../ui/dashboard'
import NotFound from '../ui/notFound'


const unauthenticatedPage = ['/','/signup','/login'];
const authenticatedPage = ['/dashboard'];

const renderDashboard=({match})=>{
  if(Meteor.userId()){
    Session.set('selectedNoteId', match.params.id);
    console.log(match);
    return <Dashboard/>
  }else{
    console.log('login');
    Session.set('selectedNoteId',undefined)
    return <Login/>
  }
}

export const authenticatedFunc = (isAuthenticated, history) =>{
  Tracker.autorun(()=>{

    const routes = (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={()=>(Meteor.userId()?<Redirect to={"/dashboard"}/>:<Login/>)}/>
              <Route path="/login" render={()=>(Meteor.userId()?<Redirect to={"/dashboard"}/>:<Login/>)}/>
              <Route path="/signup" render={()=>(Meteor.userId()?<Redirect to={"/dashboard"}/>:<Signup/>)}/>
              <Route exact path="/dashboard" render={()=>(Meteor.userId()?<Dashboard/>:<Redirect to={"/login"}/>)}/>
              <Route path="/dashboard/:id" component={renderDashboard}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
      )

    const isUnauthenticatedPage = unauthenticatedPage.includes(location.pathname);
    const isAuthenticatedPage = authenticatedPage.includes(location.pathname);

    if(isUnauthenticatedPage && isAuthenticated){
      history.push('/dashboard')
    }else if(isAuthenticatedPage && !isAuthenticated){
      history.push('/')
    }
    console.log('isAuthenticated',isAuthenticated, location.pathname);


    Meteor.startup(()=>{
      ReactDOM.render(routes, document.getElementById('app'))
    })

  })

}
