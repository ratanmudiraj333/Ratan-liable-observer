import React from 'react';
import {HashRouter, BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import ReactDOM from 'react-dom';
import Access from './Access.js';
import Home from './home.js';
import Homeuser from './homeuser.js';

function Accesspage()
{
    return(
        <HashRouter>
            <Routes>
<Route path = "/" element = {<Access />} />
<Route path = "admin" element = {<Home />} />
<Route path = "observer" element = {<Homeuser />} />
            </Routes>
        </HashRouter>
    )
}

ReactDOM.render(<div>
  <Accesspage />
  </div>
  ,document.getElementById("root"));

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
<Access />
</div>
);*/

