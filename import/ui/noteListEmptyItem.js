import React from 'react'
import {Meteor} from 'meteor/meteor'

const NoteListEmptyItem = ()=>{
  return(
    <div>
      <h3>You have no notes</h3>
      <p>Create a note to get started</p>
    </div>
  )
}

export default NoteListEmptyItem
