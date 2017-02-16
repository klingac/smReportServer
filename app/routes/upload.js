var express = require('express');
var path = require('path');
var fs = require('fs');
var unzip = require('unzip');
var zip = require('express-zip');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Report' });
});

router.post('/', function(req, res, next) {
  var sampleFile;
 
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('public/uploads/'+req.files.sampleFile.name, function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
        fs.createReadStream(path.join(__dirname, '../public/uploads/' + req.files.sampleFile.name))
                                .pipe(unzip.Extract({ path: path.join(__dirname,'../tmp') }));
        res.zip([
            { path: '/path/to/file1.name', name: '/path/in/zip/file1.name' },
            { path: '/path/to/file2.name', name: 'file2.name' }
        ]);
        // res.send('File uploaded!');
    }
  });
});

module.exports = router;
