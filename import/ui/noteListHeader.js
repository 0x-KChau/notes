import React from 'react'
import {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {createContainer} from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

export class NoteListHeader extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }

  onClick(e){
    e.preventDefault()
    this.props.meteorCall('notes.insert', (err,res)=>{
      console.log(res);
      if(res) Session.set('selectedNoteId', res)
      if(err) throw err;
    })
  }

  render(){
    return(
      <div>
        <button onClick={this.onClick.bind(this)}>Create Note</button>

      </div>
    )
  }
}

NoteListHeader.PropTypes={
  meteorCall:PropTypes.func.isRequired,
  Session:PropTypes.object.isRequired
}

export default createContainer(()=>{
  return{
    meteorCall:Meteor.call,
    Session
  }
}, NoteListHeader)


// export const NoteListHeader = (props) =>{
//   return(
//     <div>
//       <button onClick={()=>{
//         props.meteorCall('notes.insert')
//       }}>Create Note</button>
//     </div>
//   )
// }
//
// NoteListHeader.propTypes={
//   meteorCall:PropTypes.func
// }
//
// export default createContainer(()=>{
//   return{
//     meteorCall : Meteor.call
//   }
// },NoteListHeader)
