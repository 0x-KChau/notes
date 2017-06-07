import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker'
import createHistory from 'history/createBrowserHistory'
import {authenticatedFunc} from '../import/routes/routes';

const history = createHistory();

Tracker.autorun(()=>{
  const selectedNoteId = Session.get('selectedNoteId')

  if(selectedNoteId){
    history.replace(`/dashboard/${selectedNoteId}`)
  }
})

Meteor.startup(()=>{
  Session.set('selectedNoteId', undefined)
  const isAuthenticated = !!Meteor.userId();
  authenticatedFunc(isAuthenticated, history)
})
