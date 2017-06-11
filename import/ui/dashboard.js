import React from 'react';

import PrivateHeader from './privateHeader';
import NoteList from './noteList'
import Editor from './editor'

export default () =>{
  return(
    <div className="container">
        <PrivateHeader title="Note"/>
        <div className="page-content">
          <div className="page-content__sideBar">
            <NoteList/>
          </div>
          <div className="page-content__main">
            <Editor/>
          </div>
        </div>
    </div>
  )
}
