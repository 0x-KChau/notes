import {Meteor} from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import {mount} from 'enzyme'

import {Editor} from './editor'
import {notes} from '../fixtures/fixtures'

if(Meteor.isClient){
  describe('Editor', function(){
    let call

    beforeEach(function(){
      call = expect.createSpy()
    })

    it('should render pick note message', function(){
      const wrapper = mount(<Editor call={call}/>)
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.')
    })

    it('should render not found message', function(){
      const wrapper = mount(<Editor call={call} selectedNoteId={notes[0]._id}/>)
      expect(wrapper.find('p').text()).toBe('Note is not found.')
    })

    it('should remove the note', function(){
      const wrapper = mount(<Editor call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>)
      wrapper.find('button').simulate('click')
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id)
    })

    it('should update the note body on textarea change', function(){
      const body = 'this is body'
      const wrapper = mount(<Editor call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>)

      wrapper.find('textarea').simulate('change', {
        target:{
          value: body
        }
      })

      expect(wrapper.state('body')).toBe(body)
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body})
    })

    it('should update the note title on text change', function(){
      const title = 'this is title'
      const wrapper = mount(<Editor call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>)

      wrapper.find('input').simulate('change', {
        target:{
          value: title
        }
      })

      expect(wrapper.state('title')).toBe(title)
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title})
    })

    it('should set state for new note', function(){
      const wrapper = mount(<Editor call={call} />)

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      })

      expect(wrapper.state('title')).toBe(notes[0].title)
      expect(wrapper.state('body')).toBe(notes[0].body)
    })

    it('should not set state if note prop not provided', function(){
      const wrapper = mount(<Editor call={call}/>)

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
      })

      expect(wrapper.state('title')).toBe('')
      expect(wrapper.state('body')).toBe('')
    })

  })
}
