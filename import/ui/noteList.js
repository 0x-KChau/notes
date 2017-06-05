import React from 'react'
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

import {Notes} from '../api/notes'
import {NoteListHeader} from './noteListHeader'

export const NoteList = (props) =>{
  return(
    <div>
      <NoteListHeader/>
      NotesList {props.notes.length}
    </div>
  )
}

NoteList.PropTypes={
  notes:PropTypes.func
}

export default createContainer(()=>{
  Meteor.subscribe('notes');

  return{
    notes: Notes.find().fetch()
  }
},NoteList)
