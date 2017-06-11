import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker'
import createHistory from 'history/createBrowserHistory'
import {authenticatedFunc} from '../import/routes/routes';

const history = createHistory();

Tracker.autorun(()=>{
  const selectedNoteId = Session.get('selectedNoteId')
  Session.set('isNavOpen', false)

  if(selectedNoteId){
    history.replace(`/dashboard/${selectedNoteId}`)
  }
})

Tracker.autorun(()=>{
  const isNavOpen = Session.get('isNavOpen')

  document.body.classList.toggle('is-nav-open', isNavOpen)
})

Meteor.startup(()=>{
  Session.set('selectedNoteId', undefined)
  Session.set('isNavOpen', false)
  const isAuthenticated = !!Meteor.userId();
  authenticatedFunc(isAuthenticated, history)
})
