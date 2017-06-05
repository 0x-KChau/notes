import {Meteor} from 'meteor/meteor'
import expect from 'expect'

import {validateNewUser} from './users'

if(Meteor.isServer){
  describe('users', function(){
    it('should allow valid email address',function(){
      const testUser = {
        emails:[
          {address:'Test@example.com'}
        ]
      }
      const res = validateNewUser(testUser)

      expect(res).toBe(true);
    })

    it('should reject invalid email', function(){
      const testUser={
        emails:[
          {address:'testtests'}
        ]
      }

      expect(()=>{
        validateNewUser(testUser);
      }).toThrow();
    })
  })

}

// const add = (a,b) => {
//   if (typeof b !== 'number') return a + a;
//   else return a+b;
// }
//
// const square = (a)=>{
//   return a*a;
// }
//
// describe('add', function(){
//   it('should add two number', function(){
//     const res = add(3,4)
//     // if(res!==7) throw new Error('Sum was not equal to expected value')
//     expect(res).toBe(20);
//   });
//
//   it('should double a single number' , function(){
//     const res = add(33);
//     // if(res!==88) throw new Error('Number was not doubled')
//     expect(res).toBe(66);
//   })
//
// })
//
// describe('square', function(){
//   it('should square a number', function(){
//     const res = square(11);
//     expect(res).toBe(121);
//   })
// })
