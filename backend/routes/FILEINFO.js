const express = require('express');
const fileinfo = express.Router();
const cors = require('cors');
var multer = require('multer')
const moment = require('moment')
var fs = require('fs');

const FileInfo = require("../models/FILEINFO.js");
fileinfo.use(cors());



const current = moment().format("YYYY-MM-DD");
const address = 'destination/' + current

var uploaded = multer({ storage: storage }).single('file')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, address)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

fileinfo.post('/upoadfile', (req, res) => {
    console.log(req.file)


    ensureExists(address, 0744, function (err) {
        if (err) {
            console.log("Folder cannotbe created")
            return res.status(400).send({ error: "Folder cannotbe created" })
        }
        else {
            console.log(" we're all good")
        }
    });


    uploaded(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json(err)
        } else if (err) {
            return res.status(400).json(err)
        }
        console.log('success')
        const fileinfo = {
            fileName: req.file.filename,
            extensionType: req.file.mimetype,
            address: req.file.destination
        }
        console.log(fileinfo)

        return res.status(200).send(req.file)


    })

});

var uploaded = multer({ storage: storage }).single('file')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, address)

    },
    filename: function (req, file, cb) {
        cb(null, '-' + file.originalname)
    }
})
function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function (err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}


fileinfo.post('/checkbeforaddentry', (req, res) => {
    const fileinformation = {
        fileName: req.body.fileName,
        extensionType: req.body.extensionType,
        address: address
    }
    console.log(fileinformation)

    FileInfo.findAll({
        where: {
            fileName: fileinformation.fileName,
            extensionType: fileinformation.extensionType,
            address: fileinformation.address
        }
    }).then(fileinformations => {
        console.log(fileinformations)
        if (fileinformations.length <= 0) {
            console.log("there is no file with the name type in the destination address")
            res.json({ status: "there is no file with the name type in the destination address" })
        }
        else {
            console.log("There is a file with same name and type in the address")
            res.status(400).send('Error : There is a file with same name and type in the address')

        }
    })
        .catch(err => {
            console.log(err)
            res.status(400).send('Errors :' + err)
        })
})

fileinfo.post('/addentryafterfileupload', (req, res) => {
    const fileinformation = {
        fileName: req.body.fileName,
        extensionType: req.body.extensionType,
        address: address,
        fileSize: req.body.size,
        uploadDate: current
    }
    console.log(fileinformation)

    FileInfo.create(fileinformation)
        .then(entryadd => {
            console.log(fileinformation.fileName + ' Uploaded')
            res.json({ status: fileinformation.fileName + ' Uploaded' })
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Errors :' + err)
        })
})


fileinfo.get('/getuploaddate', (req, res) => {

    FileInfo.findAll({
        attributes: ['uploadDate'],
        group: ['uploadDate']
    }).then(all => {
        console.log(all)
        res.json({ status: all })
    })
        .catch(err => {
            res.status(400).send('Errors :' + err)
        })
})

fileinfo.post('/getinfofromdate', (req, res) => {
    console.log(req.body.uploadDate)
    FileInfo.findAll({

        where: {
            uploadDate: req.body.uploadDate
        }
    }).then(all => {
        console.log(all)
        res.json({ status: all })
    })
        .catch(err => {
            res.status(400).send('Errors :' + err)
        })
})





fileinfo.post('/downloadfile', (req, res) => {
    const fileaddresstodownload = req.body.address
    const filenametodownload = req.body.filename

    const FileLocation = req.body.address+'/'
    console.log(FileLocation)
    const file = req.body.filename
    res.download(FileLocation, file, (err) => {
        if (err){ 
            console.log(err)
            res.status(400).send('Errors :' + err)
        }
    });
})

module.exports = fileinfo;



