import React from 'react';
import { Switch , Route  } from 'react-router-dom';

import New from './pages/new';
import Feed from './pages/feed';

function Routes(){
    return{
        <switch> 
            <Route path="/" exact component = {Feed}/>
            <Route path="/new" component = {New}/>
        </switch>
    };
}