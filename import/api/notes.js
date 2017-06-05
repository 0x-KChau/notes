import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'

import moment from 'moment'
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes')

if(Meteor.isServer){
  Meteor.publish('notes', function(){
    return Notes.find({userId:this.userId})
  })
}

Meteor.methods({
  'notes.insert'(){
    if(!this.userId){
      throw new Meteor.Error('not-authenticated')
    }
    return Notes.insert({
      title:'',
      body:'',
      userId: this.userId,
      updatedAt: moment().valueOf()
    })
  },

  'notes.remove'(_id){
    if(!this.userId){
      throw new Meteor.Error('not-authenticated')
    }
    try{
        new SimpleSchema({
            _id:{
              type:String,
              min:1
            }
          }).validate({_id})
    }catch(e){
        console.log('e',e,e.message);
        throw new Meteor.Error(400, e.message)
    }

    Notes.remove({_id, userId:this.userId});
  },
  'notes.update'(_id, updates){
    if(!this.userId){
      throw new Meteor.Error('not-authenticated')
    }

    try{
        new SimpleSchema({
            _id:{
              type:String,
              min:1
            },
            title:{
              type:String,
              optional:true
            },
            body:{
              type:String,
              optional:true
            }
          }).validate({_id, ...updates})
    }catch(e){
        console.log('e',e,e.message);
        throw new Meteor.Error(400, e.message)
    }

    Notes.update({_id, userId:this.userId },{$set:{updatedAt: moment().valueOf(), ...updates}})

  }
})
