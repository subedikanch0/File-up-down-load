import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/download.css'
import download from 'js-file-download';


class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadDate: [],
            alldayData: [],
            fileuploaddate: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.downloadselectedproduct = this.downloadselectedproduct.bind(this);
    }
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
        console.log(name + ' = ' + value)

        if (name === 'fileuploaddate' && value !== '') {
            this.setState({ alldayData: '' })
            console.log(this.state.fileuploaddate)
            console.log('hello')
            const data = {
                uploadDate: value
            }
            axios.post("http://localhost:4000/fileinfo/getinfofromdate", data)
                .then(res => { // then print response status
                    this.setState({ alldayData: res.data.status })
                    console.log(res.data.status)
                })
                .catch(e => {
                    const errorfrom = e.response.data
                    console.log(errorfrom)
                });

        }
    }

    downloadselectedproduct(index) {
        const selectedarray = this.state.alldayData[index]
        const fileinfo_to_be_downloaded = {
            filename: selectedarray.fileName,
            address: selectedarray.address
        }
        console.log(fileinfo_to_be_downloaded)


        axios.post("http://localhost:4000/fileinfo/downloadfile", fileinfo_to_be_downloaded)
            .then(res => { // then print response status
                download(res.data, selectedarray.fileName);
            })
            .catch(e => {
                const errorfrom = e.response.data
                console.log(errorfrom)
            });


    }

    componentDidMount() {
        axios.get("http://localhost:4000/fileinfo/getuploaddate")
            .then(res => { // then print response status
                this.setState({ uploadDate: res.data.status })
                console.log(res.data.status)
            })
            .catch(e => {
                const errorfrom = e.response.data
                console.log(errorfrom)
            });

    }
    render() {
        const uploaddate = this.state.uploadDate
        const alldaydata = this.state.alldayData

        var ai = 0
        var aitable = 0
        let index;

        return (
            <div class="colorwhite backgroundcolor" >
                <div class="textcenter">
                    <label className='margintop30  downloadfilelabel'>Download  File </label>
                </div>

                <div className='container'>
                    <form >
                        <label className='margintop45  downloadfilelabel'>Upload Date :</label>



                        <select className='selectdatedownload' required name="fileuploaddate" value={this.state.offertype} onChange={this.handleChange}><option value=''> Select file Upload date</option>
                            {uploaddate.map(date => (
                                <option key={ai++} value={date.uploadDate}> {date.uploadDate}</option>
                            ))}
                        </select>
                        {this.state.fileuploaddate &&
                            <div>
                                <h3>File Uploaded on {this.state.fileuploaddate}</h3>
                                {this.state.alldayData &&
                                    <div>
                                        <table class="table">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">File Name </th>
                                                    <th scope="col">Size</th>
                                                    <th scope="col">Upload Date</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {alldaydata.map(data => (

                                                    // ----------------from file location through <link> (<a> tag)
                                                    <tr key={aitable++} className='tabletrtobeselected fontwhitecolor'>
                                                        <th scope="row">{aitable}</th>
                                                        <td>{data.fileName}</td>
                                                        <td>{data.fileSize}</td>
                                                        <td>{data.uploadDate}</td>
                                                        <td><Link to={'/' + data.address + '/' + data.fileName} target="_blank" download>Download</Link></td>
                                                    </tr>

                                                    // ----------------from backend through axios request (error)

                                                    // <tr key={aitable++} className='tabletrtobeselected fontwhitecolor' onClick={() => this.downloadselectedproduct(index = alldaydata.indexOf(data))}>
                                                    //     <th scope="row">{aitable}</th>
                                                    //     <td>{data.fileName}</td>
                                                    //     <td>{data.fileSize}</td>
                                                    //     <td>{data.uploadDate}</td>
                                                    // </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                        }
                    </form>
                </div>
            </div>
        )
    }
}
export default FileUpload;