import React from 'react'
import moment from 'moment'
import {Session} from 'meteor/session'
import {createContainer} from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

const NoteListItem = (props)=>{
  return(
    <div onClick={()=>{
      props.Session.set('selectedNoteId', props.note._id)

    }}>
      <h5>{props.note.title || "Untitled Note"}</h5>
      <p>{moment(props.note.updatedAt).format('M/DD/YY')}</p>
    </div>
  )
}

NoteListItem.PropTypes={
  note:PropTypes.object,
  Session:PropTypes.object
}

export default createContainer(()=>{
  return{
    Session
  }
},NoteListItem)
