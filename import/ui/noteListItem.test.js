import React from 'react'
import {Meteor} from 'meteor/meteor'
import expect from 'expect'
import {mount} from 'enzyme'

import NoteListItem from './noteListItem'

if (Meteor.isClient){
  describe('NoteListItem',function(){

    it('should render title and timestamp', function(){
      const title = 'My Title'
      const updatedAt = 1496846952631
      const wrapper = mount(<NoteListItem note={{title,updatedAt}}/>)

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('6/07/17')
    })

    it('should set default title if no title set', function(){
      const updatedAt = 1496846952631
      const wrapper = mount(<NoteListItem note={{updatedAt}}/>)

      expect(wrapper.find('h5').text()).toBe("Untitled Note");
      expect(wrapper.find('p').text()).toBe('6/07/17')
    })
  })
}
