import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css'


class Indexpage extends Component {
    render() {

        return (
            <div className="container-fluid   colorwhite  backgroundcolor" >


                <div className="middle ">
                    <div className="textcenter ">
                        <h1 className='pt-5'>File Management System</h1>
                    </div>

                    <div className="btn-toolbar middlebutton" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mr-4" role="group" aria-label="First group">
                            <Link to='/fileupload'  > <button type="button" className="btn btn-primary btn-lg">Upload File</button> </Link>

                        </div>
                        <div className="btn-group mr-4" role="group" aria-label="Second group">
                            <Link to='/filedownload'  > <button type="button" className="btn btn-secondary btn-lg">Download File</button> </Link>

                        </div>

                    </div>

                </div>


            </div>
        )
    }
}
export default Indexpage;