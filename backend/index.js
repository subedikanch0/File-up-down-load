const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json())
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }));

const FileInfo = require('./routes/FILEINFO');
app.use('/fileinfo', FileInfo);


app.listen(port, () => {
    console.log("server is running on port " + port + "...");
}); 