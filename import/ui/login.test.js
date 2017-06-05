import {Meteor} from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import ReactTestUtils from 'react-dom/test-utils'
import {mount} from 'enzyme'

import {Login} from './login'

if(Meteor.isClient){
  describe('Login', function(){

    it('should show err message', function(){
      const error = 'err msg'
      const wrapper = mount(<Login loginWithPassword={()=>{}}/>)

      wrapper.setState({error})
      const err = wrapper.find('p').text()
      expect(err).toBe(error)

      wrapper.setState({error:""})
      const errr = wrapper.find('p').length
      expect(errr).toBe(0)
    })

    it('should call loginWithPassword with the form data', function(){
      const email = 'test@test.com'
      const password = '123'
      const spy = expect.createSpy()
      const wrapper = mount(<Login loginWithPassword={spy}/>)

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({email})
      expect(spy.calls[0].argunments[1]).toBe(password)
    })

    it('should call loginWithPassword callback errors', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>)

      wrapper.find('form').simulate('submit')

      spy.calls[0].argunments[2]({})
      expect(wrapper).state('error').toNotBe('')

      spy.calls[0].argunments[2]()
      expect(wrapper).state('error').toNotBe('')
    })
  })
}
