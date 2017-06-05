import React from 'react'
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

export class NoteListHeader extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }

  onClick(e){
    this.props.meteorCall('notes.insert', (err)=>{
      if(err) throw err;
    })
  }

  render(){
    return(
      <div>
        <button onClick={this.onClick.binds(this)}>Create Note</button>

      </div>
    )
  }
}

NoteListHeader.propTypes={
  meteorCall:PropTypes.func
}

export default createContainer(()=>{
  return{
    meteorCall:Meteor.call
  }
}, NoteListHeader)
