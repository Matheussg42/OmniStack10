import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Dev from './pages/Dev';
import Company from './pages/Company';
import Jobs from './pages/Jobs';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Dev}/>
            <Route path="/dev" exact component={Dev}/>
            <Route path="/company" exact component={Company}/>
            <Route path="/jobs/:id" exact component={Jobs}/>
        </BrowserRouter>
    );
}