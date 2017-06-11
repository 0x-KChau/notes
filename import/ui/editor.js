import React from 'react'
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data'
import {Session} from 'meteor/session'
import PropTypes from 'prop-types'

import {Notes} from '../api/notes'

export class Editor extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:'',
      body:''
    }
  }

  handleTitleChange(e){
    const title = e.target.value
    this.setState({title})
    this.props.call('notes.update', this.props.note._id, {title})
  }

  handleBodyChange(e){
    const body = e.target.value
    this.setState({body})
    this.props.call('notes.update', this.props.note._id, {body})
  }

  onClickDeleteNote(){
    this.props.call('notes.remove',this.props.note._id)
    Session.set('selectedNoteId', undefined)
  }

  componentDidUpdate(prevProps, PrevState){
    const currentNoteId = this.props.note? this.props.note._id:undefined
    const prevNoteId = prevProps.note?prevProps.note._id:undefined

    if(currentNoteId && currentNoteId != prevNoteId){
      this.setState({
        title:this.props.note.title,
        body:this.props.note.body
      })
    }
  }

  render(){
    if(this.props.note){
      return(
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder="Title" onChange={this.handleTitleChange.bind(this)} />
          <textarea className="editor__body" value={this.state.body} placeholder="Write some notes here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button--secondary" onClick={this.onClickDeleteNote.bind(this)}>Delete Note</button>
          </div>
        </div>
      )
    }else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedNoteId?'Note is not found.':'Pick or create a note to get started.'}
          </p>
        </div>
      )
    }
  }
}

Editor.propType={
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired
}

export default createContainer(()=>{
    const selectedNoteId = Session.get('selectedNoteId')

    return{
      selectedNoteId,
      note: Notes.findOne(selectedNoteId),
      call: Meteor.call
    }
},Editor)
