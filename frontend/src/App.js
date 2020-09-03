import React from 'react'
import './App.css'
import FileUpload from './Component/FileUpload'
import FileDownload from './Component/FileDownload'
import Indexpage from './Component/Index'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <div>
        <Route path='/' exact component={Indexpage} />
        <Route path='/fileupload' exact component={FileUpload} />
        <Route path='/filedownload' exact component={FileDownload} />

      </div>
    </Router>
  )
}

export default App
