import React from 'react';

import PrivateHeader from './privateHeader';

export default () =>{
  return(
    <div>
        <PrivateHeader title="Dashboard"/>
        <div className="page-content">
          Dasboard page content
        </div>
    </div>
  )
}
