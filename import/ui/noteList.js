import React from 'react'
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

import {Notes} from '../api/notes'
import NoteListHeader from './noteListHeader'
import NoteListItem from './noteListItem'

export const NoteList = (props) =>{
  return(
    <div>
      <NoteListHeader/>
      {props.notes.map((note)=>{
        return <NoteListItem key={note._id} note={note}/>
      })}
      NotesList {props.notes.length}
    </div>
  )
}

NoteList.PropTypes={
  notes:PropTypes.array
}

export default createContainer(()=>{
  Meteor.subscribe('notes');

  return{
    notes: Notes.find().fetch()
  }
},NoteList)
