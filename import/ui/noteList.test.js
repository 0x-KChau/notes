import {Meteor} from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import {mount} from 'enzyme'

import {NoteList} from './noteList'

const notes=[
  {
    _id: 'noteId1',
    title: 'Test Title',
    body: '',
    updatedAt: 0,
    userId: 'userId1'
  },
  {
    _id: 'noteId2',
    title: '',
    body: 'body is here',
    updatedAt: 0,
    userId: 'userId2'
  }
]

if(Meteor.isClient){
  describe('NoteList', function(){

    it('should render notelistitem for each note', function(){
      const wrapper = mount(<NoteList note={notes}/>)

      expect(wrapper.find('NoteListItem').length).toBe(2)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0)
    })

    it('should render NoteListEmptyItem if zero notes', function(){
      const wrapper = mount(<NoteList note={[]}/>)

      expect(wrapper.find('NoteListItem').length).toBe(0)
      expect(wrapper).find('NoteListEmptyItem').length.toBe(1)
    })
  })
}
