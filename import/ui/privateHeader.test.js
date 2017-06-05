import {Meteor} from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import {mount} from 'enzyme'

import {PrivateHeader} from './privateHeader'

if(Meteor.isClient){
  describe('PrivateHeader', function(){
    it('should set button text to logout', function(){
      const wrapper = mount(<PrivateHeader title="Test Title"/>)
      const buttonText = wrapper.find('button').text()

      expect(buttonText).toBe('Logout')
    });

    it('should use title prop as h1 text', function(){
      const title = 'Test title here'
      const wrapper = mount(<PrivateHeader title={title}/>)
      const h1Title = wrapper.find('h1').text()

      expect(h1Title).toBe(title)
    })

    it('should call handleLogout function', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title='title' handleLogout={spy}/>)

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    })
  })
}
