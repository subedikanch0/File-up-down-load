import React, { Component } from 'react'

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/file.css'
import Swal from 'sweetalert2'


class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }
    onClickHandler = () => {
        console.log('hello')
        console.log(this.state.selectedFile)

        const data = new FormData()

        data.append('file', this.state.selectedFile)
        console.log(data)

        const dataforcheck = {
            fileName: this.state.selectedFile.name,
            extensionType: this.state.selectedFile.type,
            size: this.state.selectedFile.size
        }
        console.log(dataforcheck)

        axios.post("http://localhost:4000/fileinfo/checkbeforaddentry", dataforcheck)
            .then(res => { // then print response status
                console.log(res.data.status)


                axios.post("http://localhost:4000/fileinfo/upoadfile", data)
                    .then(res => { // then print response status
                        console.log(res)

                        axios.post("http://localhost:4000/fileinfo/addentryafterfileupload", dataforcheck)
                            .then(res => { // then print response status
                                console.log(res.data.status)

                                Swal.fire({
                                    text: res.data.status,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Okey!',
                                    icon: 'success'
                                }).then((result) => {
                                    if (result.value) {
                                        window.location.reload();
                                    }
                                })

                            })
                            .catch(e => {
                                const errorfrom = e.response.data
                                console.log(errorfrom)
                            });


                    })

            })
            .catch(e => {
                const errorfrom = e.response.data
                console.log(errorfrom)
                Swal.fire({
                    text: errorfrom,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okey!',
                    icon: 'warning'
                }).then((result) => {
                    if (result.value) {
                        window.location.reload();
                    }
                })
            });

    }
    render() {

        return (
            <div className="colorwhite backgroundcolor" >
                <div className="textcenter">
                    <label className='margintop65 uploadfilelabel'>Upload  File </label>
                </div>
                <div className='container'>
                    <div className="row justify-content-md-center">
                        <form method="post" action="#" id="#">
                            <div className="form-group files">
                                <input type="file" name="file" onChange={this.onChangeHandler} />
                                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default FileUpload;